import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from '@/components/ui/Icon'

const POINTS: Array<{ key: string; icon: IconName; color: string }> = [
  { key: 'purpose', icon: 'target', color: 'from-brand-blue to-brand-cyan' },
  { key: 'duration', icon: 'clock', color: 'from-brand-purple to-brand-indigo' },
  { key: 'privacy', icon: 'lock', color: 'from-brand-cyan to-brand-blue' },
  { key: 'nature', icon: 'graduation', color: 'from-brand-orange to-brand-purple' },
]

export function Introduction() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center"
      >
        <span className="chip surface-3 text-sm font-semibold text-brand-indigo">
          <Icon name="info" size={15} />
          {t('nav.intro')}
        </span>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{t('intro.title')}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted text-balance">{t('intro.lead')}</p>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {POINTS.map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="card flex flex-col gap-3 p-6"
          >
            <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white ${p.color}`}>
              <Icon name={p.icon} size={22} />
            </span>
            <h2 className="text-lg font-bold">{t(`intro.${p.key}.title`)}</h2>
            <p className="text-sm text-muted">{t(`intro.${p.key}.desc`)}</p>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-6 flex items-start gap-3 rounded-3xl border border-brand-orange/30 bg-brand-orange/5 p-6"
      >
        <span className="mt-0.5 shrink-0 text-brand-orange">
          <Icon name="alert-triangle" size={22} />
        </span>
        <div>
          <h3 className="font-bold text-brand-orange">{t('intro.disclaimerTitle')}</h3>
          <p className="mt-1 text-sm text-muted">{t('intro.disclaimer')}</p>
        </div>
      </motion.div>

      <div className="mt-10 flex justify-center">
        <Link to="/quiz" className="btn-primary text-lg">
          <Icon name="arrow-right" size={20} className="rtl:rotate-180" />
          {t('intro.start')}
        </Link>
      </div>
    </div>
  )
}
