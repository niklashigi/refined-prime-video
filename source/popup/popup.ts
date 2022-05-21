import '../browser-polyfill'

import { createApp } from 'vue'

import trackEvent from '../libs/track-event'
import Popup from './popup.vue'

createApp(Popup).mount('#app')

// Remove width restriction so that the popup fills the page in Firefox Mobile
if (navigator.userAgent.startsWith('Mozilla/5.0 (Android')) {
  document.body.style.width = 'auto'
}

trackEvent('open-popup')
