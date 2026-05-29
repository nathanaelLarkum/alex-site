import { Navbar } from "@/components/navbar"
import { ArtworkGallery } from "@/components/gallery"
import { artworks } from "@/lib/artwork-data"

export default function Gallery() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <header className="border-b border-l5 bg-l3 mt-24">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-l6">
            A curated collection of original artworks exploring color, form, and emotion.
          </p>
        </div>
      </header>

      {/* Gallery */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ArtworkGallery artworks={artworks} />
      </div>

      {/* Footer */}
      <footer className="border-t border-l5 bg-l4">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-l6">
            © {new Date().getFullYear()} Elena Vasquez. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
