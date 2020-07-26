import devtools from '@vue/devtools'; // eslint-disable-line
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

if (process.env.NODE_ENV === 'development') {
  devtools.connect(/* host, port */);
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
