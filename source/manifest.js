const domains = [
  'primevideo.com',
  'amazon.com',
  'amazon.co.uk',
  'amazon.de',
  'amazon.co.jp',
]

const urlMatches = domains.map(domain => `https://*.${domain}/*`)

module.exports = (version, browser) => {
  // Only Chrome supports Manifest v3 at the moment
  const isManifestV3 = browser === 'chrome'

  const manifest = {
    name: 'Refined Prime Video',
    description:
      'Adds small tweaks and useful new features to Amazon Prime Video.',
    homepage_url: 'https://github.com/shroudedcode/refined-prime-video#readme',
    icons: {
      128: 'icon.png',
    },
    [isManifestV3 ? 'action' : 'browser_action']: {
      default_icon: 'icon.png',
      default_title: 'Refined Prime Video',
      default_popup: 'popup.html',
      browser_style: true,
    },
    version,
    permissions: ['storage'],
    content_scripts: [
      {
        run_at: 'document_start',
        matches: urlMatches,
        js: ['content.js'],
        css: ['content.css'],
      },
    ],
    background: isManifestV3
      ? { service_worker: 'background.js' }
      : { scripts: ['background.js'] },
    manifest_version: isManifestV3 ? 3 : 2,
  }

  if (browser === 'chrome') {
    // Set a minimum Chrome version
    manifest.minimum_chrome_version = '58'
  } else if (browser === 'firefox') {
    // Add required metadata for Firefox
    manifest.applications = {
      gecko: {
        id: '{d2d5c630-405c-4415-a627-e6c90dd8f568}',
        strict_min_version: '55.0',
      },
    }

    // Add host permissions required to work around Firefox's CSP implementation
    // preventing content scripts from being inserted in 'sandbox' mode
    manifest.permissions.push(...urlMatches)

    // Disable tracking protection for domains, so that "Continue watching"
    // requests are not blocked (see https://discourse.mozilla.org/t/50900)
    const wwwHosts = domains.map(domain => `https://www.${domain}/`)
    manifest.permissions.push(...wwwHosts)
  }

  return manifest
}
