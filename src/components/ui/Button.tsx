import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'
import type { IconName } from './Icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  icon?: IconName
  iconPosition?: 'start' | 'end'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  icon,
  iconPosition = 'start',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-ghost'
  return (
    <button className={`${base} ${className}`} {...rest}>
      {icon && iconPosition === 'start' && <Icon name={icon} size={18} />}
      {children}
      {icon && iconPosition === 'end' && <Icon name={icon} size={18} />}
    </button>
  )
}
