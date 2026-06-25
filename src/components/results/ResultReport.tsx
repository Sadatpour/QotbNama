import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { AssessmentResult } from '@/types'
import { quadrantKey, QUESTION_BY_ID } from '@/services/scoring'
import { DIMENSIONS } from '@/data/dimensions'
import { TOPIC_BY_ID } from '@/data/education'
import { PoliticalCompass } from '@/components/charts/PoliticalCompass'
import { SUPPORTED_LANGUAGES } from '@/i18n'
import { useDirection } from '@/hooks/useDirection'

interface ResultReportProps {
  result: AssessmentResult
}

/** Full, light-themed report captured to a multi-page PDF. Rendered off-screen. */
export const ResultReport = forwardRef<HTMLDivElement, ResultReportProps>(function ResultReport(
  { result },
  ref,
) {
  const { t } = useTranslation()
  const { dir, lang } = useDirection()
  const key = quadrantKey(result.compass.economic, result.compass.social)
  const langLabel = SUPPORTED_LANGUAGES.find((l) => l.code === lang)?.label ?? lang
  const dateLocale = lang === 'fa' ? 'fa-IR' : lang === 'de' ? 'de-DE' : 'en-US'
  const dateStr = new Date(result.completedAt).toLocaleDateString(dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      ref={ref}
      dir={dir}
      style={{ width: 760, color: '#0f172a', background: '#ffffff' }}
      className="p-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-5" style={{ borderColor: '#e2e8f0' }}>
        <div className="flex items-center gap-3">
          <img src="./logo.svg" width={48} height={48} alt="" />
          <div className="leading-tight">
            <div className="text-2xl font-extrabold" style={{ color: '#4f46e5' }}>
              {t('meta.name')}
            </div>
            <div className="text-sm" style={{ color: '#64748b' }}>
              {t('pdf.reportTitle')}
            </div>
          </div>
        </div>
        <div className="text-end text-xs" style={{ color: '#64748b' }}>
          <div>
            {t('pdf.generatedOn')}: {dateStr}
          </div>
          <div>
            {t('pdf.language')}: {langLabel}
          </div>
          <div>{t('results.answered', { answered: result.answeredCount, total: result.totalQuestions })}</div>
        </div>
      </div>

      {/* Summary */}
      <div
        className="mt-6 rounded-2xl p-6 text-white"
        style={{ background: 'linear-gradient(120deg,#2563eb,#7c3aed)' }}
      >
        <div className="text-sm font-semibold opacity-90">{t('results.summaryTitle')}</div>
        <div className="mt-1 text-3xl font-extrabold">{t(`results.quadrants.${key}`)}</div>
        <div className="mt-2 text-sm opacity-90">{t(`results.quadrantDesc.${key}`)}</div>
      </div>

      {/* Compass + bars */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <div className="mb-2 text-sm font-bold">{t('results.compassTitle')}</div>
          <PoliticalCompass economic={result.compass.economic} social={result.compass.social} />
        </div>
        <div>
          <div className="mb-3 text-sm font-bold">{t('results.barsTitle')}</div>
          <div className="flex flex-col gap-3">
            {DIMENSIONS.map((d) => {
              const score = result.scores[d.id]
              const positive = score.value >= 0
              const w = Math.min(50, Math.abs(score.value) / 2)
              return (
                <div key={d.id}>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>{t(`${d.i18nKey}.name`)}</span>
                    <span dir="ltr" style={{ color: '#64748b' }}>
                      {score.value > 0 ? `+${score.value}` : score.value}
                    </span>
                  </div>
                  <div
                    dir="ltr"
                    className="relative mt-1 h-2 rounded-full"
                    style={{ background: '#e2e8f0' }}
                  >
                    <div
                      className="absolute inset-y-0"
                      style={{ left: '50%', width: 1, background: '#94a3b8' }}
                    />
                    <div
                      className="absolute inset-y-0 rounded-full"
                      style={{
                        background: d.color,
                        left: positive ? '50%' : undefined,
                        right: positive ? undefined : '50%',
                        width: `${w}%`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top contributors */}
      <div className="mt-6">
        <div className="mb-2 text-sm font-bold">{t('results.contributorsTitle')}</div>
        <ul className="flex flex-col gap-1.5 text-sm">
          {result.topContributors.map((c) => (
            <li key={c.questionId} className="flex items-start gap-2">
              <span style={{ color: '#7c3aed' }}>•</span>
              <span>{t(QUESTION_BY_ID[c.questionId].i18nKey)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended topics */}
      <div className="mt-6">
        <div className="mb-2 text-sm font-bold">{t('results.recommendedTitle')}</div>
        <div className="flex flex-wrap gap-2">
          {result.recommendedTopics.map((id) => (
            <span
              key={id}
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{ background: '#eef2ff', color: '#4f46e5' }}
            >
              {t(`${TOPIC_BY_ID[id].i18nKey}.title`)}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 border-t pt-4 text-xs" style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
        {t('intro.disclaimer')}
      </div>
    </div>
  )
})
