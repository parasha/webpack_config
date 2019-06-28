import vue_router from 'vue-router';

import Home from '../pages/home/index.vue';
import User from '../pages/user/index.vue';
import About from '../pages/about/index.vue';

Vue.use(vue_router);

const router = new vue_router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: function (to, from, next) {
        console.log('beforeEnter', to, from);
        next();
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      props: true
    },
    {
      path: '/about',
      component: About,
      props: true
    },
  ]
})

export default router;