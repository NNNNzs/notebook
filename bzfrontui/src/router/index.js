import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login';
import home from '@/components/home'
import a from'@/components/a'
import b from'@/components/b'
import v from '@/components/v'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/home/v',
          name: 'fina',
          component: v,
        },
        {
          path: '/home/a',
          name: 'a',
          component: a,
        },
        {
          path: '/home/b',
          name: 'b',
          component: b,
        }
      ]
    },

  ]
})
