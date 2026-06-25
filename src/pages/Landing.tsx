import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useQuiz } from '@/context/QuizContext'

const FEATURES: Array<{ key: string; icon: IconName }> = [
  { key: 'neutral', icon: 'scale' },
  { key: 'private', icon: 'lock' },
  { key: 'educational', icon: 'graduation' },
  { key: 'visual', icon: 'target' },
]

const STEPS: Array<{ key: string; icon: IconName }> = [
  { key: 'one', icon: 'vote' },
  { key: 'two', icon: 'compass' },
  { key: 'three', icon: 'book' },
]

export function Landing() {
  const { t } = useTranslation()
  const { hasAnyAnswer, result } = useQuiz()

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-start"
        >
          <span className="chip surface-3 text-sm font-semibold text-brand-indigo dark:text-brand-cyan">
            <Icon name="sparkles" size={15} />
            {t('landing.badge')}
          </span>
          <h1 className="text-4xl font-extrabold leading-tight text-balance sm:text-5xl lg:text-6xl">
            <span className="gradient-text">{t('landing.title')}</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted text-balance lg:mx-0">
            {t('landing.subtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link to="/intro" className="btn-primary text-lg">
              <Icon name="compass" size={20} />
              {t('landing.ctaPrimary')}
            </Link>
            <Link to="/education" className="btn-ghost text-lg">
              {t('landing.ctaSecondary')}
            </Link>
          </div>

          {(hasAnyAnswer || result) && (
            <Link
              to="/results"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-indigo hover:underline"
            >
              <Icon name="arrow-right" size={16} className="rtl:rotate-180" />
              {t('nav.results')}
            </Link>
          )}

          <p className="flex items-center gap-2 text-xs text-muted">
            <Icon name="info" size={14} />
            {t('landing.disclaimer')}
          </p>
        </motion.div>

        {/* Animated compass graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute inset-0 -z-10 animate-float rounded-full bg-brand-gradient opacity-20 blur-3xl" />
          <motion.img
            src="./logo.svg"
            alt={t('meta.name')}
            className="mx-auto w-full max-w-sm drop-shadow-2xl"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-12">
        <SectionHeading title={t('landing.featuresTitle')} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card flex flex-col gap-3 p-6"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white">
                <Icon name={f.icon} size={22} />
              </span>
              <h3 className="text-lg font-bold">{t(`landing.features.${f.key}.title`)}</h3>
              <p className="text-sm text-muted">{t(`landing.features.${f.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="py-12">
        <SectionHeading title={t('landing.stepsTitle')} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative card flex flex-col items-start gap-3 p-6"
            >
              <span className="absolute end-5 top-5 text-5xl font-black text-slate-100 dark:text-slate-800">
                {i + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl surface-3 text-brand-indigo">
                <Icon name={s.icon} size={22} />
              </span>
              <h3 className="text-lg font-bold">{t(`landing.steps.${s.key}.title`)}</h3>
              <p className="text-sm text-muted">{t(`landing.steps.${s.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-12">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-10 text-center text-white shadow-glow">
          <div className="pointer-events-none absolute -start-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <h2 className="text-3xl font-extrabold sm:text-4xl">{t('landing.title')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">{t('landing.subtitle')}</p>
          <Link
            to="/intro"
            className="btn mt-6 bg-white text-brand-indigo hover:-translate-y-0.5"
          >
            <Icon name="compass" size={20} />
            {t('common.start')}
          </Link>
        </div>
      </section>
    </div>
  )
}
