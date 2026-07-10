import { HomeClient } from "@/components/home-client"
import { getArtworks } from "@/lib/artworks"

export default async function Page() {
  const artworks = await getArtworks()
  const heroImages = artworks
    .map((artwork) => artwork.images.find((image) => image.isCover) ?? artwork.images[0])
    .filter((image): image is NonNullable<typeof image> => Boolean(image))
    .slice(0, 8)
    .map((image) => ({ url: image.url, alt: "" }))

  return <HomeClient heroImages={heroImages} />
}
