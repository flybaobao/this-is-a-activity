<template>
  <div>
    <a href="./index.html">去活动页1</a>
    <div class="index">我是test的list组件</div>
    <router-link to="/">GO Index</router-link>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index{
    color: red;
    font-size: 30px;
  }
  a{
    font-size: 18px;
  }
</style>
