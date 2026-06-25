import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { EducationTopic } from '@/types'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from '@/components/ui/Icon'

interface TopicCardProps {
  topic: EducationTopic
  recommended?: boolean
  index?: number
}

const ACCENT: Record<EducationTopic['accent'], string> = {
  blue: 'from-brand-blue to-brand-cyan',
  purple: 'from-brand-purple to-brand-indigo',
  cyan: 'from-brand-cyan to-brand-blue',
  orange: 'from-brand-orange to-brand-purple',
  indigo: 'from-brand-indigo to-brand-blue',
}

export function TopicCard({ topic, recommended = false, index = 0 }: TopicCardProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
    >
      <Link
        to={`/education/${topic.id}`}
        className="group flex h-full flex-col gap-4 rounded-3xl border border-base surface p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-glow"
      >
        <div className="flex items-start justify-between">
          <span
            className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white ${ACCENT[topic.accent]}`}
          >
            <Icon name={topic.icon as IconName} size={22} />
          </span>
          {recommended && (
            <span className="chip bg-brand-indigo/10 text-xs font-semibold text-brand-indigo">
              <Icon name="sparkles" size={13} />
              {t('education.recommendedBadge')}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold transition-colors group-hover:text-brand-indigo">
            {t(`${topic.i18nKey}.title`)}
          </h3>
          <p className="mt-1 text-sm text-muted">{t(`${topic.i18nKey}.summary`)}</p>
        </div>

        <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-indigo">
          {t('common.learnMore')}
          <Icon name="arrow-right" size={16} className="rtl:rotate-180" />
        </span>
      </Link>
    </motion.div>
  )
}
