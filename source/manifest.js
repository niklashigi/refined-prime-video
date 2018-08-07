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

module.exports = {
  name: 'Refined Prime Video',
  description: 'Simplifies the Amazon Prime Video interface and adds useful features',
  icons: {
    128: 'icon.png',
  },
  version: require('utc-version')(),
  permissions: ['storage'],
  default_locale: 'en',
  content_scripts: [
    {
      run_at: 'document_start',
      matches: domainSuffixes.map(suffix => `https://www.amazon.${suffix}/*`),
      js: [
        'browser-polyfill.min.js',
        'content.js',
      ],
      css: ['content.css'],
    }
  ],
  manifest_version: 2,
}
