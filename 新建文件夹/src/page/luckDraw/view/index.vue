<template>
  <div class="luckDraw" ref="luckDrawPage">
    <div class="luckDraw-box">
      <div class="banner">
        <div class="banner-img">
          <img src="http://testweichat.8518.com/json/images/banner.png" alt="">
        </div>
        <div class="banner-mask">
          <img src="http://testweichat.8518.com/json/images/mask.png" alt="">
        </div>
      </div>
      <div class="prizes">
        <h1 class="prizes-title">您还有<em class="mask-num">1</em>次抽奖机会</h1>
        <div class="prizes-box">

        </div>
      </div>
      <split></split>
      <div class="winning-show">
        <h1 class="winning-title">- 中奖名单 -</h1>
        <div class="winning-box" ref="winningBox">
          <ul class="winning-list">
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
            <li class="winning-item">
              <span class="phone-nub">123*****234</span>
              <span class="winning-name">燕窝礼盒</span>
              <span class="winning-time">2018-6-30 sad 08:00</span>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="active-rules">
        <h2 class="rules-title">活动规则</h2>
        <div class="text">
          <p class="rules-one">1.凡是于2018年9月22日 14:00-16:00活动现场的新老客户，均可获得一次抽奖机会</p>
          <p class="rules-two">2.在以上时间段内参与抽奖的客户均可获得对应奖品一份，可在现场指定地点领取奖品</p>
          <p class="rules-three">3.如对活动内容有疑问，可在现场咨询您的理财师</p>
        </div>
        <p class="statement">*本活动最终解释权在法律允许范围内归万和操作所有</p>
      </div>
    </div>
    <div class="share">立即分享</div>
  </div>
</template>

<script>
import {HOST_ROUTER} from '@/config/dev'
import split from '../common/split'
import BScroll from 'better-scroll'
// import shareImage from '../assets/img/banner.png'
export default {
  name: '',
  data () {
    return {

    }
  },
  components: {
    split
  },
  methods: {
    _scroll () {
      if (!this.$refs.luckDrawPage) { return }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.luckDrawPage, {click: this.click})
    },
    _scrollY () {
      if (!this.$refs.winningBox) { return }
      // better-scroll的初始化
      this.scrollyY = new BScroll(this.$refs.winningBox, {click: this.click, stopPropagation: true})
    }
  },
  mounted () {
    setTimeout(() => {
      this.$native.share({
        name: '分享测试',
        desc: '将框架作为你的第一步可能不是最好的主意掌握好基础知识再来吧！之前有其它框架的使用经验会有帮助，但这不是必需的',
        url: `${HOST_ROUTER}/fifthAnniversary.html`
        //        ,pic: `${HOST_ROUTER}${shareImage}`
      })
      let id = 1
      this.$server.userInfo(id).then((rs) => {
        console.log(rs)
      }).catch((ms) => {
        this.$native.showToast('错误了')
      })
      this.$server.luckDraw().then((rs) => {
        console.log('11')
        console.log(rs)
      }).catch((ms) => {
        this.$native.showToast('错误了')
      })
      this._scroll()
      this._scrollY()
    }, 30) // 原因：经验值浏览器处理时间大概为17，普通浏览器设置为20即可，保险原因webView中这里设置为30
  }
}
</script>

<style scope lang="less">
  .luckDraw{
    position: absolute;
    top:0;
    bottom:0;
    height:100%;
    width:100%;
    overflow: hidden;

    .luckDraw-box{
      padding-bottom:70px;
      .banner{
        position: relative;
        .banner-img{
          width:100%;
          height:234px;
          overflow: hidden;
          img{
            width:100%;
          }
        }
        .banner-mask{
          width:100%;
          height:38px;
          position: absolute;
          bottom:0;
          z-index: 100;
          img{
            width:100%;
            height:40px;
          }
        }
      }
      .prizes{
        margin-top: 22px;
        padding-bottom: 38px;
        .prizes-title{
          width:176px;
          height:30px;
          line-height:30px;
          margin: auto;
          box-shadow: 0 3px 10px silver;
          border-radius: 10px;
          background-color: #f1f1f1;
          text-align: center;
          font-size:18px;
          font-weight: 900;
          color: #4c2804;
          em{
            font-size: 24px;
            color: #fc851d;
          }
        }
      }
      .winning-show{
        padding: 20px 0;
        .winning-title{
          margin-bottom: 14px;
          text-align: center;
          font-size:18px;
        }
        .winning-box{
          max-height:184px;
          overflow: hidden;
          .winning-list{
            padding:0 15px;
            .winning-item{
              height:30px;
              line-height:30px;
              display: flex;
              text-align: center;
              font-size: 0;
              .phone-nub{
                width:120px;
                font-size: 10px;
              }
              .winning-name{
                flex:1;
                text-align: left;
                font-size: 10px;
              }
              .winning-time{
                width:145px;
                font-size: 10px;
              }
            }
            .winning-item:nth-child(odd)
            {
              background:#f8eed6;
            }
            .winning-item:nth-child(even)
            {
              background:#fffaf2;
            }
          }
        }
      }
      .active-rules{
        padding:22px 0;
        .rules-title{
          font-size:16px;
          text-align: center;
        }
        .text{
          margin-top: 18px;
          padding:0 15px;
          font-size:12px;
          font-weight: 600;
          line-height: 20px;
          color: #323232;
        }
        .statement{
          margin-top: 15px;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: #323232;
        }
      }
    }
    .share{
      position: absolute;
      bottom:0;
      width:100%;
      height:55px;
      line-height: 55px;
      font-size: 24px;
      text-align: center;
      background-color: #052d5e;
      color: #ffffff;
    }
  }
</style>
