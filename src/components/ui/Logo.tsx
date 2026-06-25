import { useTranslation } from 'react-i18next'

interface LogoProps {
  /** Show the wordmark text next to the mark. */
  showText?: boolean
  /** Icon size in px. */
  size?: number
  className?: string
  /** Show the tagline under the wordmark. */
  showTagline?: boolean
}

export function Logo({ showText = true, size = 40, className = '', showTagline = false }: LogoProps) {
  const { t } = useTranslation()
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="./logo.svg"
        width={size}
        height={size}
        alt=""
        className="shrink-0 drop-shadow-sm"
        aria-hidden="true"
      />
      {showText && (
        <span className="flex flex-col leading-tight">
          <span className="text-xl font-extrabold gradient-text">{t('meta.name')}</span>
          {showTagline && (
            <span className="text-xs text-muted">{t('meta.tagline')}</span>
          )}
        </span>
      )}
    </span>
  )
}
