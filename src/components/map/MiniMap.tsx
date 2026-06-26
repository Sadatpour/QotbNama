import { useCallback, useMemo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import worldTopo from 'world-atlas/countries-110m.json'
import { COUNTRIES, COUNTRIES_BY_NAME, SYSTEM_META } from '@/data/countries'

const NO_DATA_FILL = '#94a3b8'

export function MiniMap() {
  const geographyStyle = useMemo(
    () =>
      ({
        default: { outline: 'none' },
        hover: { outline: 'none' },
        pressed: { outline: 'none' },
      }) as const,
    [],
  )

  const getFill = useCallback((geoId: string, geoName: string) => {
    const info = COUNTRIES[geoId] ?? COUNTRIES_BY_NAME[geoName] ?? null
    return info ? SYSTEM_META[info.system].color : NO_DATA_FILL
  }, [])

  return (
    <ComposableMap
      projection="geoEqualEarth"
      projectionConfig={{ scale: 160 }}
      width={800}
      height={420}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <Geographies geography={worldTopo}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const name = (geo.properties.name as string) || ''
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getFill(geo.id, name)}
                fillOpacity={0.75}
                stroke="#ffffff"
                strokeWidth={0.4}
                strokeOpacity={0.4}
                style={geographyStyle}
              />
            )
          })
        }
      </Geographies>
    </ComposableMap>
  )
}
