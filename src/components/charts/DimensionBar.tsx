import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { DimensionScore } from '@/types'
import { DIMENSION_BY_ID } from '@/data/dimensions'

interface DimensionBarProps {
  score: DimensionScore
  delay?: number
}

/**
 * A centered, signed bar: the track runs from the negative pole on one end to
 * the positive pole on the other, with a fill growing from the center toward
 * the leaning side.
 */
export function DimensionBar({ score, delay = 0 }: DimensionBarProps) {
  const { t } = useTranslation()
  const meta = DIMENSION_BY_ID[score.id]
  const toPositive = score.value >= 0
  const widthPct = Math.min(50, Math.abs(score.value) / 2) // half-track is 50%

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>{t(`${meta.i18nKey}.name`)}</span>
        <span className="text-muted">
          {score.lean === 'center'
            ? t('results.centerLabel')
            : t('results.towards', {
                pole: t(`${meta.i18nKey}.${toPositive ? 'positive' : 'negative'}`),
              })}
        </span>
      </div>

      {/* Pole labels + track are forced LTR so "negative" is always physically
          left and "positive" always physically right, regardless of page dir. */}
      <div dir="ltr" className="flex items-center justify-between text-xs text-muted">
        <span>{t(`${meta.i18nKey}.negative`)}</span>
        <span>{t(`${meta.i18nKey}.positive`)}</span>
      </div>

      <div dir="ltr" className="relative h-3 overflow-hidden rounded-full surface-3">
        {/* center marker */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-400/60" />
        <motion.div
          className="absolute inset-y-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${meta.color}, ${meta.color}cc)`,
            left: toPositive ? '50%' : undefined,
            right: toPositive ? undefined : '50%',
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${widthPct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
