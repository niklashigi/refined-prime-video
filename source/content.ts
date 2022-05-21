import './browser-polyfill'

import elementReady from 'element-ready'

import addSkipShortcut from './features/add-skip-shortcut'
import cleanUrls from './features/clean-urls'
import hideSpoilers from './features/hide-spoilers'
import improveNav from './features/improve-nav'
import trackEvent from './libs/track-event'

function bootstrap(): void {
  addSkipShortcut()
  cleanUrls()
  hideSpoilers()
  improveNav()
}

async function main(): Promise<void> {
  if (!location.origin.endsWith('primevideo.com')) {
    const primeVideoNav = await elementReady(
      [
        '.av-retail-m-nav-container',
        // Some sites (like amazon.co.jp) are still using the old navigation
        '[data-category="instant-video"]',
      ].join(),
    )

    if (!primeVideoNav) return
  }

  bootstrap()

  trackEvent('load-page', { domain: location.hostname })
}

main()
