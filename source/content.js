import elementReady from 'element-ready'

import improveNav from './features/improve-nav'

elementReady('.av-retail-m-nav-container').then(() => {
  console.groupCollapsed('Refined Prime Video is being set up ...')
  improveNav()
  console.groupEnd()
  console.log('Refined Prime Video has been set up!')
})
