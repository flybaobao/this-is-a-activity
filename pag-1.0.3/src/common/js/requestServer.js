import Vue from 'vue'
import api from '@/config/api'
import native from '@/api/native'
import utils from '@/common/js/utils'

const currentAPI = 'mock' // dev:测服接口; mock:mock接口
const ERR_OK = 1
/**
 * 请求服务端接口
 * @param url string 请求地址
 * @param params object 参数
 * @param loading bool 是否显示加载loading 默认显示
 * */
export default function requestServer (url, params = null, loading = true) {
  let host = ''
  if (process.env.NODE_ENV === 'production') {
    host = `/${api.production.relativePath}/${api.production.version}/${url}`
  } else {
    host = `/${currentAPI}/${url}`
  }
  // 将网页url中的token添加到参数中
  let token = utils.getUrlKey('token')
  if (token === undefined || token === null) {
    params['token'] = api.dev.token
  } else {
    params['token'] = token
  }
  const p = new Promise((resolve, reject) => {
    if (loading) native.showLoading()
    Vue.http.post(host, params).then((rs) => {
      rs = rs.data
      if (rs.code === ERR_OK) {
        resolve(rs)
      } else {
        reject(rs.response_message)
      }
      if (loading) native.hideLoading()
    }).catch(function (error) {
      if (loading) native.hideLoading()
      console.log(error)
      native.showToast(error)
    })
  })
  return p
}
