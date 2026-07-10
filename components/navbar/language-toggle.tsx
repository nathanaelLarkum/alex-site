"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={cn("flex items-center gap-2 text-sm font-light", className)}
      role="group"
      aria-label="Language selection"
    >
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-2 py-1 rounded transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l1",
          language === "en"
            ? "text-l1 font-medium"
            : "text-foreground/60 hover:text-foreground"
        )}
        aria-pressed={language === "en"}
        aria-label="English"
      >
        EN
      </button>
      <span className="text-l5" aria-hidden="true">/</span>
      <button
        onClick={() => setLanguage("pt")}
        className={cn(
          "px-2 py-1 rounded transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l1",
          language === "pt"
            ? "text-l1 font-medium"
            : "text-foreground/60 hover:text-foreground"
        )}
        aria-pressed={language === "pt"}
        aria-label="Portuguese"
      >
        PT
      </button>
    </div>
  )
}
