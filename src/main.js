import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import view
import EmployeeList from './views/employee/employeeList.vue'

Vue.use(VueRouter)

const routes = [
  // { path: "/customer", component: CustomerList},
  { path: "/employee", component: EmployeeList},
  // { path: "/student", component: StudentList}
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

Vue.config.productionTip = false
new Vue({
  router, //su dung router
  render: h => h(App),
}).$mount('#app')
