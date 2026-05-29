---
name: i18n architecture
description: How bilingual EN/PT localization is implemented in artifacts/alex-site
---

# i18n Architecture — artifacts/alex-site

## The rule
All user-facing text goes through `useI18n().t("namespace.key")`. Never hardcode strings in components.

**Why:** The language toggle in the navbar must swap all visible text instantly across every page without a reload.

**How to apply:** Any new component that renders user-visible text must import `useI18n` from `@/i18n` and use `t(key)`. New translation keys go in both `en/` and `pt/` locale files.

## Structure
```
src/i18n/index.tsx          — LanguageProvider, useI18n hook, t() with interpolation
src/locales/en/nav.json     — navbar link labels, aria labels
src/locales/en/home.json    — hero, about, contact section text
src/locales/en/gallery.json — gallery page header, filter tabs, lightbox aria labels, empty state
src/locales/en/common.json  — footer, 404 page
src/locales/pt/             — Portuguese mirrors of all the above
```

## Key behaviors
- `t("namespace.key", { year: 2025 })` supports `{var}` interpolation
- Missing keys fall back to English, then return the raw key (never crashes)
- Language persisted to `localStorage` under key `elena-vasquez-lang`
- `LanguageProvider` wraps the entire app in `App.tsx`

## Adding a new language
1. Create `src/locales/<code>/` with the same JSON files as `en/`
2. Add the locale to the `locales` object in `src/i18n/index.tsx`
3. Add a button to `LanguageToggle` with `aria-pressed` and `setLanguage("<code>")`

## Refactored components
navbar.tsx, nav-links.tsx, mobile-menu.tsx, language-toggle.tsx,
home.tsx, gallery.tsx, artwork-gallery.tsx, artwork-card.tsx, lightbox.tsx, not-found.tsx
