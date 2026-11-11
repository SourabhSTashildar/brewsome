import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { CountingNumber } from '@animate-ui/react/primitives/texts/counting-number'
import { Effect } from '@animate-ui/react/primitives/effects/effect'
import { Magnetic } from '@animate-ui/react/primitives/effects/magnetic'
import { Parallax } from './Parallax'
import { SectionHead } from './SectionHead'
import { METHODS, TIMER_STEPS, TIMER_TOTAL } from '../data'

function Calculator() {
  const [method, setMethod] = useState(METHODS[0])
  const [ml, setMl] = useState(300)
  const coffee = ml / method.ratio

  return (
    <div className="rounded-[2rem] border border-brass/25 bg-bean/50 p-7 backdrop-blur sm:p-10">
      <h3 className="font-display text-3xl">Ratio calculator</h3>

      <div className="mt-6 flex flex-wrap gap-2" role="radiogroup" aria-label="Brew method">
        {METHODS.map((m) => (
          <button
            key={m.id}
            role="radio"
            aria-checked={m.id === method.id}
            onClick={() => setMethod(m)}
            className={`relative cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
              m.id === method.id ? 'border-brass bg-brass text-ink' : 'border-cream/20 text-cream/75 hover:border-brass/70'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <label className="mt-8 block text-sm text-cream/70">
        I want <span className="font-display text-xl text-brass-soft">{ml} ml</span> of coffee
        <input
          type="range"
          min={50}
          max={1000}
          step={10}
          value={ml}
          onChange={(e) => setMl(Number(e.target.value))}
          className="mt-3 block w-full accent-[#c9985c]"
        />
      </label>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-ink/60 p-5 text-center">
          <div className="font-display text-6xl leading-none text-brass-soft tabular-nums">
            <CountingNumber number={coffee} decimalPlaces={coffee < 20 ? 1 : 0} transition={{ stiffness: 90, damping: 20 }} />
          </div>
          <div className="eyebrow mt-3 !text-[.62rem] !text-cream/50">grams coffee</div>
        </div>
        <div className="rounded-2xl bg-ink/60 p-5 text-center">
          <div className="font-display text-6xl leading-none text-cream tabular-nums">
            <CountingNumber number={ml} transition={{ stiffness: 90, damping: 20 }} />
          </div>
          <div className="eyebrow mt-3 !text-[.62rem] !text-cream/50">grams water</div>
        </div>
      </div>

      <p className="mt-5 min-h-6 text-sm text-cream/55">
        1:{method.ratio} · {method.hint}
      </p>
    </div>
  )
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

function Timer() {
  const [t, setT] = useState(0)
  const [running, setRunning] = useState(false)
  const tick = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!running) return
    tick.current = window.setInterval(() => {
      setT((v) => {
        if (v + 1 >= TIMER_TOTAL) {
          setRunning(false)
          return TIMER_TOTAL
        }
        return v + 1
      })
    }, 1000)
    return () => window.clearInterval(tick.current)
  }, [running])

  const stepIndex = TIMER_STEPS.reduce((acc, [at], i) => (t >= at ? i : acc), 0)
  const progress = t / TIMER_TOTAL
  const R = 118
  const C = 2 * Math.PI * R

  return (
    <div className="rounded-[2rem] border border-brass/25 bg-bean/50 p-7 backdrop-blur sm:p-10">
      <h3 className="font-display text-3xl">Pour-over timer</h3>

      <div className="relative mx-auto mt-6 grid size-64 place-items-center">
        <svg viewBox="0 0 260 260" className="absolute inset-0 -rotate-90" aria-hidden="true">
          <circle cx="130" cy="130" r={R} fill="none" stroke="rgba(244,234,216,.1)" strokeWidth="3" />
          <motion.circle
            cx="130"
            cy="130"
            r={R}
            fill="none"
            stroke="#c9985c"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={C}
            animate={{ strokeDashoffset: C * (1 - progress) }}
            transition={{ duration: 0.9, ease: 'linear' }}
          />
        </svg>
        <div className="text-center">
          <div className="font-display text-7xl leading-none tabular-nums text-brass-soft" aria-live="off">
            {fmt(t)}
          </div>
          <div className="eyebrow mt-3 !text-[.6rem] !text-cream/45">of {fmt(TIMER_TOTAL)}</div>
        </div>
      </div>

      <p className="mt-4 min-h-14 text-center font-display text-xl italic text-cream/85">
        {running || t > 0 ? TIMER_STEPS[stepIndex][1] : 'Ready when you are.'}
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <Magnetic strength={0.4} className="inline-block">
          <button
            onClick={() => {
              if (t >= TIMER_TOTAL) setT(0)
              setRunning((r) => !r)
            }}
            className="cursor-pointer rounded-full bg-brass px-9 py-3 text-sm font-medium uppercase tracking-[.16em] text-ink transition-colors hover:bg-brass-soft"
          >
            {running ? 'Pause' : t > 0 && t < TIMER_TOTAL ? 'Resume' : 'Start'}
          </button>
        </Magnetic>
        <button
          onClick={() => {
            setRunning(false)
            setT(0)
          }}
          className="cursor-pointer rounded-full border border-cream/25 px-7 py-3 text-sm uppercase tracking-[.16em] transition-colors hover:border-brass"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export function Tools() {
  return (
    <section id="tools" className="relative overflow-hidden bg-roast py-28 sm:py-36">
      <Parallax speed={0.3} className="pointer-events-none absolute inset-x-0 top-10">
        <div className="mx-auto h-[28rem] max-w-4xl rounded-full bg-[radial-gradient(closest-side,rgba(201,152,92,.16),transparent)]" />
      </Parallax>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          dark
          eyebrow="At the bench"
          title="Brew tools"
          sub="A ratio calculator and a pour-over timer. No sign-up, no server, and everything runs in your browser."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Effect fade blur slide={{ direction: 'up', offset: 40 }} inView inViewOnce>
            <Calculator />
          </Effect>
          <Effect fade blur slide={{ direction: 'up', offset: 40 }} delay={150} inView inViewOnce>
            <Timer />
          </Effect>
        </div>
      </div>
    </section>
  )
}
