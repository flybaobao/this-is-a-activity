<template>
  <div class="luckDraw" ref="luckDrawPage">
    <div class="luckDraw-box">
      <div class="banner">
        <div class="banner-img">
          <img :src="banner" alt="">
        </div>
        <div class="banner-mask">
          <img :src="mask" alt="">
        </div>
      </div>
      <div class="prizes" v-if="insideData">
        <h1 class="prizes-title">您还有<em class="mask-num">{{flag?drawNum : 0}}</em>次抽奖机会</h1>
        <div class="prizes-box">
          <ul class="prizes-list"  v-if="luckDrawData">
            <li class="prizes-item" v-for="(item, index) in luckDrawData" :class="['c' + index , index == lottery? 'active': '']" :key="index">
              <img :src="item.img_url | setDefaultHead" alt="">
            </li>
            <div class="prizes-item star" :class="drawNum && flag?'':'remainNo'" @click="startLottery">
              <img :src="start" alt="">
            </div>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="winning-show">
        <h1 class="winning-title">- 中奖名单 -</h1>
        <div class="winning-box" ref="winningBox">
          <ul class="winning-list"   v-if="luckDrawList">
            <li class="winning-item"  v-for="(item, index) in luckDrawList" :key="index">
              <span class="phone-nub">{{item.phone}}</span>
              <span class="winning-name">{{item.gift_title}}</span>
              <span class="winning-time">{{item.upate_time | formatDate}}</span>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="active-rules">
        <h2 class="rules-title">活动规则</h2>
        <div class="text" v-if="insideData.rules">
          <p class="rules">{{insideData.rules['one']}}</p>
          <p class="rules">{{insideData.rules['two']}}</p>
          <p class="rules">{{insideData.rules['three']}}</p>
        </div>
        <p class="statement">*本活动最终解释权在法律允许范围内归万和操作所有</p>
      </div>
    </div>
    <Alert v-model="showFlag" title="恭喜您获得:"  @on-hide="onHide">{{getDraw.gift_title}}</Alert>
    <div class="share" v-if="flag" @click="shares">立即分享</div>
  </div>
</template>

