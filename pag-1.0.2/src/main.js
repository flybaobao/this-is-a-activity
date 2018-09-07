// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import FastClick from 'fastclick'
import native from '@/api/native'
import server from '@/api/server'
import { AlertPlugin, ToastPlugin, LoadingPlugin, AjaxPlugin } from 'vux'

export default function main (obj) {
  Vue.config.productionTip = false
  // 点击延迟
  FastClick.attach(document.body)
  Vue.use(AlertPlugin)
  Vue.use(ToastPlugin)
  Vue.use(LoadingPlugin)
  Vue.use(AjaxPlugin)
  // 原生请求
  Vue.prototype.$native = native
  // 服务端请求
  Vue.prototype.$server = server

  obj.router.beforeEach((to, from, next) => {
    if (to.meta.title) { // 如果设置标题，拦截后设置标题
      document.title = to.meta.title
    }
    next()
  })
}
