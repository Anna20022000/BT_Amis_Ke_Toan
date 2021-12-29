import Vue from 'vue'
import App from './App.vue'
import router from './router' // router
// use Vue select
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
// use Vuelidate
import Vuelidate from 'vuelidate'
// vue placehoder
import VueContentPlaceholders from 'vue-content-placeholders'
// vue mask to format phone number
import VueMask from 'v-mask'
// tooltip
import VTooltip from 'v-tooltip'

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
const options = {
  position: "top-left"
}
Vue.use(Toast, options)

export const eventBus = new Vue()

Vue.component('v-select', vSelect)
Vue.use(Vuelidate)
Vue.use(VueContentPlaceholders)
Vue.use(VueMask)
Vue.use(VTooltip)

Vue.config.productionTip = false
new Vue({
  router, //su dung router
  render: h => h(App),
}).$mount('#app')
