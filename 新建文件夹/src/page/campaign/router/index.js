import Vue from 'vue'
import Router from 'vue-router'
import index from '../view/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '新财富·新生活·新服务'
      }
    }
  ]
})
