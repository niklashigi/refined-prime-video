const domains = [
  'primevideo.com',
  'amazon.com',
  'amazon.co.uk',
  'amazon.de',
]

const urlMatches = domains.map(domain => `https://*.${domain}/*`)

module.exports = (version, browser) => {

  const manifest = {
    name: 'Refined Prime Video',
    description: '__MSG_manifest_description__',
    homepage_url: 'https://github.com/shroudedcode/refined-prime-video',
    icons: {
      128: 'icon.png',
    },
    browser_action: {
      default_icon: 'icon.png',
      default_title: 'Refined Prime Video',
      default_popup: 'popup.html',
      browser_style: true,
    },
    version,
    permissions: ['storage', 'tabs'],
    default_locale: 'en',
    content_scripts: [
      {
        run_at: 'document_start',
        matches: urlMatches,
        js: ['content.js'],
        css: ['content.css'],
      }
    ],
    manifest_version: 2,
  }

  if (browser === 'chrome') {

    // Include polyfill so the Promise-based `browser.*` APIs can be used in
    // the Chrome extension although they are not officially supported yet
    manifest.content_scripts[0].js.unshift('browser-polyfill.min.js')

    // Set a minimum Chrome version
    manifest.minimum_chrome_version = '58'

  } else if (browser === 'firefox') {

    // Add required metadata for Firefox
    manifest.applications = {
      gecko: {
        id: '{d2d5c630-405c-4415-a627-e6c90dd8f568}',
        strict_min_version: '55.0'
      }
    }

    // Add host permissions required to work around Firefox's CSP implementation
    // preventing content scripts from being inserted in 'sandbox' mode
    manifest.permissions.push(...urlMatches)

  }

  return manifest

}
