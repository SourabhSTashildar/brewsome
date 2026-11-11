import type { CSSProperties } from 'react'

export function Bean({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={style} aria-hidden="true">
      <ellipse cx="16" cy="16" rx="9" ry="13" transform="rotate(30 16 16)" fill="currentColor" />
      <path
        d="M10 6c6 6-2 14 4 22"
        transform="rotate(30 16 16)"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".7"
      />
    </svg>
  )
}
