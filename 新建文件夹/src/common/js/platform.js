/**
 * 判断客户端类型
 * */
let clientType = {
  web: 'web',
  ios: 'ios',
  android: 'android'
}

function getClient () {
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isAndroid) {
    return clientType.android
  }
  if (isIOS) {
    return clientType.ios
  }
  return clientType.web
}

export default {
  clientType,
  getClient
}
