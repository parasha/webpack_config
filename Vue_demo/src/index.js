import Vue from 'vue';
import app from './app.vue';

import Axios from 'axios';
Vue.prototype.$http = Axios;

// import router from './router';
import scroll_load from './common/scroll_load'
Vue.use(scroll_load);

async function main() {
  new Vue({
    render: h => h(app, {
      props: {}
    }),
    // router,
  }).$mount('#app');
}

main();

