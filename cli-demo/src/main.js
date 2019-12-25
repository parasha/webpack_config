import App from './App.vue'
import Axios from 'axios';
import router from './router'
import store from './store'

Vue.config.productionTip = false;

// 后退时刷新页面
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    location.reload();
  }
});

async function appInit() {
  const res = await Axios.get(API + '/v3.0.0/index/homepage');
  console.log(res);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}


appInit();