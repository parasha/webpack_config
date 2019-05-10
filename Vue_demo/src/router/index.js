import Vue from 'vue';
import vue_router from 'vue-router';

import Home from '../pages/home/index.vue'

Vue.use(vue_router);

const router = new vue_router({
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})

export default router;