import elementReady from 'element-ready'

import hideSpoilers from './features/hide-spoilers'
import improveNav from './features/improve-nav'
import { insertSettingsForm, setupSettings } from './libs/settings'

elementReady('.av-retail-m-nav-container').then(async () => {
  await setupSettings()
  insertSettingsForm()

  improveNav()
  hideSpoilers()
})
