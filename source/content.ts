import elementReady from 'element-ready'

import addSkipShortcut from './features/add-skip-shortcut'
import hideSpoilers from './features/hide-spoilers'
import improveNav from './features/improve-nav'

elementReady('.av-retail-m-nav-container').then(container => {
  if (!container) return

  addSkipShortcut()
  improveNav()
  hideSpoilers()
})
