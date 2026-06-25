import { useTranslation } from 'react-i18next'
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import type { AssessmentResult } from '@/types'
import { DIMENSIONS } from '@/data/dimensions'

interface DimensionRadarProps {
  result: AssessmentResult
}

export function DimensionRadar({ result }: DimensionRadarProps) {
  const { t } = useTranslation()

  // Map the signed score [-100,100] to [0,100] so the center (0) sits mid-axis
  // and the radar shows where on each spectrum the user falls.
  const data = DIMENSIONS.map((d) => ({
    key: d.id,
    label: t(`${d.i18nKey}.name`),
    value: Math.round((result.scores[d.id].value + 100) / 2),
  }))

  return (
    <div className="h-72 w-full sm:h-80" aria-label={t('results.radarTitle')}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="currentColor" className="text-slate-300 dark:text-slate-600" />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: 'currentColor' }}
            className="text-muted"
          />
          <Radar
            name={t('results.radarTitle')}
            dataKey="value"
            stroke="#7c3aed"
            strokeWidth={2}
            fill="#7c3aed"
            fillOpacity={0.35}
            isAnimationActive
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
