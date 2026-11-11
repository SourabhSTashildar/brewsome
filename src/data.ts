// Everything editable lives here: Instagram handle, feed posts and brew guides.
export const INSTAGRAM = 'https://instagram.com/brewsome.coffee'
export const OWNER = { handle: '@sourabhtashildar91', url: 'https://instagram.com/sourabhtashildar91' }

// Relative so the built site works from any IPFS gateway path.
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export type Post = { type: 'reel' | 'post'; date: string; img: string; url: string }

// Newest first. To add a post: save its image into public/ (named img-NN.jpg) and add a line.
export const FEED: Post[] = [
  { type: 'reel', date: 'Nov 10, 2026', img: 'img-01.jpg', url: 'https://www.instagram.com/reel/DfjvbSdx7_f/' },
  { type: 'reel', date: 'Oct 2, 2026', img: 'img-02.jpg', url: 'https://www.instagram.com/reel/Dd_s5HAiq9_/' },
  { type: 'reel', date: 'May 24, 2026', img: 'img-03.jpg', url: 'https://www.instagram.com/reel/DYuGtKmFH3m/' },
  { type: 'post', date: 'Apr 25, 2026', img: 'img-04.jpg', url: 'https://www.instagram.com/p/DXjdYQbGvSQ/' },
  { type: 'reel', date: 'Apr 24, 2026', img: 'img-05.jpg', url: 'https://www.instagram.com/reel/DXiz1pOgHwN/' },
  { type: 'reel', date: 'Apr 17, 2026', img: 'img-06.jpg', url: 'https://www.instagram.com/reel/DXO8OXhjZr-/' },
  { type: 'reel', date: 'Mar 28, 2026', img: 'img-07.jpg', url: 'https://www.instagram.com/reel/DWa4VgfCEse/' },
  { type: 'reel', date: 'Mar 13, 2026', img: 'img-08.jpg', url: 'https://www.instagram.com/reel/DV1CgddD2kJ/' },
  { type: 'post', date: 'Mar 12, 2026', img: 'img-09.jpg', url: 'https://www.instagram.com/p/DVx3TgiiFG0/' },
]

export type Guide = {
  id: string
  name: string
  ratio: string
  temp: string
  time: string
  grind: string
  note: string
  steps: string[]
}

export const GUIDES: Guide[] = [
  {
    id: 'pour-over', name: 'Pour over', ratio: '1:16', temp: '94°C', time: '3:00', grind: 'Medium-fine',
    note: 'Clean, bright and layered. The ritual brew.',
    steps: ['Rinse the filter and discard the water.', 'Bloom with twice the coffee weight for 30 seconds.', 'Pour in slow circles up to full weight by 1:30.', 'Let it drain. Swirl. Sip.'],
  },
  {
    id: 'aeropress', name: 'AeroPress', ratio: '1:14', temp: '90°C', time: '2:00', grind: 'Medium',
    note: 'Rich but smooth, and forgiving on a bad morning.',
    steps: ['Inverted: add coffee, then pour to full.', 'Stir for 10 seconds and steep for 90.', 'Flip onto the cup and press gently for 30 seconds.', 'Stop at the hiss.'],
  },
  {
    id: 'french-press', name: 'French press', ratio: '1:15', temp: '95°C', time: '4:00', grind: 'Coarse',
    note: 'Full-bodied and unhurried. Patience is the method.',
    steps: ['Coarse grind, pour all the water.', 'Wait four minutes. Do not stir.', 'Break the crust and skim the foam.', 'Press slowly and serve at once.'],
  },
  {
    id: 'cold-brew', name: 'Cold brew', ratio: '1:8', temp: 'Fridge', time: '14 h', grind: 'Coarse',
    note: 'Slow, sweet and concentrated. Make it tonight.',
    steps: ['Coarse grind into a jar, add cold water.', 'Stir, cover and refrigerate overnight.', 'Strain through a paper filter.', 'Dilute 1:1 with water or milk, over ice.'],
  },
]

export const METHODS = [
  { id: '16', label: 'Pour over', ratio: 16, hint: 'Clean and bright. Medium-fine grind, 94°C water.' },
  { id: '14', label: 'AeroPress', ratio: 14, hint: 'Rich but smooth. Medium grind, 90°C, press gently.' },
  { id: '15', label: 'French press', ratio: 15, hint: 'Full-bodied. Coarse grind, four-minute steep.' },
  { id: '8', label: 'Cold brew', ratio: 8, hint: 'A concentrate. Dilute 1:1 before drinking.' },
  { id: '2', label: 'Espresso', ratio: 2, hint: 'Dense and syrupy. Fine grind, aim for 25-30 seconds.' },
]

export const TIMER_TOTAL = 180
export const TIMER_STEPS: [number, string][] = [
  [0, 'Bloom. Pour twice the coffee weight and wait.'],
  [30, 'First pour. Slow circles to half the water.'],
  [75, 'Second pour. Finish to full weight.'],
  [105, 'Let it drain. Give it a gentle swirl.'],
  [150, 'Almost there. Smell it.'],
  [180, 'Done. Sip slowly.'],
]
