/**
 * 请求客户端接口
 * */
import platform from '@/common/js/platform'
export default function requestNative (funcName, data = null) {
  if (platform.getClient() === platform.clientType.ios) {
    try {
      let param = {func: funcName}
      if (data) {
        param = {func: funcName, content: data}
      }
      // console.log(JSON.stringify(param))
      webkit.messageHandlers.HXJSModel.postMessage (JSON.stringify(param)) // eslint-disable-line
    } catch (err) {}
  } else if (platform.getClient() === platform.clientType.android) {
    try {
      let evalStr = 'OCModel.' + funcName + '(' + ')'
      if (data) {
        let param = JSON.stringify(data)
        evalStr = 'OCModel.' + funcName + '(\'' + param + '\')'
      }
      // console.log(evalStr)
      eval(evalStr) // eslint-disable-line
    } catch (err) {}
  } else {
    console.log(`调用原生${funcName}方法`)
  }
}
