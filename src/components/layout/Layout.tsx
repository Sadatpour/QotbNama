import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col surface-2">
      <a href="#main" className="skip-link">
        {t('nav.home')}
      </a>
      {/* Decorative ambient gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-brand-radial"
      />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
