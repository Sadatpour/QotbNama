import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { storage } from '@/services/storage'
import type { CompletionRecord } from '@/services/storage'
import { quadrantKey } from '@/services/scoring'
import { Icon } from '@/components/ui/Icon'
import type { AssessmentResult } from '@/types'

interface ResultHistoryProps {
  currentResult: AssessmentResult
}

const QUADRANT_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  centrist:             { bg: 'bg-slate-100 dark:bg-slate-800',    text: 'text-slate-600 dark:text-slate-300',   dot: 'bg-slate-400' },
  'libertarian-left':   { bg: 'bg-cyan-50 dark:bg-cyan-950',       text: 'text-cyan-700 dark:text-cyan-300',     dot: 'bg-brand-cyan' },
  'libertarian-right':  { bg: 'bg-blue-50 dark:bg-blue-950',       text: 'text-blue-700 dark:text-blue-300',     dot: 'bg-brand-blue' },
  'authoritarian-left': { bg: 'bg-orange-50 dark:bg-orange-950',   text: 'text-orange-700 dark:text-orange-300', dot: 'bg-brand-orange' },
  'authoritarian-right':{ bg: 'bg-purple-50 dark:bg-purple-950',   text: 'text-purple-700 dark:text-purple-300', dot: 'bg-brand-purple' },
}

function qs(quadrant: string) {
  return QUADRANT_STYLES[quadrant] ?? QUADRANT_STYLES['centrist']
}

