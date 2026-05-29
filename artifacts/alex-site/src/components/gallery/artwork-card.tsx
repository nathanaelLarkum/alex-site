import { motion } from "framer-motion"
import type { Artwork } from "@/lib/artwork-data"
import { useI18n } from "@/i18n"

interface ArtworkCardProps {
  artwork: Artwork
  index: number
  onClick: () => void
}

export function ArtworkCard({ artwork, index, onClick }: ArtworkCardProps) {
  const { t } = useI18n()

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-l4 shadow-sm transition-shadow duration-300 hover:shadow-lg"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={t("gallery.lightbox.view_aria", {
        title: artwork.title,
        size: artwork.size,
        price: artwork.price.toLocaleString(),
      })}
    >
      <div className="relative aspect-auto overflow-hidden">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          width={800}
          height={600}
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay — hidden on mobile */}
        <div className="absolute inset-0 hidden bg-foreground/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex md:flex-col md:items-center md:justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="px-4 text-center"
          >
            <h3 className="text-xl font-semibold text-l3">{artwork.title}</h3>
            <p className="mt-1 text-sm text-l5">{artwork.size}</p>
            <p className="mt-2 text-lg font-medium text-l1">
              ${artwork.price.toLocaleString()}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile info — always visible */}
      <div className="p-4 md:hidden">
        <h3 className="text-base font-semibold text-foreground">{artwork.title}</h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm text-l6">{artwork.size}</span>
          <span className="text-sm font-medium text-l1">
            ${artwork.price.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
