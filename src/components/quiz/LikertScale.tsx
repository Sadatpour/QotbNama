import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { LikertValue } from '@/types'

interface LikertScaleProps {
  value: LikertValue | undefined
  onChange: (value: LikertValue) => void
  name: string
}

const VALUES: LikertValue[] = [0, 1, 2, 3, 4, 5, 6]

// Size + color ramp: extremes are larger and more saturated, center is small/neutral.
const STYLE: Record<number, { size: string; ring: string; fill: string }> = {
  0: { size: 'h-11 w-11 sm:h-14 sm:w-14', ring: 'border-brand-cyan', fill: 'bg-brand-cyan' },
  1: { size: 'h-10 w-10 sm:h-12 sm:w-12', ring: 'border-brand-cyan/70', fill: 'bg-brand-cyan/80' },
  2: { size: 'h-9 w-9 sm:h-10 sm:w-10', ring: 'border-brand-cyan/50', fill: 'bg-brand-cyan/60' },
  3: { size: 'h-8 w-8 sm:h-9 sm:w-9', ring: 'border-slate-400', fill: 'bg-slate-400' },
  4: { size: 'h-9 w-9 sm:h-10 sm:w-10', ring: 'border-brand-orange/50', fill: 'bg-brand-orange/60' },
  5: { size: 'h-10 w-10 sm:h-12 sm:w-12', ring: 'border-brand-orange/70', fill: 'bg-brand-orange/80' },
  6: { size: 'h-11 w-11 sm:h-14 sm:w-14', ring: 'border-brand-orange', fill: 'bg-brand-orange' },
}

export function LikertScale({ value, onChange, name }: LikertScaleProps) {
  const { t } = useTranslation()

  return (
    <div
      role="radiogroup"
      aria-label={t('questionnaire.selectHint')}
      className="flex flex-col gap-4"
    >
      {/* End labels */}
      <div dir="ltr" className="flex items-center justify-between px-1 text-xs font-medium text-muted">
        <span className="text-brand-cyan">{t('likert.0')}</span>
        <span>{t('likert.3')}</span>
        <span className="text-brand-orange">{t('likert.6')}</span>
      </div>

      <div dir="ltr" className="flex items-center justify-between gap-1 sm:gap-3">
        {VALUES.map((v) => {
          const selected = value === v
          const s = STYLE[v]
          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={t(`likert.${v}`)}
              onClick={() => onChange(v)}
              className="group grid flex-1 place-items-center py-1 focus-visible:outline-none"
            >
              <motion.span
                whileTap={{ scale: 0.85 }}
                className={`grid place-items-center rounded-full border-2 transition-all duration-200 ${s.size} ${
                  selected ? `${s.ring} ${s.fill}` : `${s.ring} bg-transparent group-hover:scale-110`
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId={`dot-${name}`}
                    className="h-2.5 w-2.5 rounded-full bg-white shadow"
                  />
                )}
              </motion.span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
