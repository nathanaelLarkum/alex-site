"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu } from "lucide-react"
import { NavLinks } from "./nav-links"
import { MobileMenu } from "./mobile-menu"
import { LanguageToggle } from "./language-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40",
          "transition-all duration-500 ease-out",
          isScrolled
            ? "bg-l3/80 backdrop-blur-xl border-b border-l5/20 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav
            className={cn(
              "flex items-center justify-between transition-all duration-300",
              isScrolled ? "h-16" : "h-20 lg:h-24"
            )}
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo / Artist Name */}
            <Link
              href="/"
              className={cn(
                "group relative font-light tracking-[0.2em] uppercase transition-colors duration-300",
                "text-foreground hover:text-l1",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l1 focus-visible:ring-offset-2 focus-visible:ring-offset-l3",
                isScrolled ? "text-lg" : "text-lg lg:text-xl"
              )}
            >
              <span className="relative">
                Fingertips
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-l1 transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-center">
              <NavLinks />
            </div>

            {/* Right side - Language Toggle + Cart placeholder */}
            <div className="hidden lg:flex lg:items-center lg:gap-6">
              <LanguageToggle />
              {/* Cart placeholder for future use */}
              <div className="w-10" aria-hidden="true" />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "lg:hidden p-2 -mr-2 rounded-lg",
                "text-foreground hover:text-l1 hover:bg-l5/20",
                "transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l1"
              )}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
