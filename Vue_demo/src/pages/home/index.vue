<template>
  <div>
    {{$store.state.count}}
    <button @click="add">按钮</button>
    <router-link to="/about?name=about">about</router-link>
    <router-link :to="{ name: 'user', params: { name: 'user' }}">User</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log("home created");
  },
  mounted: function() {
    console.log("options", this.$options);
  },
  methods: {
    add() {
      this.$store.commit("increment");
    }
  }
};
</script>

<style lang="less" scoped>
</style>
