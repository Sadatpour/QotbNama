import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Answers, AssessmentResult, LikertValue } from '@/types'
import { QUESTIONS } from '@/data/questions'
import { computeResult } from '@/services/scoring'
import { storage } from '@/services/storage'

interface QuizContextValue {
  answers: Answers
  setAnswer: (questionId: string, value: LikertValue) => void
  resetQuiz: () => void
  answeredCount: number
  totalQuestions: number
  isComplete: boolean
  hasAnyAnswer: boolean
  /** Computed result if the quiz was completed, else null. */
  result: AssessmentResult | null
  /** Force a (re)computation and persist completion time. */
  finalize: () => AssessmentResult
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Answers>(() => storage.getAnswers())
  const [completedAt, setCompletedAt] = useState<string | null>(() => storage.getCompletedAt())

  const setAnswer = useCallback((questionId: string, value: LikertValue) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value }
      storage.saveAnswers(next)
      return next
    })
  }, [])

  const resetQuiz = useCallback(() => {
    setAnswers({})
    setCompletedAt(null)
    storage.clearAssessment()
  }, [])

  const finalize = useCallback((): AssessmentResult => {
    const iso = new Date().toISOString()
    setCompletedAt(iso)
    storage.setCompletedAt(iso)
    return computeResult(answers, iso)
  }, [answers])

  const answeredCount = useMemo(
    () => QUESTIONS.filter((q) => answers[q.id] !== undefined).length,
    [answers],
  )

  const result = useMemo<AssessmentResult | null>(() => {
    if (!completedAt || answeredCount === 0) return null
    return computeResult(answers, completedAt)
  }, [answers, completedAt, answeredCount])

  const value = useMemo<QuizContextValue>(
    () => ({
      answers,
      setAnswer,
      resetQuiz,
      answeredCount,
      totalQuestions: QUESTIONS.length,
      isComplete: answeredCount === QUESTIONS.length,
      hasAnyAnswer: answeredCount > 0,
      result,
      finalize,
    }),
    [answers, setAnswer, resetQuiz, answeredCount, result, finalize],
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuiz(): QuizContextValue {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider')
  return ctx
}
