const { promises: fs } = require('fs')
const path = require('path')
const utcVersion = require('utc-version')

const BROWSERS = ['chrome', 'firefox']

module.exports = function generateManifests() {
  const version = process.env.VERSION ?? utcVersion()

  // Invalidate `require` cache (necessary for Gulp `watch` task)
  delete require.cache[require.resolve('../source/manifest.js')]
  const generateManifest = require('../source/manifest.js')

  return Promise.all(
    BROWSERS.map(async browser => {
      const manifest = generateManifest(version, browser)
      const json = JSON.stringify(manifest, null, 2)

      const directoryPath = path.resolve(__dirname, `../extensions/${browser}`)
      await fs.mkdir(directoryPath, { recursive: true })

      await fs.writeFile(path.join(directoryPath, 'manifest.json'), json)
    }),
  )
}
