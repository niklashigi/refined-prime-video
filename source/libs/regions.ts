export interface Region {
  flag: string
  name: string
  domain: string
  homeUrl: string
}

const regions: Record<string, Region> = {
  global: {
    flag: '🌎',
    name: 'Most countries',
    domain: 'primevideo.com',
    homeUrl: 'https://www.primevideo.com/',
  },
  us: {
    flag: '🇺🇸',
    name: 'United States',
    domain: 'amazon.com',
    homeUrl: 'https://www.amazon.com/gp/video/storefront',
  },
  uk: {
    flag: '🇬🇧',
    name: 'United Kingdom',
    domain: 'amazon.co.uk',
    homeUrl: 'https://www.amazon.co.uk/gp/video/storefront',
  },
  de: {
    flag: '🇩🇪',
    name: 'Germany',
    domain: 'amazon.de',
    homeUrl: 'https://www.amazon.de/gp/video/storefront',
  },
  jp: {
    flag: '🇯🇵',
    name: 'Japan',
    domain: 'amazon.co.jp',
    homeUrl: 'https://www.amazon.co.jp/gp/video/storefront',
  },
}

export default regions
