import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { AssessmentResult } from '@/types'
import { quadrantKey } from '@/services/scoring'
import { Icon } from '@/components/ui/Icon'

interface ResultSummaryProps {
  result: AssessmentResult
}

export function ResultSummary({ result }: ResultSummaryProps) {
  const { t } = useTranslation()
  const key = quadrantKey(result.compass.economic, result.compass.social)

  const stats = [
    {
      label: t('dimensions.economic.name'),
      value: result.compass.economic,
      negative: t('dimensions.economic.negative'),
      positive: t('dimensions.economic.positive'),
    },
    {
      label: t('dimensions.social.name'),
      value: result.compass.social,
      negative: t('dimensions.social.negative'),
      positive: t('dimensions.social.positive'),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-brand-gradient p-8 text-white shadow-glow sm:p-10"
    >
      <div className="pointer-events-none absolute -end-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="relative">
        <span className="chip bg-white/20 text-sm font-semibold backdrop-blur">
          <Icon name="target" size={16} />
          {t('results.summaryTitle')}
        </span>
        <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
          {t(`results.quadrants.${key}`)}
        </h2>
        <p className="mt-3 max-w-xl text-balance text-white/90">
          {t(`results.quadrantDesc.${key}`)}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{s.label}</span>
                <span dir="ltr">{s.value > 0 ? `+${s.value}` : s.value}</span>
              </div>
              <div dir="ltr" className="mt-2 flex justify-between text-xs text-white/80">
                <span>{s.negative}</span>
                <span>{s.positive}</span>
              </div>
              <div dir="ltr" className="relative mt-1 h-1.5 rounded-full bg-white/25">
                <div className="absolute inset-y-0 left-1/2 w-px bg-white/60" />
                <div
                  className="absolute inset-y-0 rounded-full bg-white"
                  style={{
                    left: s.value >= 0 ? '50%' : undefined,
                    right: s.value >= 0 ? undefined : '50%',
                    width: `${Math.min(50, Math.abs(s.value) / 2)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
