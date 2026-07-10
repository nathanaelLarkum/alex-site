import { notFound } from "next/navigation"
import { ArtworkForm } from "@/components/admin/artwork-form"
import { getArtworkForEdit, updateArtwork } from "@/lib/actions/artworks"

export default async function EditArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const artwork = await getArtworkForEdit(id)

  if (!artwork) notFound()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-light tracking-wide text-foreground">
        Edit &ldquo;{artwork.titleEn}&rdquo;
      </h1>
      <ArtworkForm action={updateArtwork.bind(null, id)} initialData={artwork} />
    </div>
  )
}
