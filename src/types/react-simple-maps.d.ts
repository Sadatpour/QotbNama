declare module 'react-simple-maps' {
  import type { ComponentType, ReactNode, SVGProps } from 'react'

  export interface GeographyObject {
    rsmKey: string
    id: string
    properties: Record<string, unknown> & { name?: string }
  }

  export interface ComposableMapProps extends SVGProps<SVGSVGElement> {
    projection?: string
    projectionConfig?: Record<string, unknown>
    width?: number
    height?: number
    children?: ReactNode
  }
  export const ComposableMap: ComponentType<ComposableMapProps>

  export interface ZoomableGroupProps {
    center?: [number, number]
    zoom?: number
    minZoom?: number
    maxZoom?: number
    onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }) => void
    translateExtent?: [[number, number], [number, number]]
    children?: ReactNode
  }
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>

  export interface GeographiesProps {
    geography: string | object
    children: (args: { geographies: GeographyObject[] }) => ReactNode
  }
  export const Geographies: ComponentType<GeographiesProps>

  export interface GeographyStyle {
    default?: Record<string, unknown>
    hover?: Record<string, unknown>
    pressed?: Record<string, unknown>
  }
  export interface GeographyProps extends Omit<SVGProps<SVGPathElement>, 'style'> {
    geography: GeographyObject
    style?: GeographyStyle
  }
  export const Geography: ComponentType<GeographyProps>

  export const Sphere: ComponentType<SVGProps<SVGPathElement> & { id?: string }>
  export const Graticule: ComponentType<SVGProps<SVGPathElement>>
}

declare module 'world-atlas/countries-110m.json' {
  const value: object
  export default value
}
