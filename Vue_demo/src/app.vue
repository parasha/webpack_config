<template>
  <div id="app" >
    <ul class="list" v-scroll-load="load">
      <li class="list-item">1</li>
      <li class="list-item">2</li>
      <li class="list-item">3</li>
      <li class="list-item">4</li>
      <li class="list-item">5</li>
      <li class="list-item">6</li>
      <li class="list-item">7</li>
      <li class="list-item">8</li>
      <li class="list-item">9</li>
      <li class="list-item">10</li>
      <li class="list-item">11</li>
      <li class="list-item">12</li>
      <li class="list-item">13</li>
    </ul>
  </div>
</template>

<script>
// import Slide from './components/slide/index.vue';

export default {
  data() {
    return {};
  },
  props: {
    bar: String
  },
  created: function() {},
  methods: {
    load: function() {
      console.log("do loading...");
    }
  }
};
</script>

<style lang="less">
.list {
  background-color: white;
  display: block;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  .list-item {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #999999;
    text-align: center;
    line-height: 144px;
  }
}
</style>
