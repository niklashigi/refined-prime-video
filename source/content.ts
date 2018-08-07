import elementReady from 'element-ready'

import hideSpoilers from './features/hide-spoilers'
import improveNav from './features/improve-nav'
import { addSettingsBar, setupSettings } from './libs/settings'

elementReady('.av-retail-m-nav-container').then(async () => {
  await setupSettings()
  addSettingsBar()

  improveNav()
  hideSpoilers()
})
