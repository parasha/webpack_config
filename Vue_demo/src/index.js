
import app from './app.vue';


// import router from './router';
import scroll_load from './common/scroll_load'
Vue.use(scroll_load);


Axios.get(API + '/v3.0.0/index/homepage').then(res => {
  console.log(res);
});
new Vue({
  render: h => h(app, {
    props: {}
  }),
  // router,
}).$mount('#app');


