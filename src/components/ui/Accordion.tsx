import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from './Icon'
import type { IconName } from './Icon'

interface AccordionItemProps {
  title: ReactNode
  icon?: IconName
  iconColor?: string
  defaultOpen?: boolean
  children: ReactNode
}

export function AccordionItem({
  title,
  icon,
  iconColor = 'text-brand-indigo',
  defaultOpen = false,
  children,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div className="overflow-hidden rounded-2xl border border-base surface">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center gap-3 px-5 py-4 text-start font-semibold transition-colors hover:surface-3"
      >
        {icon && (
          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl surface-3 ${iconColor}`}>
            <Icon name={icon} size={18} />
          </span>
        )}
        <span className="flex-1">{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <Icon name="chevron-down" size={18} className="text-muted" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 text-sm leading-relaxed text-muted">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
