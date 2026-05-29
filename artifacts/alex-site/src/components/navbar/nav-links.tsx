import { useState } from "react"
import { cn } from "@/lib/utils"
import { Link } from "wouter"

interface NavLinksProps {
  className?: string
  onClick?: () => void
  isMobile?: boolean
}

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
]

export function NavLinks({ className, onClick, isMobile = false }: NavLinksProps) {
  const [location] = useState(() => {
    // Get current path from wouter router
    const base = import.meta.env.BASE_URL || "/"
    const path = window.location.pathname
    return path.startsWith(base) ? path.slice(base.length - 1) || "/" : path
  })

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      if (location === path || (path === "/" && location === "/")) {
        e.preventDefault()
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
    onClick?.()
  }

  return (
    <nav className={cn("flex items-center", className)} role="navigation">
      <ul className={cn(
        "flex",
        isMobile ? "flex-col items-center gap-8" : "items-center gap-10"
      )}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={(e) => handleClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, link.href)}
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
