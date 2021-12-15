import Vue from 'vue'
import App from './App.vue'
import router from './router' // router
// use Vue select
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
// use Vuelidate
import Vuelidate from 'vuelidate'

Vue.component('v-select', vSelect)
Vue.use(Vuelidate)

Vue.config.productionTip = false
new Vue({
  router, //su dung router
  render: h => h(App),
}).$mount('#app')
