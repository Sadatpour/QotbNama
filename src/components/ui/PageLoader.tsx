import { useTranslation } from 'react-i18next'

/** Lightweight fallback shown while a lazy route chunk loads. */
export function PageLoader() {
  const { t } = useTranslation()
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <img src="./logo.svg" width={56} height={56} alt="" className="animate-spin-slow" />
        <span className="text-sm text-muted">{t('common.loading')}</span>
      </div>
    </div>
  )
}
