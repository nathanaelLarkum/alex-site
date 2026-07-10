"use client"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { FooterCopyright } from "@/components/footer-copyright"
import { useLanguage } from "@/lib/i18n/language-context"

const photos = ["/about/IMG_1668.JPG", "/about/IMG_1770.JPG", "/about/IMG_1774.JPG"]

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-32 lg:px-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
          {t.about.heading}
        </h1>

        <p className="mt-8 max-w-2xl text-muted-foreground leading-relaxed font-light">
          {t.about.bio}
        </p>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {photos.map((src) => (
            <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-l4 border border-l5">
              <Image
                src={src}
                alt={t.about.photoAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>

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
