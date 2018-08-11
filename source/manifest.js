/**
 * List of the suffixes of all the Amazon domains the "local version" of Prime
 * Video is supported on. The list is based on the page linked below, has been
 * filtered by checking which sites are "actually local" (do not redirect to
 * "primevideo.com") and might not be complete.
 *
 * @see https://www.primevideo.com/help?nodeId=202065060
 */
const domainSuffixes = [
  'com',
  'co.uk',
  'de',
]

const urlMatches = domainSuffixes.map(suffix => `https://*.amazon.${suffix}/*`)

module.exports = (version, browser) => {

  const manifest = {
    name: 'Refined Prime Video',
    description: '__MSG_manifest_description__',
    homepage_url: 'https://github.com/sindresorhus/refined-github',
    icons: {
      128: 'icon.png',
    },
    version,
    permissions: ['storage'],
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