<script>
import {HOST_ROUTER} from '@/config/dev'
import split from '../common/split'
import BScroll from 'better-scroll'
import { Alert } from 'vux'
import Vue from 'vue'
import api from '../api/api'
import utils from '@/common/js/utils'
// import shareImage from '../assets/img/banner.png'
export default {
  name: '',
  data () {
    return {
      insideData: {},
      luckDrawData: [],
      luckDrawList: [],
      drawNum: 0,
      start: '',
      banner: '',
      mask: '',
      lottery: null,
      flag: false,
      login: '',
      showFlag: false,
      getDraw: {},
      clickMark: true,
      num: 1
    }
  },
  filters: {
    setDefaultHead (src) {
      return utils.setDefaultHead(src)
    },
    formatDate (src) {
      return utils.formatDate(src)
    }
  },
  components: {
    split,
    Alert
  },
  methods: {
    _getData () {
      this.$server.luckDraw(this.num).then((rs) => {
        if (rs.data) {
          this.luckDrawData = rs.data.gift_list
          this.luckDrawList = rs.data.prize_winner
          this.drawNum = rs.data.remain_number
        }
      }).catch((ms) => {
        this.$native.showToast('错误了111')
      })
    },
    startLottery () {
      if (this.drawNum) {
        if (this.clickMark) {
          this.clickMark = false
          if (this.flag) {
            if (this.login !== '' && this.login !== null) {
              this.$server.getDrawId(this.num).then((rs) => {
                this.getDraw = rs.data
                this.$nextTick(() => {
                  this._racingHorse(this.getDraw.gift_id)
                })
              }).catch((ms) => {
                this.$native.showToast('错误了2222')
              })
            } else {
              // 去登录
              this.$native.goBack()
              this.$native.toLogin()
            }
          } else {
            // 去下载页
            window.location.href = 'https://app.8518.com/wap/download/buyer'
          }
        }
      }
    },
    onHide () {
      // location.reload()
    },
    shares () {
      if (this.login !== '' && this.login !== null) {
        this.$native.app_share({
          name: '燕窝福利大抽奖',
          desc: '燕窝福利大抽奖 -人人参与，100%中奖-',
          url: `${HOST_ROUTER}/luckDraw.html?draw_prize_id=${this.num}`,
          pic: this.banner
        })
      } else {
        this.$native.goBack()
        this.$native.toLogin()
      }
    },
    _racingHorse (id) {
      let current = 1
      let change = (end) => {
        let size = 3 * 8 + end
        let speed = 10 * current
        setTimeout(() => {
          this.lottery = current % 8
          current++
          if (current < size) {
            change(end)
          } else {
            this.drawNum--
            this._getData()
            this.clickMark = true
            setTimeout(() => {
              this.showFlag = true
            }, 500)
          }
        }, speed)
      }
      change(id)
    },
    _scroll () {
      if (!this.$refs.luckDrawPage) { return }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.luckDrawPage, {click: true})
    },
    _scrollY () {
      if (!this.$refs.winningBox) { return }
      // better-scroll的初始化
      this.scrollyY = new BScroll(this.$refs.winningBox, {click: true, stopPropagation: true})
    },
    _imgHandle (img) {
      return api.imgUrl(img)
    }
  },
  created () {
    this.num = utils.getUrlKey('draw_prize_id')
    let url = api.url('' + this.num)
    Vue.http.get(url).then((rs) => {
      if (rs.data) {
        this.insideData = rs.data.data
        this.start = this._imgHandle(this.insideData.start)
        this.banner = this._imgHandle(this.insideData.bannerUrl)
        this.mask = this._imgHandle(this.insideData.maskUrl)
      }
    })
  },
  mounted () {
    this.flag = utils.getUrlKey('isApp') === 'true' ? !this.flag : this.flag
    this.login = utils.getUrlKey('token')
    setTimeout(() => {
      this.$native.share({
        name: '燕窝福利大抽奖',
        desc: '燕窝福利大抽奖 -人人参与，100%中奖-',
        url: `${HOST_ROUTER}/luckDraw.html?draw_prize_id=${this.num}`,
        pic: this.banner
      })
      this._getData()
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
    left:0;
    right:0;
    height:100%;
    max-width: 800px;
    min-width: 300px;
    margin: auto;
    overflow: hidden;

    .luckDraw-box{
      padding-bottom:70px;
      .banner{
        position: relative;
        .banner-img{
          width:100%;
          height:234px;
          overflow: hidden;
          @media screen and(min-width: 300px)and(max-width: 375px){
            height:234px;
          }
          @media screen and(min-width: 375px)and(max-width: 550px){
            height:338px;
          }
          @media screen and(min-width: 550px){
            height:400px;
          }
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
          width:200px;
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
        .prizes-box{
          margin: auto;
          margin-top: 20px;
          height:342px;
          width:340px;
          @media screen and(min-width: 300px)and(max-width: 320px){
            width:300px;
            height:300px;
          }
            .prizes-list{
            position: relative;
            height:100%;
            .prizes-item{
              position: absolute;
              width:109px;
              height:109px;
              @media screen and(min-width: 300px)and(max-width: 320px){
                width:90px;
                height:90px;
              }
              border-radius: 3px;
              background-color: #fce7b7;
              overflow: hidden;
              img{
                width:100%;
                height:100%;
              }
              &.active{
                box-sizing: border-box;
                border:2px solid #fc851d;
              }
              &.c0{
                left:0;
                top:0;
              }
              &.c1{
                left:0;
                right: 0;
                top:0;
                margin: 0 auto;
              }
              &.c2{
                right:0;
                top:0;
              }
              &.c3{
                top:0;
                bottom:0;
                right:0;
                margin: auto 0;
              }
              &.c4{
                bottom:0;
                right:0;
              }
              &.c5{
                bottom:0;
                right:0;
                left:0;
                margin: 0 auto;
              }
              &.c6{
                bottom:0;
                left:0;
              }
              &.c7{
                bottom:0;
                top:0;
                left:0;
                margin:auto 0;
              }
              &.star{
                bottom:0;
                top:0;
                left:0;
                right:0;
                margin:auto;
                text-align: center;
                background-color: #fc851d;
                img{
                  width:50px;
                  height:50px;
                  margin-top: 28px;
                  @media screen and(min-width: 300px)and(max-width: 320px){
                    width:40px;
                    height:40px;
                    margin-top: 20px;
                  }
                }
              }
              &.remainNo{
                background-color: #999999;
              }
            }
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
          max-height:300px;
          overflow: hidden;
          .winning-list{
            padding:0 15px;
            .winning-item{
              height:40px;
              line-height:40px;
              display: flex;
              text-align: center;
              font-size: 0;
              .phone-nub{
                width:120px;
                font-size: 14px;
              }
              .winning-name{
                flex:1;
                text-align: left;
                font-size: 14px;
              }
              .winning-time{
                width:145px;
                font-size: 14px;
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
          font-size:14px;
          font-weight: 600;
          line-height: 20px;
          color: #323232;
          .rules{
            margin-top: 10px;
          }
        }
        .statement{
          margin-top: 15px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          color: #323232;
        }
      }
    }
    .showDraw{
      position: absolute;
      bottom:0;
      top:0;
      left:0;
      right:0;
      text-align: center;
      margin: auto;
      width:200px;
      height:200px;
      line-height: 200px;
      z-index: 99;
      background-color: red;
      color: white;
      font-size: 24px;
    }
    .weui-dialog__btn_primary{
      color: #333;
      font-size:20px;
      font-weight: 900;
    }
    .weui-dialog__bd{
      margin-top: 10px;
      color: red;
      font-size: 24px;
      font-weight: 900;
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
