import { cn } from "@/lib/utils"
import { useI18n, type Language } from "@/i18n"

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage, t } = useI18n()

  const toggle = (lang: Language) => setLanguage(lang)

  return (
    <div
      className={cn("flex items-center gap-2 text-sm font-light", className)}
      role="group"
      aria-label={t("nav.language_label")}
    >
      <button
        onClick={() => toggle("en")}
        className={cn(
          "px-2 py-1 rounded transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l1",
          language === "en"
            ? "text-l1 font-medium"
            : "text-foreground/60 hover:text-foreground"
        )}
        aria-pressed={language === "en"}
        aria-label={t("nav.language_en")}
      >
        EN
      </button>
      <span className="text-l5" aria-hidden="true">/</span>
      <button
        onClick={() => toggle("pt")}
        className={cn(
          "px-2 py-1 rounded transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-l1",
          language === "pt"
            ? "text-l1 font-medium"
            : "text-foreground/60 hover:text-foreground"
        )}
        aria-pressed={language === "pt"}
        aria-label={t("nav.language_pt")}
      >
        PT
      </button>
    </div>
  )
}
