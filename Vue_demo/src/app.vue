<template>
  <div id='app'>
    <Slide></Slide>
    <router-view></router-view>
  </div>
</template>

<script>
import Slide from './components/slide/index.vue';

export default {
  data () {
    return {
    }
  },
  props:{
    bar: String
  },
  components:{
    Slide
  },
  created:function(){
    
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
