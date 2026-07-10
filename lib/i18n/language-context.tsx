"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { dictionary, type Dictionary, type Language } from "./dictionary"

const STORAGE_KEY = "fingertips-language"

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "en" || stored === "pt") {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = (next: Language) => {
    setLanguageState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: dictionary[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