function ScoreBar({ value, color }: { value: number; color: string }) {
  const pct = ((value + 100) / 200) * 100
  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <div className={`absolute top-0 h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-400/40" />
    </div>
  )
}

function Delta({ delta }: { delta: number }) {
  if (Math.abs(delta) < 1) return null
  const up = delta > 0
  return (
    <span className={`ms-1 inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[10px] font-bold ${up ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'}`}>
      {up ? '▲' : '▼'} {Math.abs(delta).toFixed(0)}
    </span>
  )
}

export function ResultHistory({ currentResult }: ResultHistoryProps) {
  const { t, i18n } = useTranslation()

  const history = useMemo(() => storage.getCompletionHistory(), [])

  // All entries except the current (last) one, newest-first
  const previous = useMemo<CompletionRecord[]>(() => {
    if (history.length <= 1) return []
    return [...history.slice(0, -1)].reverse()
  }, [history])

  if (previous.length === 0) return null

  const currentQuadrant = quadrantKey(currentResult.compass.economic, currentResult.compass.social)
  const latest = previous[0]
  const ecoDelta = currentResult.compass.economic - latest.economic
  const socDelta  = currentResult.compass.social  - latest.social

  const fmtDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(i18n.language, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso))
    } catch { return iso.slice(0, 10) }
  }

  const noticeable = Math.abs(ecoDelta) >= 5 || Math.abs(socDelta) >= 5

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
      className="rounded-3xl border border-base surface-3 p-6 sm:p-8"
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-white">
          <Icon name="clock" size={20} />
        </span>
        <div>
          <h2 className="text-lg font-bold">{t('history.title')}</h2>
          <p className="text-sm text-muted">{t('history.subtitle', { count: previous.length })}</p>
        </div>
      </div>

      {/* Side-by-side comparison with most recent previous result */}
      <div className="mb-6 rounded-2xl border border-base p-4 sm:p-5">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted">
          {t('history.compareTitle')}
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* ── Previous ── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-muted">{t('history.previous')}</span>
              <span className="text-xs text-muted">{fmtDate(latest.completedAt)}</span>
            </div>

            <span className={`inline-flex w-fit items-center gap-1.5 rounded-xl px-3 py-1 text-sm font-semibold ${qs(latest.quadrant).bg} ${qs(latest.quadrant).text}`}>
              <span className={`h-2 w-2 rounded-full ${qs(latest.quadrant).dot}`} />
              {t(`results.quadrants.${latest.quadrant}`)}
            </span>

            <div className="flex flex-col gap-2.5 text-xs text-muted">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span>{t('history.economic')}</span>
                  <span className="font-mono font-semibold">{latest.economic >= 0 ? '+' : ''}{latest.economic.toFixed(0)}</span>
                </div>
                <ScoreBar value={latest.economic} color="bg-brand-indigo/40" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span>{t('history.social')}</span>
                  <span className="font-mono font-semibold">{latest.social >= 0 ? '+' : ''}{latest.social.toFixed(0)}</span>
                </div>
                <ScoreBar value={latest.social} color="bg-brand-orange/40" />
              </div>
            </div>
          </div>

          {/* ── Current ── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-brand-indigo">{t('history.current')}</span>
              <span className="text-xs text-muted">{fmtDate(currentResult.completedAt)}</span>
            </div>

            <span className={`inline-flex w-fit items-center gap-1.5 rounded-xl px-3 py-1 text-sm font-semibold ${qs(currentQuadrant).bg} ${qs(currentQuadrant).text}`}>
              <span className={`h-2 w-2 rounded-full ${qs(currentQuadrant).dot}`} />
              {t(`results.quadrants.${currentQuadrant}`)}
            </span>

            <div className="flex flex-col gap-2.5 text-xs text-muted">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span>{t('history.economic')}</span>
                  <span className="font-mono font-semibold">
                    {currentResult.compass.economic >= 0 ? '+' : ''}{currentResult.compass.economic.toFixed(0)}
                    <Delta delta={ecoDelta} />
                  </span>
                </div>
                <ScoreBar value={currentResult.compass.economic} color="bg-brand-indigo" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span>{t('history.social')}</span>
                  <span className="font-mono font-semibold">
                    {currentResult.compass.social >= 0 ? '+' : ''}{currentResult.compass.social.toFixed(0)}
                    <Delta delta={socDelta} />
                  </span>
                </div>
                <ScoreBar value={currentResult.compass.social} color="bg-brand-orange" />
              </div>
            </div>
          </div>
        </div>

        {/* Change insight */}
        {noticeable && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-brand-indigo/8 p-3 text-sm text-muted">
            <Icon name="sparkles" size={14} className="mt-0.5 shrink-0 text-brand-indigo" />
            <p>
              {t('history.changeNote', {
                eco: ecoDelta >= 0
                  ? t('history.movedRight', { val: Math.abs(ecoDelta).toFixed(0) })
                  : t('history.movedLeft',  { val: Math.abs(ecoDelta).toFixed(0) }),
                soc: socDelta >= 0
                  ? t('history.movedAuth', { val: Math.abs(socDelta).toFixed(0) })
                  : t('history.movedLib',  { val: Math.abs(socDelta).toFixed(0) }),
              })}
            </p>
          </div>
        )}
      </div>

      {/* Compact list of all previous attempts */}
      {previous.length > 1 && (
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted">
            {t('history.allPrevious')}
          </p>
          <div className="flex flex-col gap-1.5">
            {previous.map((rec, i) => (
              <div
                key={rec.completedAt}
                className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-base px-4 py-2.5 text-sm"
              >
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${qs(rec.quadrant).dot}`} />
                <span className="flex-1 font-semibold">{t(`results.quadrants.${rec.quadrant}`)}</span>
                <span className="font-mono text-xs text-muted">
                  {t('history.eco')}&thinsp;{rec.economic >= 0 ? '+' : ''}{rec.economic.toFixed(0)}
                  &ensp;
                  {t('history.soc')}&thinsp;{rec.social >= 0 ? '+' : ''}{rec.social.toFixed(0)}
                </span>
                <span className="text-xs text-muted">{fmtDate(rec.completedAt)}</span>
                {i === 0 && (
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {t('history.latestPrev')}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-5 flex items-center gap-1.5 text-xs text-muted">
        <Icon name="lock" size={12} className="shrink-0" />
        {t('history.privacyNote')}
      </p>
    </motion.div>
  )
}
