import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { CountryInfo } from '@/data/countries'
import { SYSTEM_META, flagEmoji } from '@/data/countries'
import { TOPIC_BY_ID } from '@/data/education'
import { Icon } from '@/components/ui/Icon'

export interface ActiveCountry {
  id: string
  name: string
  info: CountryInfo | null
}

interface CountryPanelProps {
  active: ActiveCountry | null
}

export function CountryPanel({ active }: CountryPanelProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.slice(0, 2) || 'en'

  if (!active) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-3xl surface-3 text-brand-indigo">
          <Icon name="compass" size={32} />
        </span>
        <h3 className="text-lg font-bold">{t('map.selectPrompt')}</h3>
        <p className="text-sm text-muted">{t('map.selectPromptDesc')}</p>
      </div>
    )
  }

  const { info, name } = active
  const meta = info ? SYSTEM_META[info.system] : null
  const topic = meta?.topicId ? TOPIC_BY_ID[meta.topicId] : undefined
  const popStr =
    info && info.population > 0
      ? new Intl.NumberFormat(lang).format(info.population)
      : null

  return (
    <motion.div
      key={active.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col gap-5 p-6"
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl leading-none" aria-hidden="true">
          {flagEmoji(info?.a2 ?? null)}
        </span>
        <div>
          <h3 className="text-2xl font-extrabold leading-tight">{name}</h3>
          {info && (
            <span
              className="mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
              style={{ backgroundColor: SYSTEM_META[info.system].color }}
            >
              {t(`systems.${info.system}.label`)}
            </span>
          )}
        </div>
      </div>

      {!info ? (
        <p className="text-sm text-muted">{t('map.notAvailable')}</p>
      ) : (
        <>
          {/* System description */}
          <p className="rounded-2xl surface-3 p-4 text-sm leading-relaxed text-muted">
            {t(`systems.${info.system}.desc`)}
          </p>

          {/* Facts */}
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Fact icon="landmark" label={t('map.system')} value={t(`systems.${info.system}.label`)} />
            {info.capital && (
              <Fact icon="target" label={t('map.capital')} value={info.capital} ltr />
            )}
            {popStr && (
              <Fact icon="users" label={t('map.population')} value={popStr} />
            )}
            <Fact icon="compass" label={t('map.region')} value={t(`regions.${info.region}`)} />
          </dl>

          {topic && (
            <Link
              to={`/education/${topic.id}`}
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-indigo hover:underline"
            >
              {t('common.learnMore')} · {t(`${topic.i18nKey}.title`)}
              <Icon name="arrow-right" size={16} className="rtl:rotate-180" />
            </Link>
          )}
        </>
      )}
    </motion.div>
  )
}

function Fact({
  icon,
  label,
  value,
  ltr = false,
}: {
  icon: 'landmark' | 'target' | 'users' | 'compass'
  label: string
  value: string
  ltr?: boolean
}) {
  return (
    <div className="rounded-2xl border border-base p-3">
      <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted">
        <Icon name={icon} size={14} />
        {label}
      </dt>
      <dd className="mt-1 font-bold" dir={ltr ? 'ltr' : undefined}>
        {value}
      </dd>
    </div>
  )
}
