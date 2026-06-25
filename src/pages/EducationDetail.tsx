import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { EDUCATION_TOPICS, TOPIC_BY_ID } from '@/data/education'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from '@/components/ui/Icon'
import { AccordionItem } from '@/components/ui/Accordion'
import { PoliticalCompass } from '@/components/charts/PoliticalCompass'

const ACCENT: Record<string, string> = {
  blue: 'from-brand-blue to-brand-cyan',
  purple: 'from-brand-purple to-brand-indigo',
  cyan: 'from-brand-cyan to-brand-blue',
  orange: 'from-brand-orange to-brand-purple',
  indigo: 'from-brand-indigo to-brand-blue',
}

const SECTIONS: Array<{ field: string; icon: IconName; color: string; list: boolean }> = [
  { field: 'definition', icon: 'book', color: 'text-brand-blue', list: false },
  { field: 'history', icon: 'clock', color: 'text-brand-purple', list: false },
  { field: 'advantages', icon: 'check', color: 'text-brand-cyan', list: true },
  { field: 'criticisms', icon: 'alert-triangle', color: 'text-brand-orange', list: true },
  { field: 'examples', icon: 'landmark', color: 'text-brand-indigo', list: true },
  { field: 'misconceptions', icon: 'info', color: 'text-brand-purple', list: true },
]

export function EducationDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const topic = id ? TOPIC_BY_ID[id] : undefined

  if (!topic) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-extrabold">{t('education.noResults')}</h1>
        <Link to="/education" className="btn-primary mt-6 inline-flex">
          {t('common.back')}
        </Link>
      </div>
    )
  }

  // Related = same category, excluding self (up to 3).
  const related = EDUCATION_TOPICS.filter(
    (tp) => tp.category === topic.category && tp.id !== topic.id,
  ).slice(0, 3)

  function getList(field: string): string[] {
    const value = i18n.t(`${topic!.i18nKey}.${field}`, { returnObjects: true })
    return Array.isArray(value) ? (value as string[]) : []
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        to="/education"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-brand-indigo"
      >
        <Icon name="arrow-left" size={16} className="rtl:rotate-180" />
        {t('nav.education')}
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-5 flex items-start gap-4"
      >
        <span
          className={`grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-gradient-to-br text-white shadow-glow ${ACCENT[topic.accent]}`}
        >
          <Icon name={topic.icon as IconName} size={30} />
        </span>
        <div>
          <span className="chip surface-3 text-xs font-semibold text-brand-indigo">
            {t(`education.categories.${topic.category}`)}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{t(`${topic.i18nKey}.title`)}</h1>
          <p className="mt-1 text-muted">{t(`${topic.i18nKey}.summary`)}</p>
        </div>
      </motion.div>

      {/* Compass position */}
      {topic.position && (
        <div className="mt-8 card">
          <h2 className="mb-3 text-sm font-bold text-muted">{t('results.compassTitle')}</h2>
          <PoliticalCompass economic={topic.position.economic} social={topic.position.social} />
        </div>
      )}

      {/* Sections */}
      <div className="mt-8 flex flex-col gap-3">
        {SECTIONS.map((s, i) => (
          <AccordionItem
            key={s.field}
            title={t(`education.fields.${s.field}`)}
            icon={s.icon}
            iconColor={s.color}
            defaultOpen={i < 2}
          >
            {s.list ? (
              <ul className="flex flex-col gap-2">
                {getList(s.field).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${s.color}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t(`${topic.i18nKey}.${s.field}`)}</p>
            )}
          </AccordionItem>
        ))}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">{t('education.categories.' + topic.category)}</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((tp) => (
              <Link
                key={tp.id}
                to={`/education/${tp.id}`}
                className="group flex items-center gap-3 rounded-2xl border border-base surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white ${ACCENT[tp.accent]}`}
                >
                  <Icon name={tp.icon as IconName} size={18} />
                </span>
                <span className="text-sm font-semibold group-hover:text-brand-indigo">
                  {t(`${tp.i18nKey}.title`)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
