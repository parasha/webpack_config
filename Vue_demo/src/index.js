import Vue from 'vue'

import app from './app.vue'
console.log('页面加载开始')
new Vue({
    render: h => h(app),
}).$mount('#app')
console.log('页面加载结束')