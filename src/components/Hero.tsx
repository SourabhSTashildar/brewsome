import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { SplittingText } from '@animate-ui/react/primitives/texts/splitting'
import { GradientText } from '@animate-ui/react/primitives/texts/gradient'
import { RotatingText, RotatingTextContainer } from '@animate-ui/react/primitives/texts/rotating'
import { Effect } from '@animate-ui/react/primitives/effects/effect'
import { Magnetic } from '@animate-ui/react/primitives/effects/magnetic'
import { Bean } from './Bean'
import { INSTAGRAM } from '../data'

// depth: 0 = far away (barely moves), 1 = close (moves a lot, sharper, bigger)
const BEANS = [
  { x: '6%', y: '16%', size: 56, rot: 25, depth: 0.9, blur: 0 },
  { x: '44%', y: '9%', size: 26, rot: -40, depth: 0.35, blur: 1.5 },
  { x: '91%', y: '18%', size: 70, rot: 70, depth: 1.0, blur: 3 },
  { x: '50%', y: '80%', size: 34, rot: 150, depth: 0.45, blur: 1 },
  { x: '9%', y: '82%', size: 84, rot: -20, depth: 1.2, blur: 4 },
  { x: '80%', y: '72%', size: 38, rot: 110, depth: 0.55, blur: 0 },
  { x: '28%', y: '48%', size: 22, rot: 60, depth: 0.25, blur: 2 },
]

type Pointer = { mx: MotionValue<number>; my: MotionValue<number>; scrollY: MotionValue<number>; reduce: boolean }

function HeroBean({ b, p }: { b: (typeof BEANS)[number]; p: Pointer }) {
  const x = useTransform(p.mx, (v) => (p.reduce ? 0 : v * b.depth * 70))
  const y = useTransform([p.scrollY, p.my], ([s, m]: number[]) => (p.reduce ? 0 : s * b.depth * 0.45 + m * b.depth * 50))
  return (
    <motion.div
      aria-hidden="true"
      className="absolute"
      style={{ left: b.x, top: b.y, x, y, rotate: b.rot, filter: `blur(${b.blur}px)` }}
    >
      <Bean className="animate-float text-brass/55" style={{ width: b.size, animationDelay: `${b.depth * -3}s` }} />
    </motion.div>
  )
}

