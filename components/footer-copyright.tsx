"use client"

import { useLanguage } from "@/lib/i18n/language-context"

export function FooterCopyright() {
  const { t } = useLanguage()
  return (
    <>
      © {new Date().getFullYear()} Fingertips. {t.footer.rights}
    </>
  )
}
