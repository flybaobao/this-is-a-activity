/**
 * 服务端接口
 * */
import requestServer from '@/common/js/requestServer'

export default{
  /**
   * DEMO接口1
   * @param id number id值
   * */
  index () {
    let url = 'demo/index'
    let params = null
    return requestServer(url, params)
  },
  /**
   * DEMO接口1
   * */
  list () {
    let url = 'demo/index'
    let params = null
    return requestServer(url, params, false)
  },
  /**
   * 获得用户信息
   * @param params obj 参数
   * uid 用户uid
   * */
  userInfo (uid) {
    let url = 'users/queryUserinfo'
    let params = {
      uid: uid
    }
    return requestServer(url, params)
  },
  luckDraw () {
    let url = 'active/prizeDraw'
    let params = {

    }
    return requestServer(url, params)
  }
}
