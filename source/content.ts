import './browser-polyfill'

import elementReady from 'element-ready'

import addSkipShortcut from './features/add-skip-shortcut'
import cleanUrls from './features/clean-urls'
import hideSpoilers from './features/hide-spoilers'
import trackEvent from './libs/track-event'

function bootstrapFeatures(): void {
  addSkipShortcut()
  cleanUrls()
  hideSpoilers()
}

async function main(): Promise<void> {
  if (!(await isPrimeVideoPage())) return

  console.log('[RPV] Detected Prime Video page, enabling features...')

  document.documentElement.classList.add('rpv-primevideo-page')
  bootstrapFeatures()

  trackEvent('load-page', { domain: location.hostname })
}

async function isPrimeVideoPage() {
  if (location.origin.endsWith('primevideo.com')) return true

  const pvNavigationBar = await elementReady('#pv-navigation-bar')
  if (pvNavigationBar) return true

  return false
}

main()
