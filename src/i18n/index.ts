import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fa from '@/locales/fa.json'
import en from '@/locales/en.json'
import de from '@/locales/de.json'
import { storage } from '@/services/storage'
import type { LanguageCode } from '@/types'

export const SUPPORTED_LANGUAGES: Array<{
  code: LanguageCode
  label: string
  dir: 'rtl' | 'ltr'
  flag: string
}> = [
  { code: 'fa', label: 'فارسی', dir: 'rtl', flag: '🇮🇷' },
  { code: 'en', label: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
]

export const DIRECTION: Record<LanguageCode, 'rtl' | 'ltr'> = {
  fa: 'rtl',
  en: 'ltr',
  de: 'ltr',
}

function resolveInitialLanguage(): LanguageCode {
  const saved = storage.getLanguage()
  if (saved && saved in DIRECTION) return saved as LanguageCode

  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'fa'
  if (nav.startsWith('de')) return 'de'
  if (nav.startsWith('en')) return 'en'
  if (nav.startsWith('fa') || nav.startsWith('pe')) return 'fa'
  return 'fa'
}

const initialLang = resolveInitialLanguage()

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fa: { translation: fa },
      en: { translation: en },
      de: { translation: de },
    },
    lng: initialLang,
    fallbackLng: 'en',
    supportedLngs: ['fa', 'en', 'de'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'qotbnama.language',
      caches: [],
    },
  })

/** Apply <html lang/dir> and persist the choice. Call on init and on change. */
export function applyLanguage(lang: LanguageCode): void {
  const dir = DIRECTION[lang]
  document.documentElement.lang = lang
  document.documentElement.dir = dir
  storage.saveLanguage(lang)
}

applyLanguage(initialLang)
i18n.on('languageChanged', (lng) => {
  if (lng in DIRECTION) applyLanguage(lng as LanguageCode)
})

/**
 * Mark the language as an explicit user choice (called from the language
 * switcher). Once set, geo/browser auto-detection never overrides it again.
 */
export function setLanguageManually(lang: LanguageCode): void {
  storage.setLangSource('user')
  void i18n.changeLanguage(lang)
}

/** Countries whose primary/official language we treat as German. */
const GERMAN_SPEAKING = new Set(['DE', 'AT', 'CH', 'LI'])

/** Map an ISO 3166-1 alpha-2 country code to one of our supported languages. */
function countryToLanguage(country: string): LanguageCode {
  const cc = country.toUpperCase()
  if (cc === 'IR') return 'fa'
  if (GERMAN_SPEAKING.has(cc)) return 'de'
  return 'en'
}

/** Look up the visitor's country via a free, key-less IP geolocation service. */
async function fetchCountryCode(): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 3500)
    const res = await fetch('https://ipapi.co/country/', { signal: controller.signal })
    clearTimeout(timer)
    if (!res.ok) return null
    const text = (await res.text()).trim()
    return /^[A-Za-z]{2}$/.test(text) ? text : null
  } catch {
    return null
  }
}

/**
 * One-time, IP-based language detection. Runs only when the user has not made
 * an explicit choice and geo detection hasn't already resolved before. Sends
 * the visitor's IP to a third-party geolocation service to read the country;
 * falls back silently to the existing (browser-based) language on any failure.
 */
export async function detectLanguageByGeo(): Promise<void> {
  const source = storage.getLangSource()
  if (source === 'user' || source === 'geo') return // already decided

  const country = await fetchCountryCode()
  if (!country) return // keep browser-detected language

  // The user may have switched manually while the request was in flight.
  if (storage.getLangSource() === 'user') return

  const lang = countryToLanguage(country)
  storage.setLangSource('geo')
  if (lang !== (i18n.language?.slice(0, 2) as LanguageCode)) {
    void i18n.changeLanguage(lang)
  }
}

export default i18n
