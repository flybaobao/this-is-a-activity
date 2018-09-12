<template>
  <div>
    <a href="./index.html">去活动页1</a>
    <div class="index">我是test的index组件</div>
    <router-link to="/list">GO list go</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="less">
  .index{
    color: red;
    font-size: 30px;
  }
  a{
    font-size: 18px;
  }
</style>
