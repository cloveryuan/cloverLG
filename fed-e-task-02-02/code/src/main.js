import Vue from 'vue'
import App from './App.vue'

import './style.less'

Vue.config.productionTip = false
const s = 1
new Vue({
  render: h => h(App)
}).$mount('#app')
