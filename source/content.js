import elementReady from 'element-ready'

import improveNav from './features/improve-nav'
import hideSpoilers from './features/hide-spoilers'

elementReady('.av-retail-m-nav-container').then(() => {
  console.groupCollapsed('Refined Prime Video is being set up ...')

  improveNav()
  hideSpoilers()

  console.groupEnd()
  console.log('Refined Prime Video has been set up!')
})
