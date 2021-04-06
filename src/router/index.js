import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Mine',
      component: resolve => require(['@/views/mine/index'],resolve)
    }
  ]
})
