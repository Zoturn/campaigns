import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard/index'
import Book from '@/components/Book'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [

      ]
    },
    {
      path: 'book/:id',
      name: 'Book',
      component: Book,
      props: true
    }
  ]
})
