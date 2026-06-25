import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'
import { Icon } from '@/components/ui/Icon'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'

const LINKS = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/intro', key: 'nav.intro', end: false },
  { to: '/quiz', key: 'nav.test', end: false },
  { to: '/education', key: 'nav.education', end: false },
  { to: '/map', key: 'nav.map', end: false },
  { to: '/share', key: 'nav.share', end: false },
]

export function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 glass border-b border-base">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="shrink-0" aria-label={t('meta.name')}>
          <Logo size={36} />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'surface-3 text-brand-indigo'
                      : 'text-muted hover:text-[color:rgb(var(--text))]'
                  }`
                }
              >
                {t(link.key)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t('common.close') : t('nav.home')}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl surface-3 md:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-base md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 font-semibold transition-colors ${
                        isActive || location.pathname === link.to
                          ? 'surface-3 text-brand-indigo'
                          : 'text-muted'
                      }`
                    }
                  >
                    {t(link.key)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
