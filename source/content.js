import waitForNav from './lib/wait-for-nav'

import improveNav from './features/improve-nav'

waitForNav(() => {
  console.groupCollapsed('Refined Prime Video is being set up ...')
  improveNav()
  console.groupEnd()
  console.log('Refined Prime Video has been set up!')
})
