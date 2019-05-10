import Vue from 'vue'

import app from './app.vue'
console.log('页面加载开始')

async function bar() {
  return await 'bar'
}

async function foo() {
  const val = await bar()
  new Vue({
    render: h => h(app),
    props: {
      name: val
    }
  }).$mount('#app')
  console.log('页面加载结束')
}

foo()

