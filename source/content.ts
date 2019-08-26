import elementReady from 'element-ready'

import addSkipShortcut from './features/add-skip-shortcut'
import hideSpoilers from './features/hide-spoilers'
import improveNav from './features/improve-nav'

function enableCommonFeatures() {
  addSkipShortcut()
  hideSpoilers()
}

async function main() {
  if (location.origin.endsWith('primevideo.com')) {
    enableCommonFeatures()
  } else {
    const container = await elementReady('.av-retail-m-nav-container')
    if (!container) return

    enableCommonFeatures()
    improveNav()
  }
}

main()
