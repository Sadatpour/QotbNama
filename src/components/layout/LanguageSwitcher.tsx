import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { SUPPORTED_LANGUAGES, setLanguageManually } from '@/i18n'
import { Icon } from '@/components/ui/Icon'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = i18n.language?.slice(0, 2)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const active = SUPPORTED_LANGUAGES.find((l) => l.code === current) ?? SUPPORTED_LANGUAGES[0]

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.select')}
        className="inline-flex h-10 items-center gap-1.5 rounded-xl surface-3 px-3 font-medium transition-colors hover:text-brand-indigo"
      >
        <Icon name="languages" size={18} />
        <span className="hidden text-sm sm:inline">{active.label}</span>
        <Icon name="chevron-down" size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="card absolute end-0 z-50 mt-2 w-44 overflow-hidden p-1.5"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={lang.code === current}
                  onClick={() => {
                    setLanguageManually(lang.code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-start text-sm transition-colors hover:surface-3 ${
                    lang.code === current ? 'text-brand-indigo font-semibold' : ''
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true">{lang.flag}</span>
                    {lang.label}
                  </span>
                  {lang.code === current && <Icon name="check" size={16} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
