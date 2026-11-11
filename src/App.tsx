import { AnimateUIProvider } from '@animate-ui/react/provider'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Guides } from './components/Guides'
import { Tools } from './components/Tools'
import { Feed } from './components/Feed'
import { Band } from './components/Band'
import { About } from './components/About'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <AnimateUIProvider>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Guides />
        <Tools />
        <Feed />
        <Band />
        <About />
      </main>
      <Footer />
    </AnimateUIProvider>
  )
}
