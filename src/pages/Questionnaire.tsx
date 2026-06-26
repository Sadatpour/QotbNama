import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { QUESTIONS_ORDERED } from '@/data/questions'
import type { LikertValue } from '@/types'
import { useQuiz } from '@/context/QuizContext'
import { useDirection } from '@/hooks/useDirection'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from '@/components/ui/Icon'

const INTRO_POINTS: Array<{ key: string; icon: IconName; color: string }> = [
  { key: 'purpose', icon: 'target', color: 'from-brand-blue to-brand-cyan' },
  { key: 'duration', icon: 'clock', color: 'from-brand-purple to-brand-indigo' },
  { key: 'privacy', icon: 'lock', color: 'from-brand-cyan to-brand-blue' },
  { key: 'nature', icon: 'graduation', color: 'from-brand-orange to-brand-purple' },
]

export function Questionnaire() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isRtl } = useDirection()
  const { answers, setAnswer, answeredCount, totalQuestions, finalize, isFinalized, resetQuiz } = useQuiz()

  const [index, setIndex] = useState(() => Math.min(0, QUESTIONS_ORDERED.length - 1))
  const [direction, setDirection] = useState(1)
  const advanceTimer = useRef<number | null>(null)
  const safeIndex = Math.min(Math.max(index, 0), QUESTIONS_ORDERED.length - 1)
  const question = QUESTIONS_ORDERED[safeIndex]
  const value = question ? answers[question.id] : undefined
  const isLast = index === totalQuestions - 1
  const progress = Math.round((answeredCount / totalQuestions) * 100)

  const goNext = useCallback(() => {
    setDirection(1)
    setIndex((i) => Math.min(i + 1, QUESTIONS_ORDERED.length - 1))
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => Math.max(i - 1, 0))
  }, [])

  const handleSelect = useCallback(
    (v: LikertValue) => {
      if (!question) return
      setAnswer(question.id, v)
      if (!isLast) {
        if (advanceTimer.current !== null) clearTimeout(advanceTimer.current)
        advanceTimer.current = window.setTimeout(() => {
          advanceTimer.current = null
          goNext()
        }, 280)
      }
    },
    [question, isLast, setAnswer, goNext],
  )

  const handleFinish = useCallback(() => {
    finalize()
    navigate('/results')
  }, [finalize, navigate])

  // If a previous quiz was finalized, reset to start fresh on entering this page.
  useEffect(() => {
    if (isFinalized) resetQuiz()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Clean up any pending auto-advance timer on unmount.
  useEffect(() => {
    return () => { if (advanceTimer.current !== null) clearTimeout(advanceTimer.current) }
  }, [])

  // Guard: ensure index stays in range if questions array length changes.
  useEffect(() => {
    if (index >= QUESTIONS_ORDERED.length) {
      setIndex(QUESTIONS_ORDERED.length - 1)
    }
  }, [index])

  // Keyboard: 1–7 select, arrows navigate.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key >= '1' && e.key <= '7') {
        handleSelect((Number(e.key) - 1) as LikertValue)
      } else if (e.key === 'ArrowRight') {
        isRtl ? goPrev() : goNext()
      } else if (e.key === 'ArrowLeft') {
        isRtl ? goNext() : goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleSelect, goNext, goPrev, isRtl])

  if (!question) return null

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span className="text-muted">
            {t('questionnaire.progress', { current: index + 1, total: totalQuestions })}
          </span>
          <span className="text-brand-indigo">{t('questionnaire.percent', { percent: progress })}</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full surface-3">
          <motion.div
            className="h-full rounded-full bg-brand-gradient"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.25 }}
          >
            <QuestionCard
              question={question}
              index={index}
              total={totalQuestions}
              value={value}
              onChange={handleSelect}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          className="btn-ghost"
        >
          <Icon name="arrow-left" size={18} className="rtl:rotate-180" />
          {t('common.previous')}
        </button>

        {/* Dots */}
        <div className="hidden max-w-[60%] flex-1 flex-wrap items-center justify-center gap-1.5 sm:flex">
          {QUESTIONS_ORDERED.map((q, i) => (
            <button
              key={q.id}
              type="button"
              aria-label={`${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? 'w-6 bg-brand-indigo'
                  : answers[q.id] !== undefined
                    ? 'w-2 bg-brand-cyan'
                    : 'w-2 surface-3'
              }`}
            />
          ))}
        </div>

        {isLast ? (
          <button type="button" onClick={handleFinish} className="btn-primary">
            {t('common.finish')}
            <Icon name="check" size={18} />
          </button>
        ) : (
          <button type="button" onClick={goNext} className="btn-ghost">
            {t('common.next')}
            <Icon name="arrow-right" size={18} className="rtl:rotate-180" />
          </button>
        )}
      </div>

      {/* Finish shortcut when there are answers */}
      {answeredCount > 0 && !isLast && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleFinish}
            className="text-sm font-semibold text-brand-indigo hover:underline"
          >
            {t('common.finish')}
            {answeredCount < totalQuestions &&
              ` · ${t('questionnaire.incompleteWarning', { count: totalQuestions - answeredCount })}`}
          </button>
        </div>
      )}

      {/* Intro info — shown below the quiz for those who want to read it */}
      <div className="mt-16 border-t border-base pt-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
          {t('nav.intro')}
        </p>
        <h2 className="mb-2 text-xl font-bold">{t('intro.title')}</h2>
        <p className="mb-8 text-muted">{t('intro.lead')}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {INTRO_POINTS.map((p) => (
            <div key={p.key} className="card flex flex-col gap-3 p-5">
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white ${p.color}`}
              >
                <Icon name={p.icon} size={18} />
              </span>
              <h3 className="font-bold">{t(`intro.${p.key}.title`)}</h3>
              <p className="text-sm text-muted">{t(`intro.${p.key}.desc`)}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-5">
          <span className="mt-0.5 shrink-0 text-brand-orange">
            <Icon name="alert-triangle" size={20} />
          </span>
          <div>
            <h3 className="font-bold text-brand-orange">{t('intro.disclaimerTitle')}</h3>
            <p className="mt-1 text-sm text-muted">{t('intro.disclaimer')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
