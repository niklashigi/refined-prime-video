/**
 * Amazon domain suffixes Prime Video is supported on.
 *
 * @see https://www.primevideo.com/help?nodeId=202065060
 */
const domainSuffixes = [
  'com',
  'lu',
  'co.uk',
  'ca',
  'com.mx',
  'com.br',
  'de',
  'fr',
  'it',
  'es',
  'in',
  'cn',
  'co.jp',
  'com.au',
  'nl',
]

module.exports = {
  name: 'Refined Prime Video',
	description: 'Simplifies the Amazon Prime Video interface',
	version: require('utc-version')(),
  content_scripts: [
    {
      run_at: 'document_end',
      matches: domainSuffixes.map(suffix => `https://www.amazon.${suffix}/*`),
      js: ['content.js'],
      css: ['content.css']
    }
  ],
  manifest_version: 2
}
