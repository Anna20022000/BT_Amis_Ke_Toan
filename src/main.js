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

export const eventBus = new Vue()

Vue.component('v-select', vSelect)
Vue.use(Vuelidate)
Vue.use(VueContentPlaceholders)
Vue.use(VueMask);

Vue.config.productionTip = false
new Vue({
  router, //su dung router
  render: h => h(App),
}).$mount('#app')
