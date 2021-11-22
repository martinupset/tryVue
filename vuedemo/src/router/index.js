import Vue from 'vue'
import Router from 'vue-router'
import UserInterface from '@/components/UserInterface'
import Mytable from '@/components/MyTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserInterface',
      component: UserInterface
    },
    {
      path: '/table',
      name: 'MyTable',
      component: Mytable
  }
  ]
})
