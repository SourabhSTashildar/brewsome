import { Bean } from './Bean'
import { INSTAGRAM } from '../data'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-10 pt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="outline-text select-none text-center font-display text-[clamp(4.5rem,21vw,17rem)] italic leading-[.85]" aria-hidden="true">
          brewsome
        </p>
        <div className="hairline mt-14" />
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-cream/55 sm:flex-row">
          <span className="flex items-center gap-2">
            <Bean className="size-4 text-brass" /> © {new Date().getFullYear()} Brewsome · Goa
          </span>
          <nav className="flex gap-7 uppercase tracking-[.18em]">
            <a href="#guides" className="transition-colors hover:text-brass-soft">Guides</a>
            <a href="#tools" className="transition-colors hover:text-brass-soft">Tools</a>
            <a href="#feed" className="transition-colors hover:text-brass-soft">Feed</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener" className="transition-colors hover:text-brass-soft">Instagram</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
