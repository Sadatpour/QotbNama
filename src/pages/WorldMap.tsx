import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import type { GeographyObject } from 'react-simple-maps'
import worldTopo from 'world-atlas/countries-110m.json'
import { COUNTRIES, COUNTRIES_BY_NAME, SYSTEM_META, flagEmoji } from '@/data/countries'
import type { CountryInfo } from '@/data/countries'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { CountryPanel } from '@/components/map/CountryPanel'
import type { ActiveCountry } from '@/components/map/CountryPanel'
import { MapLegend } from '@/components/map/MapLegend'
import { useCountryName } from '@/hooks/useCountryName'
import { useIsTouch } from '@/hooks/useMediaQuery'

const NO_DATA_FILL = '#94a3b8'
const DEFAULT_POSITION = { coordinates: [0, 12] as [number, number], zoom: 1 }
const MIN_ZOOM = 1
const MAX_ZOOM = 8

interface Tooltip {
  x: number
  y: number
  name: string
  system: string | null
  flag: string
}

export function WorldMap() {
  const { t } = useTranslation()
  const getName = useCountryName()
  const isTouch = useIsTouch()

  const [active, setActive] = useState<ActiveCountry | null>(null)
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)
  const [legendSystem, setLegendSystem] = useState<string | null>(null)
  const [position, setPosition] = useState(DEFAULT_POSITION)

  const resolve = useCallback(
    (geo: GeographyObject): ActiveCountry => {
      const englishName = (geo.properties.name as string) || ''
      const info: CountryInfo | null =
        COUNTRIES[geo.id] ?? COUNTRIES_BY_NAME[englishName] ?? null
      const key = geo.id || englishName
      return { id: key, name: getName(info?.a2 ?? null, englishName), info }
    },
    [getName],
  )

  const handleEnter = useCallback(
    (geo: GeographyObject, e: React.MouseEvent) => {
      const c = resolve(geo)
      setActive(c)
      setTooltip({
        x: e.clientX,
        y: e.clientY,
        name: c.name,
        system: c.info ? t(`systems.${c.info.system}.label`) : null,
        flag: flagEmoji(c.info?.a2 ?? null),
      })
    },
    [resolve, t],
  )

  const handleMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : prev))
  }, [])

  const handleLeave = useCallback(() => setTooltip(null), [])

  const handleClick = useCallback((geo: GeographyObject) => setActive(resolve(geo)), [resolve])

  const zoomIn = () => setPosition((p) => ({ ...p, zoom: Math.min(p.zoom * 1.5, MAX_ZOOM) }))
  const zoomOut = () => setPosition((p) => ({ ...p, zoom: Math.max(p.zoom / 1.5, MIN_ZOOM) }))
  const resetView = () => setPosition(DEFAULT_POSITION)

  const geographyStyle = useMemo(
    () =>
      ({
        default: { outline: 'none' },
        hover: { outline: 'none', cursor: 'pointer' },
        pressed: { outline: 'none' },
      }) as const,
    [],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading
        eyebrow={
          <>
            <Icon name="compass" size={15} />
            {t('map.eyebrow')}
          </>
        }
        title={t('map.title')}
        subtitle={t('map.subtitle')}
      />

      <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
        <Icon name="info" size={15} />
        {isTouch ? t('map.tapHint') : t('map.hoverHint')}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-3xl border border-base surface-3">
            {/* Zoom controls */}
            <div className="absolute end-3 top-3 z-10 flex flex-col gap-2">
              <button
                type="button"
                onClick={zoomIn}
                aria-label={t('map.zoomIn')}
                className="grid h-9 w-9 place-items-center rounded-xl glass border border-base font-bold shadow-card"
              >
                +
              </button>
              <button
                type="button"
                onClick={zoomOut}
                aria-label={t('map.zoomOut')}
                className="grid h-9 w-9 place-items-center rounded-xl glass border border-base font-bold shadow-card"
              >
                −
              </button>
              <button
                type="button"
                onClick={resetView}
                aria-label={t('map.reset')}
                className="grid h-9 w-9 place-items-center rounded-xl glass border border-base shadow-card"
              >
                <Icon name="refresh" size={16} />
              </button>
            </div>

            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{ scale: 160 }}
              width={800}
              height={420}
              style={{ width: '100%', height: 'auto' }}
            >
              <ZoomableGroup
                center={position.coordinates}
                zoom={position.zoom}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
                onMoveEnd={setPosition}
              >
                <Geographies geography={worldTopo}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const englishName = (geo.properties.name as string) || ''
                      const info =
                        COUNTRIES[geo.id] ?? COUNTRIES_BY_NAME[englishName] ?? null
                      const baseColor = info ? SYSTEM_META[info.system].color : NO_DATA_FILL
                      const key = geo.id || englishName
                      const isActive = active?.id === key
                      const dim = legendSystem != null && info?.system !== legendSystem
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(e: React.MouseEvent) => handleEnter(geo, e)}
                          onMouseMove={handleMove}
                          onMouseLeave={handleLeave}
                          onClick={() => handleClick(geo)}
                          fill={baseColor}
                          fillOpacity={dim ? 0.2 : isActive ? 1 : 0.82}
                          stroke="#ffffff"
                          strokeWidth={isActive ? 1 : 0.4}
                          strokeOpacity={0.5}
                          style={geographyStyle}
                        />
                      )
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Legend */}
          <div className="mt-4">
            <h2 className="mb-2 text-sm font-bold text-muted">{t('map.legendTitle')}</h2>
            <MapLegend activeSystem={legendSystem} onHover={setLegendSystem} />
          </div>

          <p className="mt-3 flex items-start gap-2 text-xs text-muted">
            <Icon name="info" size={13} className="mt-0.5 shrink-0" />
            {t('map.disclaimer')}
          </p>
        </div>

        {/* Info panel */}
        <div className="lg:col-span-1">
          <div className="card overflow-hidden p-0 lg:sticky lg:top-24">
            <CountryPanel active={active} />
          </div>
        </div>
      </div>

      {/* Cursor tooltip (desktop hover) */}
      {tooltip && !isTouch && (
        <div
          className="pointer-events-none fixed z-50 -translate-y-full rounded-xl glass border border-base px-3 py-2 text-sm shadow-card"
          style={{ left: tooltip.x + 12, top: tooltip.y - 8 }}
        >
          <span className="flex items-center gap-2 font-semibold">
            <span aria-hidden="true">{tooltip.flag}</span>
            {tooltip.name}
          </span>
          {tooltip.system && <span className="block text-xs text-muted">{tooltip.system}</span>}
        </div>
      )}
    </div>
  )
}
