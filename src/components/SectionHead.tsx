import { Effect } from '@animate-ui/react/primitives/effects/effect'

type Props = { eyebrow: string; title: string; sub?: string; dark?: boolean; className?: string }

export function SectionHead({ eyebrow, title, sub, dark = false, className = '' }: Props) {
  return (
    <div className={className}>
      <Effect fade blur slide={{ direction: 'up', offset: 14 }} inView inViewOnce>
        <p className="eyebrow">{eyebrow}</p>
      </Effect>
      <Effect fade blur slide={{ direction: 'up', offset: 28 }} delay={120} inView inViewOnce>
        <h2 className={`mt-4 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1] tracking-tight ${dark ? 'text-cream' : 'text-ink'}`}>
          {title}
        </h2>
      </Effect>
      {sub && (
        <Effect fade blur slide={{ direction: 'up', offset: 20 }} delay={240} inView inViewOnce>
          <p className={`mt-5 max-w-[52ch] text-lg leading-relaxed ${dark ? 'text-cream/65' : 'text-mocha'}`}>{sub}</p>
        </Effect>
      )}
    </div>
  )
}
