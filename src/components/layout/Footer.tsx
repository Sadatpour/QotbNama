import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/ui/Logo'
import { Icon } from '@/components/ui/Icon'

const AUTHOR_NAME = 'Moji'
const AUTHOR_URL = 'https://sadatpour.dev'
const CONTACT_EMAIL = 'sadatpour.web@gmail.com'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="mt-20 border-t border-base surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo size={40} showTagline />
          <div className="flex items-center gap-2 text-sm text-muted">
            <Icon name="lock" size={16} />
            <span>{t('footer.privacy')}</span>
          </div>
        </div>

        <p className="max-w-3xl text-sm text-muted">{t('footer.disclaimer')}</p>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Methodology note — which global instruments & standards the quiz is based on */}
          <div className="rounded-2xl surface-3 p-4 md:col-span-2">
            <h3 className="flex items-center gap-2 text-sm font-bold">
              <Icon name="scale" size={16} className="text-brand-indigo" />
              {t('footer.methodologyTitle')}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">{t('footer.methodology')}</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col rounded-2xl surface-3 p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold">
              <Icon name="mail" size={16} className="text-brand-orange" />
              {t('footer.contactTitle')}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">{t('footer.contactDesc')}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              dir="ltr"
              className="mt-3 inline-flex items-center gap-2 self-start rounded-xl surface px-3 py-2 text-sm font-semibold text-brand-indigo transition-colors hover:text-brand-purple"
            >
              <Icon name="mail" size={16} />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-base pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            {t('meta.name')} · {t('footer.madeWith')} {t('footer.by')}{' '}
            <a
              href={AUTHOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-indigo transition-colors hover:text-brand-purple hover:underline"
            >
              {AUTHOR_NAME}
            </a>
          </span>
          <a
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="transition-colors hover:text-brand-indigo"
          >
            sadatpour.dev
          </a>
        </div>
      </div>
    </footer>
  )
}
