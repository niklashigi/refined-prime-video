interface Region {
  flag: string
  domainSuffix: string
}

const regions: { [id: string]: Region } = {
  us: { flag: '🇺🇸', domainSuffix: 'com' },
  uk: { flag: '🇬🇧', domainSuffix: 'co.uk' },
  de: { flag: '🇩🇪', domainSuffix: 'de' },
}

export default regions
