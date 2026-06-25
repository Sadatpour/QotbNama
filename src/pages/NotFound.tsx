import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'

export function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-24 text-center">
      <span className="text-7xl font-black gradient-text">404</span>
      <h1 className="text-2xl font-extrabold">{t('notFound.title')}</h1>
      <p className="text-muted">{t('notFound.desc')}</p>
      <Link to="/" className="btn-primary">
        <Icon name="arrow-right" size={18} className="rtl:rotate-180" />
        {t('notFound.home')}
      </Link>
    </div>
  )
}
