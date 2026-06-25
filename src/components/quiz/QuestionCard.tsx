import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import type { LikertValue, Question } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { LikertScale } from './LikertScale'

interface QuestionCardProps {
  question: Question
  index: number
  total: number
  value: LikertValue | undefined
  onChange: (value: LikertValue) => void
}

export function QuestionCard({ question, index, total, value, onChange }: QuestionCardProps) {
  const { t } = useTranslation()
  const [showMeta, setShowMeta] = useState(false)

  return (
    <div className="card p-6 sm:p-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-sm font-bold text-white">
          {index + 1}
        </span>
        <span className="text-sm font-medium text-muted">
          {t('questionnaire.progress', { current: index + 1, total })}
        </span>
      </div>

      <h2 className="text-balance text-xl font-bold leading-relaxed sm:text-2xl">
        {t(question.i18nKey)}
      </h2>

      <p className="mt-2 text-sm text-muted">{t('questionnaire.selectHint')}</p>

      <div className="mt-8">
        <LikertScale value={value} onChange={onChange} name={question.id} />
      </div>

      <div className="mt-8 border-t border-base pt-4">
        <button
          type="button"
          onClick={() => setShowMeta((s) => !s)}
          aria-expanded={showMeta}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-brand-indigo"
        >
          <Icon name="info" size={14} />
          {showMeta ? t('questionnaire.hideMeta') : t('questionnaire.showMeta')}
        </button>
        <AnimatePresence>
          {showMeta && (
            <motion.dl
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                <div className="rounded-xl surface-3 p-3">
                  <dt className="font-semibold text-muted">{t('questionnaire.metaDimension')}</dt>
                  <dd>{t(`dimensions.${question.dimension}.name`)}</dd>
                </div>
                <div className="rounded-xl surface-3 p-3">
                  <dt className="font-semibold text-muted">{t('questionnaire.metaSource')}</dt>
                  <dd dir="ltr" className="text-start">{question.source}</dd>
                </div>
              </div>
            </motion.dl>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
