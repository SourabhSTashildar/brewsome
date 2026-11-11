import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsTrigger,
} from '@animate-ui/react/primitives/tabs'
import { Parallax } from './Parallax'
import { Bean } from './Bean'
import { SectionHead } from './SectionHead'
import { GUIDES } from '../data'

export function Guides() {
  return (
    <section id="guides" className="relative overflow-hidden bg-paper py-28 text-ink sm:py-36">
      {/* decorative parallax beans */}
      <Parallax speed={0.35} className="pointer-events-none absolute -right-6 top-24 hidden md:block">
        <Bean className="size-28 rotate-[35deg] text-mocha/10" />
      </Parallax>
      <Parallax speed={-0.25} className="pointer-events-none absolute -left-8 bottom-24 hidden md:block">
        <Bean className="size-20 -rotate-[20deg] text-mocha/10" />
      </Parallax>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          eyebrow="The method"
          title="Brew guides"
          sub="Starting points, not commandments. Taste, then tweak."
        />

        <Tabs defaultValue={GUIDES[0].id} className="mt-14 grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-16">
          <TabsList className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            <TabsHighlight className="absolute inset-0 z-0 rounded-2xl bg-ink shadow-xl shadow-ink/20">
              {GUIDES.map((g, i) => (
                <TabsHighlightItem key={g.id} value={g.id} className="shrink-0 lg:shrink">
                  <TabsTrigger
                    value={g.id}
                    className="relative z-10 flex w-full cursor-pointer items-center gap-4 rounded-2xl px-5 py-4 text-left text-ink/65 transition-colors data-[state=active]:text-cream"
                  >
                    <span className="font-display text-lg italic opacity-60">0{i + 1}</span>
                    <span className="font-display text-2xl whitespace-nowrap">{g.name}</span>
                    <span className="ml-auto hidden text-xs tracking-widest opacity-60 lg:block">{g.ratio}</span>
                  </TabsTrigger>
                </TabsHighlightItem>
              ))}
            </TabsHighlight>
          </TabsList>

          <TabsContents className="overflow-hidden rounded-[2rem] border border-ink/10 bg-white/50">
            {GUIDES.map((g) => (
              <TabsContent key={g.id} value={g.id} className="p-7 sm:p-10">
                <p className="font-display text-2xl italic text-mocha sm:text-3xl">{g.note}</p>

                <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-ink/10 py-6 sm:grid-cols-4">
                  {[
                    ['Ratio', g.ratio],
                    ['Water', g.temp],
                    ['Time', g.time],
                    ['Grind', g.grind],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="eyebrow !text-[.62rem] !text-muted">{k}</dt>
                      <dd className="mt-1 font-display text-3xl">{v}</dd>
                    </div>
                  ))}
                </dl>

                <ol className="mt-8 space-y-5">
                  {g.steps.map((s, i) => (
                    <li key={s} className="flex gap-5">
                      <span className="font-display text-3xl italic leading-none text-brass">{i + 1}</span>
                      <span className="pt-0.5 text-lg leading-snug text-ink/80">{s}</span>
                    </li>
                  ))}
                </ol>
              </TabsContent>
            ))}
          </TabsContents>
        </Tabs>
      </div>
    </section>
  )
}
