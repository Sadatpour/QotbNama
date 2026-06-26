import type { SVGProps } from 'react'

/**
 * A compact inline icon set (lucide-style, 24×24, stroke-based) so the app
 * ships zero icon dependencies. Brand/social marks are filled paths.
 */
export type IconName =
  // UI
  | 'sun'
  | 'moon'
  | 'languages'
  | 'menu'
  | 'close'
  | 'arrow-right'
  | 'arrow-left'
  | 'chevron-down'
  | 'check'
  | 'copy'
  | 'download'
  | 'share'
  | 'refresh'
  | 'compass'
  | 'lock'
  | 'clock'
  | 'book'
  | 'sparkles'
  | 'info'
  | 'search'
  | 'file-text'
  | 'graduation'
  | 'target'
  | 'mail'
  // education topics
  | 'vote'
  | 'landmark'
  | 'crown'
  | 'users'
  | 'user-check'
  | 'shield'
  | 'eye'
  | 'feather'
  | 'columns'
  | 'handshake'
  | 'heart-handshake'
  | 'flag'
  | 'alert-triangle'
  | 'wind'
  | 'scale'
  | 'trending-up'
  | 'shield-check'
  | 'network'
  | 'square'
  | 'home'
  | 'chart-bar'
  | 'globe'
  // social
  | 'x'
  | 'facebook'
  | 'linkedin'
  | 'telegram'
  | 'whatsapp'

const STROKE: Record<string, string> = {
  sun: 'M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z',
  moon: 'M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z',
  languages: 'M5 8h12M9 4v1M10 4c0 6-3 9-6 11M8 8c0 4 2 6 6 8M15 21l4-9 4 9M16.5 18h5',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M18 6L6 18M6 6l12 12',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-left': 'M19 12H5M11 18l-6-6 6-6',
  'chevron-down': 'M6 9l6 6 6-6',
  check: 'M20 6L9 17l-5-5',
  copy: 'M9 9h10v10H9zM5 15V5h10',
  download: 'M12 3v12M7 11l5 5 5-5M5 21h14',
  share: 'M14 9l5-5m0 0h-4m4 0v4M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5',
  refresh: 'M3 12a9 9 0 0115-6.7L21 8M21 3v5h-5M21 12a9 9 0 01-15 6.7L3 16M3 21v-5h5',
  compass: 'M12 22a10 10 0 100-20 10 10 0 000 20zM16 8l-2.5 5.5L8 16l2.5-5.5L16 8z',
  lock: 'M6 11h12v9H6zM8 11V7a4 4 0 018 0v4',
  clock: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2',
  book: 'M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM19 3v18',
  sparkles: 'M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15l-1.8-4.2L5.5 9l4.7-1.3zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z',
  info: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 11v5M12 8h.01',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
  'file-text': 'M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9zM14 3v6h6M9 13h6M9 17h6',
  graduation: 'M22 9L12 5 2 9l10 4 10-4zM6 11v5c0 1 3 3 6 3s6-2 6-3v-5',
  target: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 17a5 5 0 100-10 5 5 0 000 10zM12 13a1 1 0 100-2 1 1 0 000 2z',
  mail: 'M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM3 7l9 6 9-6',
  vote: 'M9 12l2 2 4-4M5 21h14a2 2 0 002-2V8l-4-4H5a2 2 0 00-2 2v13a2 2 0 002 2z',
  landmark: 'M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M12 3L3 8h18z',
  crown: 'M3 8l4 4 5-7 5 7 4-4-2 11H5zM5 20h14',
  users: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.8M16 3.1a4 4 0 010 7.7',
  'user-check': 'M14 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M8 11a4 4 0 100-8 4 4 0 000 8zM16 11l2 2 4-4',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7zM12 15a3 3 0 100-6 3 3 0 000 6z',
  feather: 'M20 4a6 6 0 00-8 0L4 12v4h4l8-8a6 6 0 004-4zM16 8L2 22M17 13h-6',
  columns: 'M4 4h16v16H4zM12 4v16M4 9h16M4 15h16',
  handshake: 'M11 17l2 2a1 1 0 001.4 0l3-3M7 11l3-3 3 3 2-2 4 4v3l-2 2M3 9l4-4 3 3M3 14l3 3',
  'heart-handshake': 'M12 21s-7-4.5-7-9a4 4 0 017-2.5A4 4 0 0119 12c0 4.5-7 9-7 9zM12 9l-1.5 1.5a1 1 0 000 1.4l.6.6a1 1 0 001.4 0L15 9',
  flag: 'M4 22V4s1-1 4-1 5 2 8 2 4-1 4-1v10s-1 1-4 1-5-2-8-2-4 1-4 1',
  'alert-triangle': 'M12 3l10 17H2zM12 9v5M12 18h.01',
  wind: 'M3 8h11a3 3 0 100-6M3 16h15a3 3 0 110 6M3 12h18',
  scale: 'M12 3v18M7 21h10M6 7l-3 7h6zM18 7l-3 7h6zM6 7l6-2 6 2',
  'trending-up': 'M3 17l6-6 4 4 8-8M15 7h6v6',
  'shield-check': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
  network: 'M12 2a3 3 0 100 6 3 3 0 000-6zM5 16a3 3 0 100 6 3 3 0 000-6zM19 16a3 3 0 100 6 3 3 0 000-6zM12 8v4M12 12l-5 4M12 12l5 4',
  square: 'M4 4h16v16H4z',
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  'chart-bar': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  globe: 'M12 22a10 10 0 100-20 10 10 0 000 20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20',
}

const FILL: Record<string, string> = {
  x: 'M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-7-6.1 7H1.6l8.2-9.4L1 2h7l4.8 6.4zM16.7 20h1.9L7.4 4H5.4z',
  facebook: 'M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0022 12z',
  linkedin: 'M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4z',
  telegram: 'M21.9 4.3l-3 14.2c-.2 1-.8 1.2-1.7.8l-4.6-3.4-2.2 2.2c-.3.3-.5.5-1 .5l.3-4.7 8.5-7.7c.4-.3-.1-.5-.6-.2L7 13.2 2.5 11.8c-1-.3-1-1 .2-1.5l18-7c.8-.3 1.5.2 1.2 1z',
  whatsapp: 'M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3c-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z',
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 24, className, ...rest }: IconProps) {
  const filled = name in FILL
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={filled ? FILL[name] : STROKE[name]} />
    </svg>
  )
}
