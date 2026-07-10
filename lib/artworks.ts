import { createPublicClient } from "@/lib/supabase/public"

const BUCKET = "artwork-images"

export interface ArtworkImage {
  url: string
  isCover: boolean
}

export interface Artwork {
  id: string
  titleEn: string
  titlePt: string
  descriptionEn: string
  descriptionPt: string
  size: string
  price: number | null
  category: "finished" | "unfinished"
  images: ArtworkImage[]
}

interface ArtworkImageRow {
  storage_path: string
  sort_order: number
  is_cover: boolean
}

interface ArtworkRow {
  id: string
  title_en: string
  title_pt: string
  description_en: string
  description_pt: string
  size: string
  price: number | null
  category: "finished" | "unfinished"
  sort_order: number
  artwork_images: ArtworkImageRow[]
}

export async function getArtworks(): Promise<Artwork[]> {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from("artworks")
    .select("*, artwork_images(storage_path, sort_order, is_cover)")
    .order("sort_order", { ascending: true })

  if (error) throw error

  return ((data ?? []) as ArtworkRow[]).map((row) => {
    const images = [...row.artwork_images]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((image) => ({
        url: supabase.storage.from(BUCKET).getPublicUrl(image.storage_path).data.publicUrl,
        isCover: image.is_cover,
      }))

    return {
      id: row.id,
      titleEn: row.title_en,
      titlePt: row.title_pt,
      descriptionEn: row.description_en,
      descriptionPt: row.description_pt,
      size: row.size,
      price: row.price,
      category: row.category,
      images,
    }
  })
}
