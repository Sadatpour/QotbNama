import { useTranslation } from 'react-i18next'
import { SYSTEM_KEYS, SYSTEM_META } from '@/data/countries'

interface MapLegendProps {
  /** Currently emphasized system (hover/selection), dims the others. */
  activeSystem?: string | null
  onHover?: (system: string | null) => void
}

export function MapLegend({ activeSystem, onHover }: MapLegendProps) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-wrap gap-2">
      {SYSTEM_KEYS.map((key) => {
        const dim = activeSystem != null && activeSystem !== key
        return (
          <button
            key={key}
            type="button"
            onMouseEnter={() => onHover?.(key)}
            onMouseLeave={() => onHover?.(null)}
            className={`inline-flex items-center gap-1.5 rounded-full surface-3 px-2.5 py-1 text-xs font-medium transition-opacity ${
              dim ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: SYSTEM_META[key].color }}
            />
            {t(`systems.${key}.label`)}
          </button>
        )
      })}
    </div>
  )
}
