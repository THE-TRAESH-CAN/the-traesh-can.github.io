import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import store from './store'

Vue.config.productionTip = false
const garbage = new Vue()
Vue.prototype.$TRAESH = garbage
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')