<template>
  <div id="app">
    app
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
html,body{
  margin: 0;
  padding: 0;
}
#app{
  background: url('./assets/bg.png') no-repeat top center;
  background-size: 100% 100%;
}
</style>
