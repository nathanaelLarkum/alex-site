"use client"

import { useEffect, useCallback, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Artwork } from "@/lib/artworks"
import { useLanguage } from "@/lib/i18n/language-context"

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
  const { t, language } = useLanguage()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  // When paging into an adjacent piece, land on its first photo when moving
  // forward or its last photo when moving backward, so the filmstrip feels
  // continuous instead of always resetting to photo 1.
  const enterAtEndRef = useRef(false)

  useEffect(() => {
    const imageCount = artwork?.images.length ?? 0
    setActiveImageIndex(enterAtEndRef.current ? Math.max(imageCount - 1, 0) : 0)
    enterAtEndRef.current = false
  }, [artwork?.id])

  const goToPrevious = useCallback(() => {
    if (activeImageIndex > 0) {
      setActiveImageIndex((index) => index - 1)
    } else if (hasPrevious) {
      enterAtEndRef.current = true
      onPrevious()
    }
  }, [activeImageIndex, hasPrevious, onPrevious])

  const goToNext = useCallback(() => {
    if (artwork && activeImageIndex < artwork.images.length - 1) {
      setActiveImageIndex((index) => index + 1)
    } else if (hasNext) {
      enterAtEndRef.current = false
      onNext()
    }
  }, [artwork, activeImageIndex, hasNext, onNext])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
      }
    },
    [isOpen, onClose, goToPrevious, goToNext]
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

  const title = language === "en" ? artwork.titleEn : artwork.titlePt
  const description = language === "en" ? artwork.descriptionEn : artwork.descriptionPt
  const activeImage = artwork.images[activeImageIndex] ?? artwork.images[0]
  const canGoPrevious = activeImageIndex > 0 || hasPrevious
  const canGoNext = activeImageIndex < artwork.images.length - 1 || hasNext

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
          aria-label={`${title} lightbox`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 rounded-full bg-l4 p-2 text-foreground transition-colors hover:bg-lh4 focus:outline-none focus:ring-2 focus:ring-l1"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation arrows - page through this piece's own photos first,
              then spill into the next/previous piece */}
          {canGoPrevious && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-l4 p-2 text-foreground transition-colors hover:bg-lh4 focus:outline-none focus:ring-2 focus:ring-l1 md:left-8"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {canGoNext && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-l4 p-2 text-foreground transition-colors hover:bg-lh4 focus:outline-none focus:ring-2 focus:ring-l1 md:right-8"
              aria-label="Next photo"
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
            <div className="flex flex-1 flex-col gap-3">
              <div className="relative">
                <Image
                  src={activeImage.url}
                  alt={title}
                  width={1200}
                  height={900}
                  className="mx-auto max-h-[60vh] w-auto rounded-lg object-contain lg:max-h-[80vh]"
                  priority
                />
              </div>

              {/* Thumbnail strip - only when a piece has more than one photo */}
              {artwork.images.length > 1 && (
                <div className="flex justify-center gap-2 overflow-x-auto">
                  {artwork.images.map((image, index) => (
                    <button
                      key={image.url}
                      onClick={() => setActiveImageIndex(index)}
                      className={cn(
                        "relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                        index === activeImageIndex ? "border-l1" : "border-transparent"
                      )}
                      aria-label={`View photo ${index + 1} of ${title}`}
                      aria-current={index === activeImageIndex}
                    >
                      <Image
                        src={image.url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info panel */}
            <div className="flex flex-col gap-4 rounded-lg bg-l3 p-6 lg:w-80 lg:flex-shrink-0">
              <div>
                <span className="inline-block rounded-full bg-l4 px-3 py-1 text-xs font-medium uppercase tracking-wide text-l6">
                  {t.gallery[artwork.category]}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              <p className="text-sm text-l6">{artwork.size}</p>
              <p className="text-base leading-relaxed text-foreground/80">{description}</p>
              <div className="mt-auto border-t border-l5 pt-4">
                <p className="text-2xl font-semibold text-l1">
                  {artwork.price !== null
                    ? `$${artwork.price.toLocaleString()}`
                    : artwork.category === "unfinished"
                      ? t.gallery.workInProgress
                      : t.gallery.priceOnRequest}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
