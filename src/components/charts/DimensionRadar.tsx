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

  // Use magnitude (absolute value) so the spike shows HOW STRONG the lean is,
  // not WHERE on the spectrum. A neutral score (0) = no spike; a strong view = large spike.
  const data = DIMENSIONS.map((d) => ({
    key: d.id,
    label: t(`${d.i18nKey}.name`),
    value: result.scores[d.id].magnitude,
    lean: result.scores[d.id].lean,
    pole: result.scores[d.id].value >= 0 ? 'positive' : 'negative',
  }))

  return (
    <div>
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

      {/* Lean legend: one chip per non-center dimension */}
      <div className="mt-3 flex flex-wrap gap-2">
        {data.map((d) => (
          <span
            key={d.key}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${
              d.lean === 'center'
                ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                : d.pole === 'positive'
                  ? 'bg-brand-indigo/10 text-brand-indigo'
                  : 'bg-brand-orange/10 text-brand-orange'
            }`}
          >
            <span className="font-semibold">{d.label}:</span>
            {d.lean === 'center'
              ? t('results.radarCenter')
              : t(`${DIMENSIONS.find(dim => dim.id === d.key)!.i18nKey}.${d.pole}`)}
          </span>
        ))}
      </div>
    </div>
  )
}
