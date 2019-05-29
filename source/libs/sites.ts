interface Site {
  flag: string
  domainSuffix: string
}

const sites: { [id: string]: Site } = {
  us: { flag: '🇺🇸', domainSuffix: 'com' },
  uk: { flag: '🇬🇧', domainSuffix: 'co.uk' },
  de: { flag: '🇩🇪', domainSuffix: 'de' },
}

export default sites
