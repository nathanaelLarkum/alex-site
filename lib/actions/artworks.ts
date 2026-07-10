"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

const BUCKET = "artwork-images"

export interface AdminArtworkImage {
  id: string
  url: string
  storagePath: string
  isCover: boolean
}

export interface AdminArtwork {
  id: string
  titleEn: string
  titlePt: string
  descriptionEn: string
  descriptionPt: string
  size: string
  price: number | null
  category: "finished" | "unfinished"
  images: AdminArtworkImage[]
}

export async function getArtworkForEdit(id: string): Promise<AdminArtwork | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("artworks")
    .select("*, artwork_images(id, storage_path, sort_order, is_cover)")
    .eq("id", id)
    .single()

  if (error || !data) return null

  const images = [...data.artwork_images]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => ({
      id: image.id,
      storagePath: image.storage_path,
      isCover: image.is_cover,
      url: supabase.storage.from(BUCKET).getPublicUrl(image.storage_path).data.publicUrl,
    }))

  return {
    id: data.id,
    titleEn: data.title_en,
    titlePt: data.title_pt,
    descriptionEn: data.description_en,
    descriptionPt: data.description_pt,
    size: data.size,
    price: data.price,
    category: data.category,
    images,
  }
}

function priceFromForm(formData: FormData): number | null {
  const category = formData.get("category")
  if (category !== "finished") return null
  const raw = formData.get("price")
  if (!raw || typeof raw !== "string" || raw.trim() === "") return null
  return Number(raw)
}

async function uploadImages(
  supabase: Awaited<ReturnType<typeof createClient>>,
  artworkId: string,
  files: FormDataEntryValue[],
  startIndex: number
) {
  let index = startIndex
  for (const file of files) {
    if (!(file instanceof File) || file.size === 0) continue

    const storagePath = `${artworkId}/${Date.now()}-${index}.jpg`
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, file, { contentType: file.type || "image/jpeg" })
    if (uploadError) throw new Error(uploadError.message)

    const { error: insertError } = await supabase.from("artwork_images").insert({
      artwork_id: artworkId,
      storage_path: storagePath,
      sort_order: index,
      is_cover: index === 0,
    })
    if (insertError) throw new Error(insertError.message)

    index++
  }
}

export async function createArtwork(formData: FormData) {
  const supabase = await createClient()

  const { data: artwork, error } = await supabase
    .from("artworks")
    .insert({
      title_en: formData.get("titleEn") as string,
      title_pt: formData.get("titlePt") as string,
      description_en: formData.get("descriptionEn") as string,
      description_pt: formData.get("descriptionPt") as string,
      size: formData.get("size") as string,
      price: priceFromForm(formData),
      category: formData.get("category") as string,
    })
    .select()
    .single()

  if (error || !artwork) {
    throw new Error(error?.message ?? "Failed to create artwork")
  }

  await uploadImages(supabase, artwork.id, formData.getAll("images"), 0)

  revalidatePath("/")
  revalidatePath("/gallery")
  revalidatePath("/admin")
  redirect("/admin")
}

export async function updateArtwork(id: string, formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("artworks")
    .update({
      title_en: formData.get("titleEn") as string,
      title_pt: formData.get("titlePt") as string,
      description_en: formData.get("descriptionEn") as string,
      description_pt: formData.get("descriptionPt") as string,
      size: formData.get("size") as string,
      price: priceFromForm(formData),
      category: formData.get("category") as string,
    })
    .eq("id", id)

  if (error) throw new Error(error.message)

  const existingImageCount = Number(formData.get("existingImageCount") ?? 0)
  await uploadImages(supabase, id, formData.getAll("images"), existingImageCount)

  revalidatePath("/")
  revalidatePath("/gallery")
  revalidatePath("/admin")
  redirect("/admin")
}

export async function deleteArtwork(id: string) {
  const supabase = await createClient()

  const { data: files } = await supabase.storage.from(BUCKET).list(id)
  if (files && files.length > 0) {
    await supabase.storage.from(BUCKET).remove(files.map((file) => `${id}/${file.name}`))
  }

  const { error } = await supabase.from("artworks").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/")
  revalidatePath("/gallery")
  revalidatePath("/admin")
}

export async function deleteArtworkImage(imageId: string, storagePath: string) {
  const supabase = await createClient()

  await supabase.storage.from(BUCKET).remove([storagePath])

  const { error } = await supabase.from("artwork_images").delete().eq("id", imageId)
  if (error) throw new Error(error.message)

  revalidatePath("/")
  revalidatePath("/gallery")
}
