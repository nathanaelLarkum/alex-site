import { ArtworkForm } from "@/components/admin/artwork-form"
import { createArtwork } from "@/lib/actions/artworks"

export default function NewArtworkPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-light tracking-wide text-foreground">Add artwork</h1>
      <ArtworkForm action={createArtwork} />
    </div>
  )
}
