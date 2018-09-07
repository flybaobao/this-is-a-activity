import Vue from 'vue'
import Router from 'vue-router'
import index from '../view/index'
import list from '../view/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/list',
      name: 'list',
      component: list
    }
  ]
})
