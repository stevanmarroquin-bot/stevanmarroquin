export type PortfolioCategory = 'neo-japones' | 'neo-tradicional' | 'cover-up' | 'realismo' | 'arte'

export interface PortfolioItem {
  src: string
  category: PortfolioCategory
  alt: string
}

export const categoryLabels: Record<PortfolioCategory, string> = {
  'neo-japones': 'Neo Japonés',
  'neo-tradicional': 'Neo Tradicional',
  'cover-up': 'Cover-ups',
  'realismo': 'Realismo',
  'arte': 'Arte',
}

export const portfolioItems: PortfolioItem[] = [
  // Neo Japonés
  { src: '/portfolio/neo-japanese/1.png', category: 'neo-japones', alt: 'Neo japonés' },
  { src: '/portfolio/neo-japanese/2.png', category: 'neo-japones', alt: 'Neo japonés' },
  { src: '/portfolio/neo-japanese/DSC02993.JPG', category: 'neo-japones', alt: 'Neo japonés' },
  { src: '/portfolio/neo-japanese/F6CC0BF5-296E-4A3F-BAB7-712298359939.JPG', category: 'neo-japones', alt: 'Neo japonés' },

  // Neo Tradicional
  { src: '/portfolio/neo-tradicional/1.png', category: 'neo-tradicional', alt: 'Neo tradicional' },
  { src: '/portfolio/neo-tradicional/5.png', category: 'neo-tradicional', alt: 'Neo tradicional' },
  { src: '/portfolio/neo-tradicional/DSC02542.JPG', category: 'neo-tradicional', alt: 'Neo tradicional' },
  { src: '/portfolio/neo-tradicional/DSC02560.JPG', category: 'neo-tradicional', alt: 'Neo tradicional' },
  { src: '/portfolio/neo-tradicional/DSC03232.JPG', category: 'neo-tradicional', alt: 'Neo tradicional' },
  { src: '/portfolio/neo-tradicional/DSC07242.JPG', category: 'neo-tradicional', alt: 'Neo tradicional' },
  { src: '/portfolio/neo-tradicional/DSC07243.JPG', category: 'neo-tradicional', alt: 'Neo tradicional' },

  // Realismo
  { src: '/portfolio/neo-realism/1.png', category: 'realismo', alt: 'Realismo' },
  { src: '/portfolio/neo-realism/2.png', category: 'realismo', alt: 'Realismo' },
  { src: '/portfolio/neo-realism/3.png', category: 'realismo', alt: 'Realismo' },
  { src: '/portfolio/neo-realism/4.png', category: 'realismo', alt: 'Realismo' },
  { src: '/portfolio/neo-realism/jacob1.png', category: 'realismo', alt: 'Realismo' },
  { src: '/portfolio/neo-realism/jacob2.png', category: 'realismo', alt: 'Realismo' },
  { src: '/portfolio/neo-realism/jacob3.png', category: 'realismo', alt: 'Realismo' },
  { src: '/portfolio/neo-realism/jacob4.png', category: 'realismo', alt: 'Realismo' },

  // Cover-ups
  { src: '/portfolio/cover-ups/dragon1.png', category: 'cover-up', alt: 'Cover-up' },
  { src: '/portfolio/cover-ups/dragon2.png', category: 'cover-up', alt: 'Cover-up' },
  { src: '/portfolio/cover-ups/dragon3.png', category: 'cover-up', alt: 'Cover-up' },
  { src: '/portfolio/cover-ups/dragon4.png', category: 'cover-up', alt: 'Cover-up' },
  { src: '/portfolio/cover-ups/dragon5.png', category: 'cover-up', alt: 'Cover-up' },
  { src: '/portfolio/cover-ups/dragon6.png', category: 'cover-up', alt: 'Cover-up' },
  { src: '/portfolio/cover-ups/dragon7.png', category: 'cover-up', alt: 'Cover-up' },
  { src: '/portfolio/cover-ups/dog2.JPG', category: 'cover-up', alt: 'Cover-up' },
  { src: '/portfolio/cover-ups/sleeve1.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve2.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve3.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve4.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve5.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve6.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve7.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve8.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve9.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve10.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve11.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve12.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve13.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve14.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve15.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve16.png', category: 'cover-up', alt: 'Cover-up manga' },
  { src: '/portfolio/cover-ups/sleeve17.png', category: 'cover-up', alt: 'Cover-up manga' },

  // Arte
  { src: '/portfolio/Art/DSC07510.JPG', category: 'arte', alt: 'Arte' },
  { src: '/portfolio/Art/DSC07511.JPG', category: 'arte', alt: 'Arte' },
  { src: '/portfolio/Art/DSC07514.JPG', category: 'arte', alt: 'Arte' },
  { src: '/portfolio/Art/DSC07515.JPG', category: 'arte', alt: 'Arte' },
  { src: '/portfolio/Art/DSC07517.JPG', category: 'arte', alt: 'Arte' },
  { src: '/portfolio/Art/DSC07518.JPG', category: 'arte', alt: 'Arte' },
  { src: '/portfolio/Art/DSC07525.JPG', category: 'arte', alt: 'Arte' },
  { src: '/portfolio/Art/DSC07535.JPG', category: 'arte', alt: 'Arte' },
  { src: '/portfolio/Art/DSC07543.JPG', category: 'arte', alt: 'Arte' },
]

export const heroImages = [
  '/portfolio/hero/DSC00259.jpg',
  '/portfolio/hero/DSC05442.JPG',
  '/portfolio/hero/DSC06469.JPG',
  '/portfolio/hero/DSC08674.JPG',
  '/portfolio/hero/DSC08889.JPG',
  '/portfolio/hero/DSC08891.JPG',
]
