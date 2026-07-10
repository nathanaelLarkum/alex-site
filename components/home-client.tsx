"use client"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { FooterCopyright } from "@/components/footer-copyright"
import { ContactForm } from "@/components/contact-form"
import { useLanguage } from "@/lib/i18n/language-context"

interface HomeClientProps {
  heroImages: { url: string; alt: string }[]
}

export function HomeClient({ heroImages }: HomeClientProps) {
  const { t } = useLanguage()
  const strip = heroImages.length > 0 ? [...heroImages, ...heroImages] : []

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-l4 to-l3 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--l5)_1px,transparent_1px)] bg-[length:24px_24px] opacity-30" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground mb-6">
            <span className="block">{t.home.heroTitleLine1}</span>
            <span className="block mt-2 text-l1">{t.home.heroTitleLine2}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            {t.home.heroSubtitle}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/gallery"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-widest  bg-l3 text-l1 hover:textlh1 hover:bg-lh3 transition-colors duration-300 rounded-none"
            >
              {t.home.viewGallery}
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-widest text-foreground border border-l5 hover:border-l1 hover:text-l1 transition-colors duration-300 rounded-none"
            >
              {t.home.learnMore}
            </a>
          </div>
        </div>

        {/* Subtle sliding strip of artwork photos along the bottom edge */}
        {strip.length > 0 && (
          <div
            className="absolute inset-x-0 bottom-0 z-[5] overflow-hidden opacity-30 grayscale"
            aria-hidden="true"
          >
            <div className="flex w-max animate-marquee gap-4 py-6">
              {strip.map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md md:h-24 md:w-32"
                >
                  <Image src={image.url} alt="" fill className="object-cover" sizes="128px" />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-l3">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-l1 font-light">
                {t.home.aboutLabel}
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
                {t.home.aboutHeading}
              </h2>
              <p className="mt-8 text-muted-foreground leading-relaxed font-light">
                {t.home.aboutBody}
              </p>
            </div>
            <div className="relative aspect-[4/5] bg-l4 border border-l5">
              <Image
                src="/about/IMG_1668.JPG"
                alt={t.home.aboutPhotoAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-l4">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-l1 font-light">
            {t.home.contactLabel}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
            {t.home.contactHeading}
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed font-light max-w-xl mx-auto">
            {t.home.contactBody}
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-l3 border-t border-l5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground font-light">
            <FooterCopyright />
          </p>
        </div>
      </footer>
    </>
  )
}
