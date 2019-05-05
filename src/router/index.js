import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard/index'
import Campaign from '@/components/Campaign/index'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/dashboard/:id',
            name: 'Campaign',
            component: Campaign,
            props: true
        }
    ]
})
