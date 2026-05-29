"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

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
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      if (pathname === path || (path === "/" && pathname === "/")) {
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
              onClick={(e) => handleClick(e, link.href)}
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
