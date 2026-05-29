import { Navbar } from "@/components/navbar"
import { Link } from "wouter"
import { useI18n } from "@/i18n"

export default function Home() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-l4 to-l3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--l5)_1px,transparent_1px)] bg-[length:24px_24px] opacity-30" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground mb-6">
            <span className="block">{t("home.hero.title_line1")}</span>
            <span className="block mt-2 text-l1">{t("home.hero.title_line2")}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            {t("home.hero.subtitle")}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-widest bg-l3 text-l1 hover:text-lh1 hover:bg-lh3 transition-colors duration-300 rounded-none"
            >
              {t("home.hero.cta_gallery")}
            </Link>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-widest text-foreground border border-l5 hover:border-l1 hover:text-l1 transition-colors duration-300 rounded-none"
            >
              {t("home.hero.cta_about")}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-l3">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-l1 font-light">
                {t("home.about.eyebrow")}
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
                {t("home.about.name")}
              </h2>
              <p className="mt-8 text-muted-foreground leading-relaxed font-light">
                {t("home.about.bio1")}
              </p>
              <p className="mt-6 text-muted-foreground leading-relaxed font-light">
                {t("home.about.bio2")}
              </p>
            </div>
            <div className="relative aspect-[4/5] bg-l4 border border-l5">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-light">
                {t("home.about.portrait_placeholder")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-l4">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-l1 font-light">
            {t("home.contact.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
            {t("home.contact.title")}
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed font-light max-w-xl mx-auto">
            {t("home.contact.description")}
          </p>
          <a
            href="mailto:contact@elenavasquez.art"
            className="inline-flex items-center justify-center mt-12 px-8 py-4 text-sm font-medium uppercase tracking-widest text-l3 bg-l1 hover:bg-lh1 transition-colors duration-300 rounded-none"
          >
            {t("home.contact.cta")}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-l3 border-t border-l5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground font-light">
            {t("common.footer.copyright", { year })}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground font-light">
            <a href="#" className="hover:text-l1 transition-colors">{t("common.footer.instagram")}</a>
            <a href="#" className="hover:text-l1 transition-colors">{t("common.footer.twitter")}</a>
            <a href="#" className="hover:text-l1 transition-colors">{t("common.footer.linkedin")}</a>
          </div>
        </div>
      </footer>
    </>
  )
}
