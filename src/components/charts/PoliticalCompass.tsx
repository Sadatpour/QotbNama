import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

interface PoliticalCompassProps {
  /** Economic axis, −100 (left) … +100 (right). */
  economic: number
  /** Social axis, −100 (libertarian) … +100 (authoritarian). */
  social: number
  /** Optional reference points (e.g. education topics) to plot faintly. */
  references?: Array<{ id: string; economic: number; social: number; color?: string }>
  className?: string
}

const SIZE = 320
const PAD = 44
const PLOT = SIZE - PAD * 2
const CENTER = SIZE / 2
const HALF = PLOT / 2

function toX(economic: number) {
  return CENTER + (economic / 100) * HALF
}
function toY(social: number) {
  // Screen y grows downward; authoritarian (+) sits at the top.
  return CENTER - (social / 100) * HALF
}

export function PoliticalCompass({
  economic,
  social,
  references = [],
  className = '',
}: PoliticalCompassProps) {
  const { t } = useTranslation()
  const x = toX(economic)
  const y = toY(social)

  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto w-full max-w-md"
        role="img"
        aria-label={`${t('results.compassTitle')}: ${t('dimensions.economic.name')} ${economic}, ${t('dimensions.social.name')} ${social}`}
      >
        <defs>
          <linearGradient id="qTL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#06b6d4" stopOpacity="0.22" />
            <stop offset="1" stopColor="#7c3aed" stopOpacity="0.10" />
          </linearGradient>
          <linearGradient id="qTR" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f97316" stopOpacity="0.22" />
            <stop offset="1" stopColor="#7c3aed" stopOpacity="0.10" />
          </linearGradient>
          <linearGradient id="qBL" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#06b6d4" stopOpacity="0.20" />
            <stop offset="1" stopColor="#2563eb" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="qBR" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#f97316" stopOpacity="0.20" />
            <stop offset="1" stopColor="#2563eb" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Quadrants */}
        <rect x={PAD} y={PAD} width={HALF} height={HALF} fill="url(#qTL)" />
        <rect x={CENTER} y={PAD} width={HALF} height={HALF} fill="url(#qTR)" />
        <rect x={PAD} y={CENTER} width={HALF} height={HALF} fill="url(#qBL)" />
        <rect x={CENTER} y={CENTER} width={HALF} height={HALF} fill="url(#qBR)" />

        {/* Grid */}
        <g stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="1">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={`v${f}`} x1={PAD + PLOT * f} y1={PAD} x2={PAD + PLOT * f} y2={SIZE - PAD} strokeDasharray="2 4" opacity="0.5" />
          ))}
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={`h${f}`} x1={PAD} y1={PAD + PLOT * f} x2={SIZE - PAD} y2={PAD + PLOT * f} strokeDasharray="2 4" opacity="0.5" />
          ))}
          <rect x={PAD} y={PAD} width={PLOT} height={PLOT} fill="none" strokeWidth="1.5" opacity="0.8" />
        </g>

        {/* Axes */}
        <g stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1.5">
          <line x1={PAD} y1={CENTER} x2={SIZE - PAD} y2={CENTER} />
          <line x1={CENTER} y1={PAD} x2={CENTER} y2={SIZE - PAD} />
        </g>

        {/* Axis labels */}
        <g
          className="fill-current text-[11px] font-semibold"
          textAnchor="middle"
        >
          <text x={CENTER} y={PAD - 16} className="text-brand-purple">
            {t('dimensions.social.positive')}
          </text>
          <text x={CENTER} y={SIZE - PAD + 26} className="text-brand-blue">
            {t('dimensions.social.negative')}
          </text>
          <text x={PAD - 4} y={CENTER - 10} textAnchor="middle" className="text-brand-cyan">
            {t('dimensions.economic.negative')}
          </text>
          <text x={SIZE - PAD + 4} y={CENTER - 10} textAnchor="middle" className="text-brand-orange">
            {t('dimensions.economic.positive')}
          </text>
        </g>

        {/* Reference points */}
        {references.map((r) => (
          <circle
            key={r.id}
            cx={toX(r.economic)}
            cy={toY(r.social)}
            r="3.5"
            fill={r.color ?? '#94a3b8'}
            opacity="0.5"
          />
        ))}

        {/* User point */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.2 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        >
          <circle cx={x} cy={y} r="13" fill="#4f46e5" opacity="0.18">
            <animate attributeName="r" values="11;16;11" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy={y} r="7" fill="#4f46e5" stroke="#fff" strokeWidth="2.5" />
        </motion.g>
      </svg>
    </div>
  )
}
