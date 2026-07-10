import { ArtworkGallery } from "@/components/gallery"
import { getArtworks } from "@/lib/artworks"
import { Navbar } from "@/components/navbar"
import { FooterCopyright } from "@/components/footer-copyright"

export default async function Home() {
  const artworks = await getArtworks()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <header className="border-b border-l5 bg-l3 my-24">

      </header>

      {/* Gallery */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ArtworkGallery artworks={artworks} />
      </div>

      {/* Footer */}
      <footer className="border-t border-l5 bg-l4">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-l6">
            <FooterCopyright />
          </p>
        </div>
      </footer>
    </main>
  )
}
