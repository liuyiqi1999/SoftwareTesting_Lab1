import Vue from 'vue'
import router from "./router"
import axios from "./plugins/axios"
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(axios)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
}).$mount('#app')
