import Vue from 'vue'
import Router from 'vue-router'
const UserInterface = () => import('@/components/UserInterface')
const Mytable = () => import('@/components/MyTable')
import MainPage from '@/components/TableContainer'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/mainPage',
    name: 'MainPage',
    component: MainPage,
    children: [
      {
        path: 'userInterface',
        name: 'UserInterface',
        component: UserInterface
      },
      {
        path: 'table',
        name: 'MyTable',
        component: Mytable
    }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  }
  ]
})
