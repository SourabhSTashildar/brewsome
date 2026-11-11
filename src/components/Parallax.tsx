import { useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

type Props = {
  /** Positive lags behind the scroll (feels far away), negative runs ahead (feels close). */
  speed?: number
  /** 'top' measures from the top of the page (hero); 'view' from when the element is on screen. */
  from?: 'top' | 'view'
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** Moves its children at a different speed than the page scroll. */
export function Parallax({ speed = 0.2, from = 'view', className, style, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const range = 400 * speed
  const yTop = useTransform(scrollY, (v) => (reduce ? 0 : v * speed))
  const yView = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-range, range])

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: from === 'top' ? yTop : yView }}>
      {children}
    </motion.div>
  )
}
