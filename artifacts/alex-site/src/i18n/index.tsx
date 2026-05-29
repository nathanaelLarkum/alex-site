import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react"

import enNav from "@/locales/en/nav.json"
import enHome from "@/locales/en/home.json"
import enGallery from "@/locales/en/gallery.json"
import enCommon from "@/locales/en/common.json"
import enArtworks from "@/locales/en/artworks.json"

import ptNav from "@/locales/pt/nav.json"
import ptHome from "@/locales/pt/home.json"
import ptGallery from "@/locales/pt/gallery.json"
import ptCommon from "@/locales/pt/common.json"
import ptArtworks from "@/locales/pt/artworks.json"

export type Language = "en" | "pt"

const STORAGE_KEY = "elena-vasquez-lang"

const locales = {
  en: {
    nav: enNav,
    home: enHome,
    gallery: enGallery,
    common: enCommon,
    artworks: enArtworks,
  },
  pt: {
    nav: ptNav,
    home: ptHome,
    gallery: ptGallery,
    common: ptCommon,
    artworks: ptArtworks,
  },
} as const

type Locales = typeof locales.en

function getNestedValue(obj: unknown, path: string): string | undefined {
  const parts = path.split(".")
  let current: unknown = obj
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return typeof current === "string" ? current : undefined
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`
  )
}

interface I18nContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "en" || stored === "pt") return stored
  } catch {
    // localStorage unavailable (SSR / private browsing)
  }
  return "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const [namespace, ...rest] = key.split(".")
      const nsKey = rest.join(".")

      const currentLocale = locales[language] as Locales
      const fallbackLocale = locales.en as Locales

      const nsObj = currentLocale[namespace as keyof Locales]
      let value = getNestedValue(nsObj, nsKey)

      if (value === undefined) {
        const fallbackNs = fallbackLocale[namespace as keyof Locales]
        value = getNestedValue(fallbackNs, nsKey)
      }

      if (value === undefined) {
        console.warn(`[i18n] Missing translation key: "${key}"`)
        return key
      }

      return vars ? interpolate(value, vars) : value
    },
    [language]
  )

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>")
  return ctx
}
