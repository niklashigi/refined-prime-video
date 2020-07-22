import Vue from 'vue'
import VueCompositionAPI, { createApp } from '@vue/composition-api'

import Popup from './popup.vue'

Vue.use(VueCompositionAPI)
createApp(Popup).mount('#app')

// Remove width restriction so that the popup fills the page in Firefox Mobile
if (navigator.userAgent.startsWith('Mozilla/5.0 (Android')) {
  document.body.style.width = 'auto'
}
