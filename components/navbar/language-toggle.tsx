"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Language = "EN" | "PT"

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const [language, setLanguage] = useState<Language>("EN")

  return (
    <div 
      className={cn("flex items-center gap-2 text-sm font-light", className)}
      role="group"
      aria-label="Language selection"
    >
      <button
        onClick={() => setLanguage("EN")}
        className={cn(
          "px-2 py-1 rounded transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l1",
          language === "EN"
            ? "text-l1 font-medium"
            : "text-foreground/60 hover:text-foreground"
        )}
        aria-pressed={language === "EN"}
        aria-label="English"
      >
        EN
      </button>
      <span className="text-l5" aria-hidden="true">/</span>
      <button
        onClick={() => setLanguage("PT")}
        className={cn(
          "px-2 py-1 rounded transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l1",
          language === "PT"
            ? "text-l1 font-medium"
            : "text-foreground/60 hover:text-foreground"
        )}
        aria-pressed={language === "PT"}
        aria-label="Portuguese"
      >
        PT
      </button>
    </div>
  )
}
