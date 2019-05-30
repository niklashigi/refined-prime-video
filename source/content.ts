import elementReady from 'element-ready'

import hideSpoilers from './features/hide-spoilers'
import improveNav from './features/improve-nav'

elementReady('.av-retail-m-nav-container').then(async () => {
  improveNav()
  hideSpoilers()
})
