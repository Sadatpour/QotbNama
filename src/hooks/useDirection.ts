import { useTranslation } from 'react-i18next'
import { DIRECTION } from '@/i18n'
import type { LanguageCode } from '@/types'

/** Current writing direction derived from the active language. */
export function useDirection(): { dir: 'rtl' | 'ltr'; isRtl: boolean; lang: LanguageCode } {
  const { i18n } = useTranslation()
  const lang = (i18n.language?.slice(0, 2) as LanguageCode) in DIRECTION
    ? (i18n.language.slice(0, 2) as LanguageCode)
    : 'en'
  const dir = DIRECTION[lang]
  return { dir, isRtl: dir === 'rtl', lang }
}
