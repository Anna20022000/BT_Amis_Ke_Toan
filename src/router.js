import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            alias: "/employee",
            name: "employee",
            component: () => import("./views/employee/employeeList.vue")
        },
        {
            path: "/customer",
            name: "customer",
            component: () => import("./views/customer/customerList.vue")
        },
    ]
})