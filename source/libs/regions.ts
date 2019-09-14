interface Region {
  flag: string
  name: string
  domain: string
}

const regions: { [id: string]: Region } = {
  global: {
    flag: '🌎',
    name: 'Most countries',
    domain: 'primevideo.com',
  },
  us: {
    flag: '🇺🇸',
    name: 'United States',
    domain: 'amazon.com',
  },
  uk: {
    flag: '🇬🇧',
    name: 'United Kingdom',
    domain: 'amazon.co.uk',
  },
  de: {
    flag: '🇩🇪',
    name: 'Germany',
    domain: 'amazon.de',
  },
}

export default regions
