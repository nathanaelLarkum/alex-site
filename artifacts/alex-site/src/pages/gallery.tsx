import { Navbar } from "@/components/navbar"
import { ArtworkGallery } from "@/components/gallery"
import { artworks } from "@/lib/artwork-data"
import { useI18n } from "@/i18n"

export default function Gallery() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <header className="border-b border-l5 bg-l3 mt-24">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("gallery.page.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-l6">
            {t("gallery.page.subtitle")}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ArtworkGallery artworks={artworks} />
      </div>

      <footer className="border-t border-l5 bg-l4">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-l6">
            {t("common.footer.copyright", { year })}
          </p>
        </div>
      </footer>
    </main>
  )
}
