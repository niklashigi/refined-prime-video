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

const urlMatches = domainSuffixes.map(suffix => `https://www.amazon.${suffix}/*`)

module.exports = {
  name: 'Refined Prime Video',
  description: '__MSG_manifest_description__',
  icons: {
    128: 'icon.png',
  },
  version: require('utc-version')(),
  applications: {
    gecko: {
      // I generated this UUID randomly for testing
      // (sorry if I'm not supposed to do that, AMO reviewer)
      id: '{d2d5c630-405c-4415-a627-e6c90dd8f568}',
      strict_min_version: '55.0'
    }
  },
  permissions: [
    'storage',
    ...urlMatches
  ],
  default_locale: 'en',
  content_scripts: [
    {
      run_at: 'document_start',
      matches: urlMatches,
      js: [
        'browser-polyfill.min.js',
        'content.js',
      ],
      css: ['content.css'],
    }
  ],
  manifest_version: 2,
}
