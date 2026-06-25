import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { AssessmentResult } from '@/types'
import { quadrantKey } from '@/services/scoring'
import { PoliticalCompass } from '@/components/charts/PoliticalCompass'
import { useDirection } from '@/hooks/useDirection'

interface ShareCardProps {
  result: AssessmentResult
}

/**
 * Branded, social-media-optimized result card (always light theme) captured to
 * PNG for the "download image" action. Rendered off-screen by the parent.
 */
export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(function ShareCard(
  { result },
  ref,
) {
  const { t } = useTranslation()
  const { dir } = useDirection()
  const key = quadrantKey(result.compass.economic, result.compass.social)

  return (
    <div
      ref={ref}
      dir={dir}
      style={{ width: 560 }}
      className="overflow-hidden rounded-3xl bg-white p-8 text-slate-900"
    >
      <div className="flex items-center gap-3">
        <img src="./logo.svg" width={44} height={44} alt="" />
        <div className="leading-tight">
          <div
            className="text-xl font-extrabold"
            style={{ color: '#4f46e5' }}
          >
            {t('meta.name')}
          </div>
          <div className="text-xs text-slate-500">{t('meta.tagline')}</div>
        </div>
      </div>

      <div
        className="mt-6 rounded-2xl p-6 text-white"
        style={{ background: 'linear-gradient(120deg,#2563eb,#7c3aed)' }}
      >
        <div className="text-sm font-semibold opacity-90">{t('results.title')}</div>
        <div className="mt-1 text-3xl font-extrabold">{t(`results.quadrants.${key}`)}</div>
      </div>

      <div className="mt-4">
        <PoliticalCompass economic={result.compass.economic} social={result.compass.social} />
      </div>

      <div className="mt-2 text-center text-sm text-slate-500">{t('meta.description')}</div>
    </div>
  )
})