export function Hero() {
  const reduce = !!useReducedMotion()
  const { scrollY } = useScroll()

  // Pointer position in [-0.5, 0.5], smoothed with springs
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 })
  const my = useSpring(rawY, { stiffness: 60, damping: 18 })
  const pointer: Pointer = { mx, my, scrollY, reduce }

  // Layers that respond to scroll (and a little to the pointer)
  const cupY = useTransform([scrollY, my], ([s, m]: number[]) => (reduce ? 0 : s * 0.22 + m * 26))
  const cupX = useTransform(mx, (v) => (reduce ? 0 : v * 36))
  const ringRotate = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.05))
  const ringY = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.12))
  const glowY = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.35))
  const textY = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.1))
  const textOpacity = useTransform(scrollY, [0, 520], [1, reduce ? 1 : 0.15])

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink pt-24 pb-20"
      onPointerMove={(e) => {
        rawX.set(e.clientX / window.innerWidth - 0.5)
        rawY.set(e.clientY / window.innerHeight - 0.5)
      }}
    >
      {/* Layer 0: warm glow, slowest */}
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="pointer-events-none absolute left-[55%] top-1/2 size-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,152,92,.28),rgba(90,58,38,.14)_55%,transparent)]"
      />

      {/* Layer 1: slowly rotating rings */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 800 800"
        style={{ y: ringY, rotate: ringRotate }}
        className="pointer-events-none absolute left-[60%] top-1/2 hidden size-[56rem] -translate-x-1/2 -translate-y-1/2 text-brass/25 md:block"
      >
        {[380, 320, 260].map((r, i) => (
          <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray={i === 1 ? '2 10' : undefined} />
        ))}
      </motion.svg>

      {/* Layer 2: floating beans at different depths */}
      <div className="pointer-events-none absolute inset-0">
        {BEANS.map((b, i) => (
          <HeroBean key={i} b={b} p={pointer} />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr]">
        {/* Layer 3: the headline */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 order-2 lg:order-1">
          <Effect fade blur slide={{ direction: 'up', offset: 16 }} delay={200}>
            <p className="eyebrow">Slow living · Slow brewing · Goa</p>
          </Effect>

          <h1 className="mt-6 font-display text-[clamp(3rem,6.6vw,6rem)] font-medium leading-[.92] tracking-tight">
            <SplittingText
              text="Brew some good"
              type="words"
              delay={500}
              stagger={0.12}
              initial={{ opacity: 0, y: 46, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              className="block"
            />
            <GradientText
              text="into your morning."
              gradient="linear-gradient(90deg, #e2bf8e 0%, #c9985c 40%, #f4ead8 70%, #c9985c 100%)"
              className="block italic"
            />
          </h1>

          <Effect fade blur slide={{ direction: 'up', offset: 20 }} delay={1300}>
            <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-cream/70">
              Honest beans, patient pours and the occasional strong opinion about grind size. A home-brewing diary from Goa.
            </p>

            <div className="mt-6 flex items-baseline gap-3 font-display text-2xl text-cream/60">
              <span>Today's ritual</span>
              <span aria-hidden="true" className="h-px w-8 bg-brass/50" />
              <RotatingTextContainer
                text={['Pour over', 'Espresso', 'AeroPress', 'French press', 'Cold brew']}
                duration={2200}
                className="min-w-[9ch]"
              >
                <RotatingText className="italic text-brass-soft" />
              </RotatingTextContainer>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.4} className="inline-block">
                <a href="#tools" className="inline-block rounded-full bg-brass px-8 py-3.5 text-sm font-medium uppercase tracking-[.16em] text-ink transition-colors hover:bg-brass-soft">
                  Brew a cup
                </a>
              </Magnetic>
              <Magnetic strength={0.4} className="inline-block">
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener"
                  className="inline-block rounded-full border border-cream/30 px-8 py-3.5 text-sm uppercase tracking-[.16em] transition-colors hover:border-brass hover:text-brass-soft"
                >
                  @brewsome.coffee
                </a>
              </Magnetic>
            </div>
          </Effect>
        </motion.div>

        {/* Layer 4: the cup, nearest the viewer */}
        <motion.div style={{ x: cupX, y: cupY }} className="relative z-10 order-1 grid place-items-center lg:order-2">
          <Effect fade zoom={{ initialScale: 0.88 }} blur delay={300}>
            <svg viewBox="0 0 360 340" className="w-[min(70vw,24rem)] drop-shadow-[0_40px_60px_rgba(0,0,0,.55)]" aria-hidden="true">
              <defs>
                <linearGradient id="cupBody" x1="0" x2="1">
                  <stop offset="0" stopColor="#d9cbb3" />
                  <stop offset=".45" stopColor="#f7efe0" />
                  <stop offset="1" stopColor="#cdbd9f" />
                </linearGradient>
                <radialGradient id="coffee" cx=".4" cy=".35" r=".8">
                  <stop offset="0" stopColor="#8a5a3a" />
                  <stop offset="1" stopColor="#3a2214" />
                </radialGradient>
              </defs>
              <ellipse cx="180" cy="308" rx="150" ry="20" fill="#000" opacity=".35" />
              <ellipse cx="180" cy="296" rx="140" ry="22" fill="#cdbd9f" />
              <ellipse cx="180" cy="290" rx="140" ry="22" fill="url(#cupBody)" />
              <path d="M72 130h216v66c0 52-44 92-100 92h-16c-56 0-100-40-100-92z" fill="url(#cupBody)" />
              <path d="M288 152h26c24 0 36 16 36 36s-12 36-36 36h-34" fill="none" stroke="url(#cupBody)" strokeWidth="18" strokeLinecap="round" />
              <ellipse cx="180" cy="130" rx="108" ry="24" fill="#cdbd9f" />
              <ellipse cx="180" cy="130" rx="98" ry="19" fill="url(#coffee)" />
              <path d="M150 131c10-9 20-9 30 0s20 9 30 0" fill="none" stroke="#f4ead8" strokeWidth="3" strokeLinecap="round" opacity=".75" />
              {[140, 180, 220].map((x, i) => (
                <path
                  key={x}
                  d={`M${x} 96c-16-16 16-26 0-46`}
                  fill="none"
                  stroke="#f4ead8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-steam"
                  style={{ animationDelay: `${i * 0.7}s`, transformBox: 'fill-box', transformOrigin: 'center' }}
                />
              ))}
            </svg>
          </Effect>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-[.65rem] uppercase tracking-[.4em] text-cream/40" aria-hidden="true">
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-brass to-transparent" />
      </div>
    </section>
  )
}
