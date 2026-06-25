import type { DimensionId } from '@/types'

export interface DimensionMeta {
  id: DimensionId
  /** i18n key root under `dimensions.<id>`: has .name, .negative, .positive, .description */
  i18nKey: string
  /** Color for charts/UI. */
  color: string
  /** Number of items measuring this dimension (for documentation/validation). */
  itemCount: number
}

export const DIMENSIONS: DimensionMeta[] = [
  { id: 'economic', i18nKey: 'dimensions.economic', color: '#f97316', itemCount: 7 },
  { id: 'social', i18nKey: 'dimensions.social', color: '#7c3aed', itemCount: 7 },
  { id: 'democratic', i18nKey: 'dimensions.democratic', color: '#2563eb', itemCount: 7 },
  { id: 'state', i18nKey: 'dimensions.state', color: '#06b6d4', itemCount: 7 },
  { id: 'secular', i18nKey: 'dimensions.secular', color: '#4f46e5', itemCount: 7 },
]

export const DIMENSION_BY_ID: Record<DimensionId, DimensionMeta> = Object.fromEntries(
  DIMENSIONS.map((d) => [d.id, d]),
) as Record<DimensionId, DimensionMeta>

export const DIMENSION_IDS: DimensionId[] = DIMENSIONS.map((d) => d.id)
