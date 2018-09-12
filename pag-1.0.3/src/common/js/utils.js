Date.prototype.Format = function (fmt) { // eslint-disable-line
  let o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds()// 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
Date.Format = function (timestamp, fmt) {
  let date = new Date()
  date.setTime(timestamp)
  return date.Format(fmt)
}
// 返回cdn资源链接
function csrc (src) {
  let http = new RegExp('http://', 'i')
  if (http.test(src)) {
    return src
  }
  let https = new RegExp('https://', 'i')
  if (https.test(src)) {
    return src
  }
  return 'https://hxtz-8518.b0.upaiyun.com/' + src
}
export default{
  // 格式化时间戳
  formatDate (s) {
    s = Date.Format(s * 1000, 'yyyy-MM-dd hh:mm')
    return s
  },
  setDefaultHead (data) {
    let image = data ? csrc(data) : ''
    return image
  },
  /*
  * 抓取浏览器指定参数
  * */
  getUrlKey (name) {
    return decodeURIComponent((new RegExp('[?|&]'+ name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [,""])[1].replace(/\+/g,'%20')) || null // eslint-disable-line
  }
}
