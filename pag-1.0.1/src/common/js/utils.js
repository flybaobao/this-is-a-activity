export default{
  /*
  * 抓取浏览器指定参数
  * */
  getUrlKey (name) {
    return decodeURIComponent((new RegExp('[?|&]'+ name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [,""])[1].replace(/\+/g,'%20')) || null // eslint-disable-line
  }
}
