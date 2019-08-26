import elementReady from 'element-ready'

import addSkipShortcut from './features/add-skip-shortcut'
import hideSpoilers from './features/hide-spoilers'
import improveNav from './features/improve-nav'

function bootstrap() {
  addSkipShortcut()
  improveNav()
  hideSpoilers()

  console.log('[RPV] Features enabled!')
}

async function main() {
  if (location.origin.endsWith('primevideo.com')) {
    bootstrap()
  } else {
    const container = await elementReady('.av-retail-m-nav-container')
    if (container) bootstrap()
  }
}

main()
