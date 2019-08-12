import App from './App.vue'
import Axios from 'axios';
// import router from './router'
// import store from './store'

Vue.config.productionTip = false

async function appInit() {
  const res = await Axios.get(API + '/v3.0.0/index/homepage');
  console.log(res);
  new Vue({
    // router,
    // store,
    render: h => h(App)
  }).$mount('#app')
}


appInit();