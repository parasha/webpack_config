<template>
  <div>
    <img src="./img/68362a61ly8fyl25xjymaj208c08cq4j.png">
    <p>{{bar}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props:{
    bar: String
  },
  created:function(){
    console.log('axios',this.$http)
    console.log('data',this.bar)
  },
  methods: {}
}
</script>

<style lang="less" scoped>
img{
    margin: 0 auto;
    transform: rotate(45deg);
}
</style>
