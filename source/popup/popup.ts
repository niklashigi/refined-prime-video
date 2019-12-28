import Vue from 'vue'
import Popup from './popup.vue'

new Vue({
  render: h => h(Popup),
}).$mount('#app')

// Remove width restriction so that the popup fills the page in Firefox Mobile
if (navigator.userAgent.startsWith('Mozilla/5.0 (Android')) {
  document.body.style.width = 'auto'
}
