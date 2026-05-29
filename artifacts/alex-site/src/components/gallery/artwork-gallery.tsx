import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ArtworkCard } from "./artwork-card"
import { Lightbox } from "./lightbox"
import type { Artwork } from "@/lib/artwork-data"
import { useI18n } from "@/i18n"

interface ArtworkGalleryProps {
  artworks: Artwork[]
}

type CategoryFilter = "all" | "finished" | "ongoing"

export function ArtworkGallery({ artworks }: ArtworkGalleryProps) {
  const { t } = useI18n()
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [filter, setFilter] = useState<CategoryFilter>("all")

  const filteredArtworks = useMemo(() => {
    if (filter === "all") return artworks
    return artworks.filter((artwork) => artwork.category === filter)
  }, [artworks, filter])

  const currentIndex = selectedArtwork
    ? filteredArtworks.findIndex((a) => a.id === selectedArtwork.id)
    : -1

  const handlePrevious = () => {
    if (currentIndex > 0) setSelectedArtwork(filteredArtworks[currentIndex - 1])
  }

  const handleNext = () => {
    if (currentIndex < filteredArtworks.length - 1)
      setSelectedArtwork(filteredArtworks[currentIndex + 1])
  }

  const filterOptions: { label: string; value: CategoryFilter }[] = [
    { label: t("gallery.filter.all"), value: "all" },
    { label: t("gallery.filter.finished"), value: "finished" },
    { label: t("gallery.filter.ongoing"), value: "ongoing" },
  ]

  return (
    <section className="w-full">
      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-l1 focus:ring-offset-2 ${
              filter === option.value
                ? "bg-foreground text-background"
                : "bg-l4 text-foreground hover:bg-lh4"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <motion.div
        layout
        className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5"
      >
        {filteredArtworks.map((artwork, index) => (
          <div key={artwork.id} className="mb-4 break-inside-avoid">
            <ArtworkCard
              artwork={artwork}
              index={index}
              onClick={() => setSelectedArtwork(artwork)}
            />
          </div>
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredArtworks.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-l6">{t("gallery.empty")}</p>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        artwork={selectedArtwork}
        isOpen={selectedArtwork !== null}
        onClose={() => setSelectedArtwork(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < filteredArtworks.length - 1}
      />
    </section>
  )
}
