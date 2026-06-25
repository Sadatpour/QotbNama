import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionHeadingProps {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  align?: 'start' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-start'
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col gap-3 ${alignment} ${className}`}
    >
      {eyebrow && (
        <span className="chip surface-3 text-brand-indigo dark:text-brand-cyan">{eyebrow}</span>
      )}
      <h2 className="text-3xl font-extrabold sm:text-4xl text-balance">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-muted sm:text-lg text-balance">{subtitle}</p>
      )}
    </motion.div>
  )
}
