const fs = require('fs')
const path = require('path')

const manifest = require('../source/manifest.js')
const json = JSON.stringify(manifest, null, 2)
fs.writeFileSync(path.resolve(__dirname, '../distribution/manifest.json'), json)
