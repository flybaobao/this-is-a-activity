import Vue from 'vue'
import App from '@/App'
import router from './router'
import main from '@/main.js'

const obj = {
  router
}

main(obj)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
