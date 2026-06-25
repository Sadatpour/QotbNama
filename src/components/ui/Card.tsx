import type { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Animate into view on mount. */
  animate?: boolean
  /** Stagger delay in seconds. */
  delay?: number
  padded?: boolean
}

export function Card({
  children,
  className = '',
  animate = false,
  delay = 0,
  padded = true,
  ...rest
}: CardProps) {
  const classes = `card ${padded ? 'p-6 sm:p-8' : ''} ${className}`
  if (!animate) {
    return (
      <div className={classes} {...rest}>
        {children}
      </div>
    )
  }
  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      {...(rest as object)}
    >
      {children}
    </motion.div>
  )
}
