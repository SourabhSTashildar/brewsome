import { Bean } from './Bean'

const WORDS = ['pour over', 'espresso', 'aeropress', 'french press', 'cold brew', 'moka pot', 'single origin', 'slow mornings']

export function Marquee() {
  const row = WORDS.flatMap((w) => [
    <span key={w} className="font-display text-3xl italic text-cream/80 sm:text-4xl">
      {w}
    </span>,
    <Bean key={`${w}-b`} className="size-4 shrink-0 text-brass" />,
  ])
  return (
    <div className="relative overflow-hidden border-y border-brass/20 bg-roast py-6" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        <div className="flex items-center gap-10">{row}</div>
        <div className="flex items-center gap-10">{row}</div>
      </div>
    </div>
  )
}
