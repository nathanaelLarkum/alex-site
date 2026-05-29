import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Artwork } from "@/lib/artwork-data"

interface LightboxProps {
  artwork: Artwork | null
  isOpen: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

export function Lightbox({
  artwork,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          if (hasPrevious) onPrevious()
          break
        case "ArrowRight":
          if (hasNext) onNext()
          break
      }
    },
    [isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!artwork) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${artwork.title} lightbox`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 rounded-full bg-l4 p-2 text-foreground transition-colors hover:bg-lh4 focus:outline-none focus:ring-2 focus:ring-l1"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation arrows */}
          {hasPrevious && (
            <button
              onClick={onPrevious}
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-l4 p-2 text-foreground transition-colors hover:bg-lh4 focus:outline-none focus:ring-2 focus:ring-l1 md:left-8"
              aria-label="Previous artwork"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-l4 p-2 text-foreground transition-colors hover:bg-lh4 focus:outline-none focus:ring-2 focus:ring-l1 md:right-8"
              aria-label="Next artwork"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Content */}
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex max-h-full w-full max-w-6xl flex-col gap-6 overflow-auto lg:flex-row lg:items-center"
          >
            {/* Image */}
            <div className="relative flex-1">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                width={1200}
                height={900}
                className="mx-auto max-h-[60vh] w-auto rounded-lg object-contain lg:max-h-[80vh]"
              />
            </div>

            {/* Info panel */}
            <div className="flex flex-col gap-4 rounded-lg bg-l3 p-6 lg:w-80 lg:flex-shrink-0">
              <div>
                <span className="inline-block rounded-full bg-l4 px-3 py-1 text-xs font-medium uppercase tracking-wide text-l6">
                  {artwork.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{artwork.title}</h2>
              <p className="text-sm text-l6">{artwork.size}</p>
              <p className="text-base leading-relaxed text-foreground/80">
                {artwork.description}
              </p>
              <div className="mt-auto border-t border-l5 pt-4">
                <p className="text-2xl font-semibold text-l1">
                  ${artwork.price.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
