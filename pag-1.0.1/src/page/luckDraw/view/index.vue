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
        <h1 class="prizes-title">您还有<em class="mask-num">{{drawNum}}</em>次抽奖机会</h1>
        <div class="prizes-box">
          <ul class="prizes-list"  v-if="luckDrawData">
            <li class="prizes-item" v-for="(item, index) in luckDrawData" :class="['c' + index , index == lottery? 'active': '']" :key="index">
              <img :src="item.img_url" alt="">
            </li>
            <div class="prizes-item star" @click="startLottery">
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
              <span class="winning-name">{{item.title}}</span>
              <span class="winning-time">{{item.upate_time}}</span>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="active-rules">
        <h2 class="rules-title">活动规则</h2>
        <div class="text" v-if="insideData.rules">
          <p class="rules-one">{{insideData.rules['one']}}</p>
          <p class="rules-two">{{insideData.rules['two']}}</p>
          <p class="rules-three">{{insideData.rules['three']}}</p>
        </div>
        <p class="statement">*本活动最终解释权在法律允许范围内归万和操作所有</p>
      </div>
    </div>
    <div class="showDraw" v-show="showFlag">
      <div class="tar" @click="close">X</div>
      恭喜你获得{{getDraw.gift_title}}
    </div>
    <div class="share" v-if="flag && login !== ''" @click="share">立即分享</div>
  </div>
</template>

<script>
import {HOST_ROUTER} from '@/config/dev'
import split from '../common/split'
import BScroll from 'better-scroll'
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
      lottery: 0,
      flag: false,
      login: '',
      showFlag: false,
      getDraw: {}
    }
  },
  components: {
    split
  },
  methods: {
    _getData () {
      let id = 1
      this.$server.userInfo(id).then((rs) => {
        console.log(rs)
      }).catch((ms) => {
        this.$native.showToast('错误了')
      })
      this.$server.luckDraw().then((rs) => {
        console.log(rs)
        this.luckDrawData = rs.data.gift_list
        this.luckDrawList = rs.data.prize_winner
        this.drawNum = rs.data.remain_number
      }).catch((ms) => {
        this.$native.showToast('错误了')
      })
    },
    startLottery () {
      console.log(utils.getUrlKey('isApp'))
      this.flag = utils.getUrlKey('isApp')
      this.login = utils.getUrlKey('token')
      if (this.flag) {
        if (this.login !== '') {
          this.$server.getDrawId().then((rs) => {
            console.log(rs)
            this.getDraw = rs.data
            this.$nextTick(() => {
              this._racingHorse(this.getDraw.gift_id)
            })
          }).catch((ms) => {
            console.log('111111')
            this.$native.showToast('错误了')
          })
        } else {
          // 去登录
        }
      } else {
        // 去下载页
      }
    },
    close () {
      this.showFlag = false
    },
    share () {

    },
    _racingHorse (id) {
      let current = 0
      let change = (end) => {
        let size = 3 * 8 + end
        let speed = 10 * current
        setTimeout(() => {
          console.log(current % 8)
          this.lottery = current % 8
          current++
          if (current <= size) {
            change(end)
          } else {
            this._getData()
            this.showFlag = true
          }
        }, speed)
      }
      change(id)
    },
    _scroll () {
      if (!this.$refs.luckDrawPage) { return }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.luckDrawPage, {click: this.click})
    },
    _scrollY () {
      if (!this.$refs.winningBox) { return }
      // better-scroll的初始化
      this.scrollyY = new BScroll(this.$refs.winningBox, {click: this.click, stopPropagation: true})
    },
    _imgHandle (img) {
      return api.imgUrl(img)
    }
  },
  created () {
    let url = api.url('1')
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
    setTimeout(() => {
      this.$native.share({
        name: '燕窝福利大抽奖',
        desc: '燕窝福利大抽奖 -人人参与，100%中奖-',
        url: `${HOST_ROUTER}/luckDraw.html`,
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
        .prizes-box{
          margin-top: 20px;
          height:342px;
          padding:0 15px;
          .prizes-list{
            position: relative;
            height:100%;
            .prizes-item{
              position: absolute;
              width:109px;
              height:109px;
              border-radius: 3px;
              background-color: #fce7b7;
              overflow: hidden;
              img{
                width:100%;
                height:100%;
              }
              &.active{
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
                }
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
      .tar{
        position: absolute;
        top:0;
        right:0;
        background-color: yellow;
        width:40px;
        height:40px;
        color: white;
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
