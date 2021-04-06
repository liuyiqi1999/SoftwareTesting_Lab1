import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) return { selector: to.hash }
        if (savedPosition) return savedPosition

        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/layouts/system/Index.vue'),
            // children: [
            //     {
            //         path: '/loan/repayment',
            //         name: 'LoanRepayment',
            //         component: () => import('@/views/connection/Index.vue')
            //     },
            // ],
        },
    ]
})

export default router
