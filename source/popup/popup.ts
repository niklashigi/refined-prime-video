import Vue from 'vue'
import Popup from './popup.vue'

import $ from '../libs/i18n'

Vue.prototype.$ = $

new Vue({
  render: h => h(Popup),
}).$mount('#app')
