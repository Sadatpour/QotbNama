import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { QUESTIONS_ORDERED } from '@/data/questions'
import type { LikertValue } from '@/types'
import { useQuiz } from '@/context/QuizContext'
import { useDirection } from '@/hooks/useDirection'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { Icon } from '@/components/ui/Icon'

export function Questionnaire() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isRtl } = useDirection()
  const { answers, setAnswer, answeredCount, totalQuestions, finalize } = useQuiz()

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const question = QUESTIONS_ORDERED[index]
  const value = answers[question.id]
  const isLast = index === totalQuestions - 1
  const progress = Math.round((answeredCount / totalQuestions) * 100)

  const goNext = useCallback(() => {
    setDirection(1)
    setIndex((i) => Math.min(i + 1, totalQuestions - 1))
  }, [totalQuestions])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => Math.max(i - 1, 0))
  }, [])

  const handleSelect = useCallback(
    (v: LikertValue) => {
      setAnswer(question.id, v)
      if (!isLast) {
        window.setTimeout(() => goNext(), 280)
      }
    },
    [question.id, isLast, setAnswer, goNext],
  )

  const handleFinish = useCallback(() => {
    finalize()
    navigate('/results')
  }, [finalize, navigate])

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
    </div>
  )
}
