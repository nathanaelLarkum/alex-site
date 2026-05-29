import { cn } from "@/lib/utils"
import { Link } from "wouter"
import { useI18n } from "@/i18n"

interface NavLinksProps {
  className?: string
  onClick?: () => void
  isMobile?: boolean
}

export function NavLinks({ className, onClick, isMobile = false }: NavLinksProps) {
  const { t } = useI18n()

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/#about", label: t("nav.about") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/#contact", label: t("nav.contact") },
  ]

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      const hash = href.split("#")[1]
      const isHome =
        window.location.pathname === "/" ||
        window.location.pathname === import.meta.env.BASE_URL ||
        window.location.pathname === import.meta.env.BASE_URL.replace(/\/$/, "")
      if (isHome) {
        e.preventDefault()
        const element = document.getElementById(hash)
        if (element) element.scrollIntoView({ behavior: "smooth" })
      }
    }
    onClick?.()
  }

  return (
    <nav className={cn("flex items-center", className)} role="navigation">
      <ul
        className={cn(
          "flex",
          isMobile ? "flex-col items-center gap-8" : "items-center gap-10"
        )}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={(e) =>
                handleClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, link.href)
              }
              className={cn(
                "relative font-light tracking-wide transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l1 focus-visible:ring-offset-2 focus-visible:ring-offset-l3",
                isMobile
                  ? "text-3xl md:text-4xl text-foreground hover:text-l1"
                  : "text-sm uppercase text-foreground/80 hover:text-l1",
                "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-l1 after:transition-all after:duration-300 hover:after:w-full"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
