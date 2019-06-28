<template>
  <div>
    Home
    <router-link to="/about?name=about">about</router-link>
    <router-link :to="{ name: 'user', params: { name: 'user' }}">User</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created() {
    console.log('home created')
  },
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
