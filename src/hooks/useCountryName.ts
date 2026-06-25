import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Returns a function that localizes a country's name from its alpha-2 code via
 * `Intl.DisplayNames` (so we don't hand-translate ~190 names). Falls back to the
 * provided English name when no code is available or the runtime can't resolve it.
 */
export function useCountryName(): (a2: string | null, fallback?: string) => string {
  const { i18n } = useTranslation()
  const lang = i18n.language?.slice(0, 2) || 'en'

  const display = useMemo(() => {
    try {
      return new Intl.DisplayNames([lang], { type: 'region' })
    } catch {
      return null
    }
  }, [lang])

  return useCallback(
    (a2, fallback = '') => {
      if (a2 && display) {
        try {
          const n = display.of(a2.toUpperCase())
          if (n && n.toUpperCase() !== a2.toUpperCase()) return n
        } catch {
          /* ignore */
        }
      }
      return fallback
    },
    [display],
  )
}
