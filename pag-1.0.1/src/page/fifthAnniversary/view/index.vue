<template>
  <div class="fifthAnniversary">
    <div class="img"><img src="../assets/img/banner.png"></div>
    <div class="img"><img src="../assets/img/img1.png"></div>
    <div class="img"><img src="../assets/img/img2.png"></div>
    <div class="img"><img src="../assets/img/img3.png"></div>
  </div>
</template>

<script>
import {HOST_ROUTER} from '@/config/dev'
import shareImage from '../assets/img/banner.png'
export default {
  name: '',
  data () {
    return {

    }
  },
  mounted () {
    setTimeout(() => {
      this.$native.share({
        name: '分享测试',
        desc: '将框架作为你的第一步可能不是最好的主意掌握好基础知识再来吧！之前有其它框架的使用经验会有帮助，但这不是必需的',
        url: `${HOST_ROUTER}/fifthAnniversary.html`,
        pic: `${HOST_ROUTER}${shareImage}`
      })
      let id = 1
      this.$server.userInfo(id).then((rs) => {
        console.log(rs)
      }).catch((ms) => {
        this.$native.showToast('错误了')
      })
    }, 30) // 原因：经验值浏览器处理时间大概为17，普通浏览器设置为20即可，保险原因webView中这里设置为30
  }
}
</script>

<style scope lang="less">
  .fifthAnniversary{
    .img{
      font-size:0;
      img{
        width: 100%;
      }
    }
  }
</style>
