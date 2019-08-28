interface Region {
  flag: string
  domain: string
}

const regions: { [id: string]: Region } = {
  global: { flag: '🌎', domain: 'primevideo.com' },
  us: { flag: '🇺🇸', domain: 'amazon.com' },
  uk: { flag: '🇬🇧', domain: 'amazon.co.uk' },
  de: { flag: '🇩🇪', domain: 'amazon.de' },
}

export default regions
