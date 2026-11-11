import { ScrollProgress, ScrollProgressProvider } from '@animate-ui/react/primitives/scroll-progress'
import { Magnetic } from '@animate-ui/react/primitives/effects/magnetic'
import { Bean } from './Bean'
import { INSTAGRAM } from '../data'

const LINKS = [
  ['Guides', '#guides'],
  ['Tools', '#tools'],
  ['Feed', '#feed'],
  ['About', '#about'],
]

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brass/15 bg-ink/90 backdrop-blur-xl">
      <ScrollProgressProvider global direction="horizontal">
        <ScrollProgress mode="scaleX" className="absolute inset-x-0 top-0 h-[2px] origin-left bg-brass" />
      </ScrollProgressProvider>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Brewsome home">
          <Bean className="size-6 text-brass" />
          <span className="font-display text-2xl italic tracking-wide">brewsome</span>
        </a>

        <nav className="flex items-center gap-6 text-[.8rem] uppercase tracking-[.18em] text-cream/75 sm:gap-9">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} className="hidden transition-colors hover:text-brass-soft sm:block">
              {label}
            </a>
          ))}
          <Magnetic strength={0.35} range={90} className="inline-block">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener"
              className="inline-block rounded-full border border-brass/60 px-5 py-2 text-brass-soft transition-colors hover:bg-brass hover:text-ink"
            >
              Follow
            </a>
          </Magnetic>
        </nav>
      </div>
    </header>
  )
}
