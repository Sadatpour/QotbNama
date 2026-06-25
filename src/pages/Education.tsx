import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EDUCATION_TOPICS, EDUCATION_CATEGORIES } from '@/data/education'
import { useQuiz } from '@/context/QuizContext'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { TopicCard } from '@/components/education/TopicCard'

type Filter = 'all' | (typeof EDUCATION_CATEGORIES)[number]

export function Education() {
  const { t } = useTranslation()
  const { result } = useQuiz()
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const recommended = new Set(result?.recommendedTopics ?? [])

  const topics = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = EDUCATION_TOPICS.filter((topic) => {
      if (filter !== 'all' && topic.category !== filter) return false
      if (!q) return true
      const title = t(`${topic.i18nKey}.title`).toLowerCase()
      const summary = t(`${topic.i18nKey}.summary`).toLowerCase()
      return title.includes(q) || summary.includes(q)
    })
    // Recommended topics float to the top when present.
    return list.sort((a, b) => Number(recommended.has(b.id)) - Number(recommended.has(a.id)))
  }, [filter, query, t, recommended])

  const filters: Filter[] = ['all', ...EDUCATION_CATEGORIES]

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading
        eyebrow={
          <>
            <Icon name="graduation" size={15} />
            {t('nav.education')}
          </>
        }
        title={t('education.title')}
        subtitle={t('education.subtitle')}
      />

      {/* Controls */}
      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 start-4 grid place-items-center text-muted">
            <Icon name="search" size={18} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('education.searchPlaceholder')}
            aria-label={t('education.searchPlaceholder')}
            className="w-full rounded-2xl border border-base surface py-3 ps-12 pe-4 text-sm outline-none transition-colors focus:border-brand-indigo"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                filter === f
                  ? 'bg-brand-gradient text-white shadow-glow'
                  : 'surface-3 text-muted hover:text-[color:rgb(var(--text))]'
              }`}
            >
              {f === 'all' ? t('education.all') : t(`education.categories.${f}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {topics.length === 0 ? (
        <p className="mt-12 text-center text-muted">{t('education.noResults')}</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, i) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              recommended={recommended.has(topic.id)}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  )
}
