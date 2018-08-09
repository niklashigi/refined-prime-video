const fs = require('fs')
const path = require('path')

const generateManifest = require('../source/manifest.js')
const version = require('utc-version')()

for (const browser of ['chrome', 'firefox']) {
  const manifest = generateManifest(version, browser)
  const json = JSON.stringify(manifest, null, 2)
  fs.writeFileSync(
    path.resolve(__dirname, `../extensions/${browser}/manifest.json`),
    json
  )
}
