import Vue from 'vue'
import requestNative from '@/common/js/requestNative'
import platform from '@/common/js/platform'

export default {
  /**
   * @param route vue-router
   * @param url string 链接
   * @param params object 参数
   * @param forget bool 是否清空访问路径记录 默认否
   * @param remember bool 当前页面 默认是
   * @param refresh bool
   */
  push (route, url, params, forget = 0, remember = 1, refresh = 1) {
    if (platform.getClient() !== platform.clientType.web) {
      let obj = {
        router: url,
        params: params,
        forget: forget,
        remember: remember,
        refresh: refresh
      }
      requestNative('push', obj)
    } else {
      route.push({
        name: url,
        params: params
      })
    }
  },
  /**
   * 返回
   * */
  goBack () {
    if (platform.getClient() !== platform.clientType.web) {
      requestNative('nativgo_back')
    } else {
      Vue.$router.go(1)
    }
  },
  /**
   * 登录
   * */
  toLogin () {
    requestNative('to_login')
  },
  /**
   * 提示层
   * @param msg string 提示文字
   * */
  showToast (msg) {
    if (platform.getClient() !== platform.clientType.web) {
      requestNative('show_toast', {'msg': msg})
    } else {
      Vue.$vux.toast.text(msg, 'bottom')
    }
  },
  /**
   * 显示Loading
   */
  showLoading () {
    if (platform.getClient() !== platform.clientType.web) {
      requestNative('showLoading')
    } else {
      Vue.$vux.loading.show({
        text: ''
      })
    }
  },
  /**
   *  隐藏Loading
   * */
  hideLoading () {
    if (platform.getClient() !== platform.clientType.web) {
      requestNative('dismissLoading')
    } else {
      Vue.$vux.loading.hide()
    }
  },
  /**
   * 显示右上角分享按钮（全部需要绝对地址）
   * @param params.name 分享title
   * @param params.desc 分享描述
   * @param params.pic 分享缩略图
   * @param params.url 点击地址
   * */
  share (params) {
    let share = {
      id: 1,
      name: params.name,
      pic: params.pic,
      desc: params.desc,
      type: 3,
      exceptPlatforms: [10, 11, 20, 21, 22, 23], // 排除显示的按钮
      url: params.url
    }
    requestNative('mobile_share', share)
  },
  // 按钮点击
  app_share (params) {
    let share = {
      id: 1,
      name: params.name,
      pic: params.pic,
      desc: params.desc,
      type: 3,
      exceptPlatforms: [10, 11, 20, 21, 22, 23], // 排除显示的按钮
      url: params.url
    }
    requestNative('app_share', share)
  }
}
