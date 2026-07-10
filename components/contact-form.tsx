"use client"

import { useState, type FormEvent } from "react"
import { useLanguage } from "@/lib/i18n/language-context"

function encodeForm(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&")
}

const fieldClassName =
  "w-full rounded-none border border-l5 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-l1 focus:outline-none transition-colors duration-300"

export function ContactForm() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    try {
      // Netlify's Next.js Runtime (OpenNext-based) can't scan this live,
      // server-rendered page for forms at build time, so detection instead
      // happens via the static public/__forms.html file, and submissions
      // are posted there too. See public/__forms.html.
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm(data),
      })
      if (!response.ok) throw new Error("Form submission failed")
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return <p className="mt-12 text-l1 font-light">{t.home.formSuccess}</p>
  }

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      className="mt-12 mx-auto flex max-w-md flex-col gap-4 text-left"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <input
        name="name"
        placeholder={t.home.formName}
        aria-label={t.home.formName}
        required
        className={fieldClassName}
      />
      <input
        name="email"
        type="email"
        placeholder={t.home.formEmail}
        aria-label={t.home.formEmail}
        required
        className={fieldClassName}
      />
      <textarea
        name="message"
        placeholder={t.home.formMessage}
        aria-label={t.home.formMessage}
        required
        rows={4}
        className={fieldClassName}
      />

      {status === "error" && <p className="text-sm text-destructive">{t.home.formError}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center mt-2 px-8 py-4 text-sm font-medium uppercase tracking-widest text-l3 bg-l1 hover:bg-lh1 transition-colors duration-300 rounded-none disabled:opacity-60"
      >
        {status === "sending" ? t.home.formSending : t.home.formSubmit}
      </button>
    </form>
  )
}
