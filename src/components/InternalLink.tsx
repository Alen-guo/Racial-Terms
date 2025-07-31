import Link from 'next/link'
import { ReactNode } from 'react'

interface InternalLinkProps {
  href: string
  children: ReactNode
  className?: string
  title?: string
  ariaLabel?: string
  onClick?: () => void
  prefetch?: boolean
}

export default function InternalLink({
  href,
  children,
  className = '',
  title,
  ariaLabel,
  onClick,
  prefetch = true
}: InternalLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      prefetch={prefetch}
    >
      {children}
    </Link>
  )
} 