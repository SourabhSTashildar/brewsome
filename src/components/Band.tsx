import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Effect } from '@animate-ui/react/primitives/effects/effect'
import { Parallax } from './Parallax'
import { Bean } from './Bean'

const BEANS = [
  { l: '7%', t: '20%', s: 76, r: 30, sp: 0.4 },
  { l: '22%', t: '72%', s: 38, r: -50, sp: -0.3 },
  { l: '84%', t: '14%', s: 46, r: 95, sp: 0.55 },
  { l: '91%', t: '66%', s: 92, r: -15, sp: 0.2 },
  { l: '62%', t: '84%', s: 30, r: 140, sp: -0.4 },
]

export function Band() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Two outlined text rows slide in opposite directions as the section crosses the screen
  const left = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['5%', '-35%'])
  const right = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-40%', '0%'])

  const word = 'SLOW LIVING · SLOW BREWING · SLOW LIVING · SLOW BREWING · '

  return (
    <section ref={ref} aria-label="Brewsome motto" className="relative grid min-h-[34rem] place-items-center overflow-hidden bg-ink py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {BEANS.map((b, i) => (
          <Parallax key={i} speed={b.sp} className="absolute" style={{ left: b.l, top: b.t }}>
            <Bean className="animate-float text-brass/45" style={{ width: b.s, rotate: `${b.r}deg`, animationDelay: `${i * -1.7}s` }} />
          </Parallax>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-8 select-none overflow-hidden" aria-hidden="true">
        <motion.p style={{ x: left }} className="outline-text w-max whitespace-nowrap font-display text-[clamp(4rem,12vw,10rem)] leading-none">
          {word}
        </motion.p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-8 select-none overflow-hidden" aria-hidden="true">
        <motion.p style={{ x: right }} className="outline-text w-max whitespace-nowrap font-display text-[clamp(4rem,12vw,10rem)] leading-none">
          {word}
        </motion.p>
      </div>

      <Parallax speed={0.14} className="relative z-10 px-5 text-center">
        <Effect fade blur zoom={{ initialScale: 0.94 }} slide={{ direction: 'up', offset: 30 }} inView inViewOnce>
          <p className="font-display text-[clamp(3rem,9vw,7rem)] font-medium leading-[.98] tracking-tight">
            Slow living.
            <br />
            <em className="text-brass-soft">Slow brewing.</em>
          </p>
        </Effect>
      </Parallax>
    </section>
  )
}
