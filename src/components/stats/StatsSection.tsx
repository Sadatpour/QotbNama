import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { storage } from '@/services/storage'
import { Icon } from '@/components/ui/Icon'
import type { AssessmentResult } from '@/types'

interface StatsSectionProps {
  currentResult?: AssessmentResult
}

const QUADRANT_COLORS: Record<string, string> = {
  centrist: 'bg-slate-400',
  'libertarian-left': 'bg-brand-cyan',
  'libertarian-right': 'bg-brand-blue',
  'authoritarian-left': 'bg-brand-orange',
  'authoritarian-right': 'bg-brand-purple',
}

export function StatsSection({ currentResult }: StatsSectionProps) {
  const { t } = useTranslation()

  const history = useMemo(() => storage.getCompletionHistory(), [])

  const quadrantCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    history.forEach((r) => {
      counts[r.quadrant] = (counts[r.quadrant] ?? 0) + 1
    })
    return counts
  }, [history])

  const totalCompletions = history.length
  if (totalCompletions === 0) return null

  const avgEconomic = history.reduce((s, r) => s + r.economic, 0) / totalCompletions
  const avgSocial = history.reduce((s, r) => s + r.social, 0) / totalCompletions

  const mostCommonQuadrant =
    Object.entries(quadrantCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'centrist'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-3xl border border-base surface-3 p-6 sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-white">
          <Icon name="chart-bar" size={20} />
        </span>
        <div>
          <h2 className="text-lg font-bold">{t('stats.title')}</h2>
          <p className="text-sm text-muted">{t('stats.subtitle')}</p>
        </div>
      </div>

      {/* Summary numbers */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="card p-4 text-center">
          <p className="text-3xl font-extrabold text-brand-indigo">{totalCompletions}</p>
          <p className="mt-1 text-xs text-muted">{t('stats.totalCompletions')}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-extrabold text-brand-cyan">
            {avgEconomic >= 0 ? '+' : ''}
            {avgEconomic.toFixed(1)}
          </p>
          <p className="mt-1 text-xs text-muted">{t('stats.avgEconomic')}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-extrabold text-brand-orange">
            {avgSocial >= 0 ? '+' : ''}
            {avgSocial.toFixed(1)}
          </p>
          <p className="mt-1 text-xs text-muted">{t('stats.avgSocial')}</p>
        </div>
      </div>

      {/* Quadrant distribution */}
      {Object.keys(quadrantCounts).length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-muted">{t('stats.quadrantDist')}</h3>
          <div className="flex flex-col gap-2">
            {Object.entries(quadrantCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([quadrant, count]) => {
                const pct = Math.round((count / totalCompletions) * 100)
                return (
                  <div key={quadrant} className="flex items-center gap-3">
                    <span className="w-36 shrink-0 text-xs text-muted">
                      {t(`results.quadrants.${quadrant}`)}
                    </span>
                    <div className="flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6 }}
                        className={`h-2.5 rounded-full ${QUADRANT_COLORS[quadrant] ?? 'bg-brand-indigo'}`}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-xs font-semibold text-muted">
                      {pct}%
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* Current result highlight */}
      {currentResult && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl bg-brand-indigo/10 p-4 text-sm">
          <Icon name="info" size={16} className="mt-0.5 shrink-0 text-brand-indigo" />
          <p className="text-muted">
            {t('stats.yourResult', {
              quadrant: t(
                `results.quadrants.${mostCommonQuadrant}`,
              ),
            })}
          </p>
        </div>
      )}

      <Link
        to="/share"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-indigo hover:underline"
      >
        <Icon name="share" size={15} />
        {t('stats.shareLink')}
      </Link>
    </motion.div>
  )
}
