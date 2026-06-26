import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useQuiz } from '@/context/QuizContext'
import { useDirection } from '@/hooks/useDirection'
import { quadrantKey, QUESTION_BY_ID } from '@/services/scoring'
import { DIMENSIONS } from '@/data/dimensions'
import { TOPIC_BY_ID } from '@/data/education'
import { Icon } from '@/components/ui/Icon'
import { Card } from '@/components/ui/Card'
import { PoliticalCompass } from '@/components/charts/PoliticalCompass'
import { DimensionRadar } from '@/components/charts/DimensionRadar'
import { DimensionBar } from '@/components/charts/DimensionBar'
import { ResultSummary } from '@/components/results/ResultSummary'
import { SharePanel } from '@/components/results/SharePanel'
import { ShareCard } from '@/components/results/ShareCard'
import { ResultReport } from '@/components/results/ResultReport'
import { TopicCard } from '@/components/education/TopicCard'
import { downloadElementAsImage } from '@/services/share'
import { generatePdfFromElement } from '@/services/pdf'
import { ResultHistory } from '@/components/results/ResultHistory'

export function Results() {
  const { t } = useTranslation()
  const { result, resetQuiz } = useQuiz()
  const { dir } = useDirection()
  const shareCardRef = useRef<HTMLDivElement>(null)
  const reportRef = useRef<HTMLDivElement>(null)

  if (!result) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-24 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-3xl surface-3 text-brand-indigo">
          <Icon name="compass" size={40} />
        </span>
        <h1 className="text-2xl font-extrabold">{t('results.noResultTitle')}</h1>
        <p className="text-muted">{t('results.noResultDesc')}</p>
        <Link to="/intro" className="btn-primary">
          <Icon name="arrow-right" size={18} className="rtl:rotate-180" />
          {t('common.start')}
        </Link>
      </div>
    )
  }

  const key = quadrantKey(result.compass.economic, result.compass.social)
  const shareText = t('share.shareText', { quadrant: t(`results.quadrants.${key}`) })
  const url = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : ''

  const references = result.recommendedTopics
    .map((id) => TOPIC_BY_ID[id])
    .filter((tp) => tp.position)
    .map((tp) => ({ id: tp.id, economic: tp.position!.economic, social: tp.position!.social }))

  async function handleDownloadImage() {
    if (shareCardRef.current) {
      await downloadElementAsImage(shareCardRef.current, 'qotbnama-result.png')
    }
  }

  async function handleDownloadPdf() {
    if (reportRef.current) {
      await generatePdfFromElement(reportRef.current, { fileName: 'qotbnama-report.pdf' })
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{t('results.title')}</h1>
          <p className="mt-1 text-muted">{t('results.subtitle')}</p>
        </div>
        <button type="button" onClick={resetQuiz} className="btn-ghost">
          <Icon name="refresh" size={18} />
          {t('common.retake')}
        </button>
      </motion.div>

      <div className="grid gap-6">
        {/* Summary hero */}
        <ResultSummary result={result} />

        {/* Compass + radar */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card animate>
            <h2 className="mb-1 text-lg font-bold">{t('results.compassTitle')}</h2>
            <p className="mb-4 text-xs text-muted">{t('results.compassHint')}</p>
            <PoliticalCompass
              economic={result.compass.economic}
              social={result.compass.social}
              references={references}
            />
          </Card>
          <Card animate delay={0.05}>
            <h2 className="mb-4 text-lg font-bold">{t('results.radarTitle')}</h2>
            <DimensionRadar result={result} />
          </Card>
        </div>

        {/* Dimension bars */}
        <Card animate>
          <h2 className="mb-6 text-lg font-bold">{t('results.barsTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {DIMENSIONS.map((d, i) => (
              <DimensionBar key={d.id} score={result.scores[d.id]} delay={i * 0.05} />
            ))}
          </div>
        </Card>

        {/* Detailed analysis */}
        <Card animate>
          <h2 className="mb-4 text-lg font-bold">{t('results.analysisTitle')}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-brand-indigo">
                <Icon name="info" size={18} />
                {t('results.whyTitle')}
              </h3>
              <p className="mt-2 text-sm text-muted">{t('results.whyDesc')}</p>

              <h3 className="mt-5 flex items-center gap-2 font-semibold text-brand-cyan">
                <Icon name="target" size={18} />
                {t('results.contributorsTitle')}
              </h3>
              <p className="mt-1 text-sm text-muted">{t('results.contributorsDesc')}</p>
              <ul className="mt-2 flex flex-col gap-3">
                {result.topContributors.map((c) => (
                  <li key={c.questionId} className="rounded-xl border border-base p-3 text-sm">
                    <span className="block leading-snug">{t(QUESTION_BY_ID[c.questionId].i18nKey)}</span>
                    <span className="mt-1.5 flex items-center gap-1.5">
                      <span className="text-xs text-muted">{t('results.yourAnswer')}:</span>
                      <span className={`chip text-xs font-semibold ${c.contribution > 0 ? 'bg-brand-cyan/15 text-brand-cyan' : 'bg-brand-orange/15 text-brand-orange'}`}>
                        {t(`likert.${c.answer}`)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-semibold text-brand-orange">
                <Icon name="sparkles" size={18} />
                {t('results.strengthsTitle')}
              </h3>
              <p className="mt-1 text-sm text-muted">{t('results.strengthsDesc')}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {DIMENSIONS.filter((d) => result.scores[d.id].lean !== 'center').map((d) => {
                  const sc = result.scores[d.id]
                  const pole = sc.value >= 0 ? 'positive' : 'negative'
                  return (
                    <span key={d.id} className="chip surface-3 text-sm">
                      {t(`${d.i18nKey}.name`)} · {t(`${d.i18nKey}.${pole}`)}
                    </span>
                  )
                })}
              </div>

              <h3 className="mt-5 flex items-center gap-2 font-semibold text-muted">
                <Icon name="alert-triangle" size={18} />
                {t('results.limitsTitle')}
              </h3>
              <p className="mt-1 text-sm text-muted">{t('results.limitsDesc')}</p>
            </div>
          </div>
        </Card>

        {/* Recommended topics */}
        <Card animate padded={false} className="p-6 sm:p-8">
          <h2 className="text-lg font-bold">{t('results.recommendedTitle')}</h2>
          <p className="mb-5 mt-1 text-sm text-muted">{t('results.recommendedDesc')}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.recommendedTopics.slice(0, 6).map((id, i) => (
              <TopicCard key={id} topic={TOPIC_BY_ID[id]} recommended index={i} />
            ))}
          </div>
        </Card>

        {/* Previous assessments on this device */}
        <ResultHistory currentResult={result} />

        {/* Share */}
        <Card animate>
          <SharePanel
            shareText={shareText}
            url={url}
            onDownloadImage={handleDownloadImage}
            onDownloadPdf={handleDownloadPdf}
          />
        </Card>
      </div>

      {/* Off-screen capture targets */}
      <div dir={dir} aria-hidden="true" style={{ position: 'fixed', left: -99999, top: 0 }}>
        <ShareCard ref={shareCardRef} result={result} />
        <ResultReport ref={reportRef} result={result} />
      </div>
    </div>
  )
}
