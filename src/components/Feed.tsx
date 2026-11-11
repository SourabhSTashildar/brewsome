import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Effect } from '@animate-ui/react/primitives/effects/effect'
import { Tilt, TiltContent } from '@animate-ui/react/primitives/effects/tilt'
import { Magnetic } from '@animate-ui/react/primitives/effects/magnetic'
import { Parallax } from './Parallax'
import { SectionHead } from './SectionHead'
import { asset, FEED, INSTAGRAM, type Post } from '../data'

function Tile({ post, index }: { post: Post; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // The photo drifts inside its frame; it is scaled up so no edge ever shows.
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])

  return (
    <Effect fade blur slide={{ direction: 'up', offset: 36 }} delay={(index % 3) * 90} inView inViewOnce>
      <Tilt maxTilt={5}>
        <TiltContent>
          <a
            ref={ref}
            href={post.url}
            target="_blank"
            rel="noopener"
            aria-label={`${post.type === 'reel' ? 'Reel' : 'Post'} from ${post.date} on Instagram`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-mocha shadow-xl shadow-ink/15"
          >
            <motion.img
              src={asset(post.img)}
              alt=""
              loading="lazy"
              decoding="async"
              style={{ y, scale: 1.2 }}
              className="absolute inset-0 size-full object-cover transition-[filter] duration-500 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-[.7rem] font-medium uppercase tracking-[.22em] text-cream">{post.date}</span>
            {post.type === 'reel' && (
              <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-ink/55 backdrop-blur" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="ml-0.5 size-4 fill-cream">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            )}
          </a>
        </TiltContent>
      </Tilt>
    </Effect>
  )
}

export function Feed() {
  // Three columns at different parallax speeds give the grid its editorial drift.
  const cols = [0, 1, 2].map((c) => FEED.map((p, i) => ({ p, i })).filter(({ i }) => i % 3 === c))
  const speeds = [0.04, -0.07, 0.1]

  return (
    <section id="feed" className="relative overflow-hidden bg-paper py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Instagram"
          title="From the feed"
          sub="The latest from @brewsome.coffee. Tap any frame to open it."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {cols.map((col, c) => (
            <Parallax key={c} speed={speeds[c]} className={`flex flex-col gap-5 md:gap-6 ${c === 1 ? 'md:mt-16' : ''}`}>
              {col.map(({ p, i }) => (
                <Tile key={p.url} post={p} index={i} />
              ))}
            </Parallax>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Magnetic strength={0.4} className="inline-block">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener"
              className="inline-block rounded-full border border-ink/30 px-9 py-3.5 text-sm uppercase tracking-[.18em] transition-colors hover:bg-ink hover:text-cream"
            >
              View all on Instagram
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
