import Vue from 'vue'
import App from './App.vue'
import router from './router' // router
import vSelect from 'vue-select' //vue select
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect)

Vue.config.productionTip = false
new Vue({
  router, //su dung router
  render: h => h(App),
}).$mount('#app')
