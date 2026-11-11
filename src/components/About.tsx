import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Effect } from '@animate-ui/react/primitives/effects/effect'
import { Parallax } from './Parallax'
import { SectionHead } from './SectionHead'
import { asset, OWNER } from '../data'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" className="relative overflow-hidden bg-paper py-28 text-ink sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        {/* Arch-shaped photo with an inner parallax */}
        <Parallax speed={0.06}>
          <Effect fade blur zoom={{ initialScale: 0.94 }} inView inViewOnce>
            <div ref={ref} className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-t-[999px] rounded-b-2xl bg-mocha shadow-2xl shadow-ink/25">
              <motion.img
                src={asset('img-02.jpg')}
                alt="A glass of black coffee beside a bag of beans"
                loading="lazy"
                style={{ y: imgY, scale: 1.2 }}
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 rounded-t-[999px] ring-1 ring-inset ring-brass/40" />
            </div>
          </Effect>
        </Parallax>

        <div>
          <SectionHead eyebrow="About Brewsome" title="A diary of slow mornings." />
          <Effect fade blur slide={{ direction: 'up', offset: 24 }} delay={300} inView inViewOnce>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
              <p>
                Brewsome is a home-brewing diary from Goa: the beans, the gear, the mistakes and the occasional perfect pour. No gatekeeping, no snobbery, just better coffee at home.
              </p>
              <p>
                Brews by{' '}
                <a href={OWNER.url} target="_blank" rel="noopener" className="border-b border-brass text-ink transition-colors hover:text-brass">
                  {OWNER.handle}
                </a>
                .
              </p>
            </div>
          </Effect>
        </div>
      </div>
    </section>
  )
}
