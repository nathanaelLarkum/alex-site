import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { NavLinks } from "./nav-links"
import { LanguageToggle } from "./language-toggle"
import { cn } from "@/lib/utils"
import { useI18n } from "@/i18n"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuVariants = {
  closed: { opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  open: { opacity: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
}

const contentVariants = {
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] } },
}

const closeButtonVariants = {
  closed: { rotate: -90, opacity: 0 },
  open: { rotate: 0, opacity: 1, transition: { duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] } },
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useI18n()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center",
            "bg-l3/95 backdrop-blur-xl"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <motion.button
            variants={closeButtonVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className={cn(
              "absolute top-6 right-6 p-2 rounded-full",
              "text-foreground hover:text-l1 hover:bg-l5/20",
              "transition-colors duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l1"
            )}
            aria-label={t("nav.close_menu")}
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </motion.button>

          <motion.div
            variants={contentVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex flex-col items-center gap-12"
          >
            <NavLinks isMobile onClick={onClose} />
            <div className="pt-8 border-t border-l5/30">
              <LanguageToggle />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
