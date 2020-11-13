import Vue from 'vue'
import SvgSprite from 'vue-svg-sprite';
import VModal from 'vue-js-modal';
import App from './App.vue'
import '@/styles/app.scss'
import router from './router'
import store from './store'
import axios from 'axios';
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import cookie from 'js-cookie';
import Notifications from 'vue-notification';
import vuescroll from 'vuescroll';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
  const token = cookie.get('YTT_JWT');
  
  if(token)
    config.headers.Authorization = `Bearer ${token}`;
  
  return config;
});

axios.interceptors.response.use(
  null,
  error => {
  if(error.response.status === 401
    && error.response.data.message === 'Unauthenticated.'
    && error.response.config.url.split('/').reverse()[0] !== 'logout')
    store.dispatch('Auth/logout');
  
  return Promise.reject(error);
});


import UBtn from "@/components/common/UBtn";

Vue.use(SvgSprite, {
  url: '/sprite.svg',
});

Vue.use(VModal);
Vue.use(Notifications);
Vue.use(vuescroll);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('UBtn', UBtn);

extend('isTrue', {
  validate: value => value === true,
  message: '{filed} is required'
});

Vue.config.productionTip = false

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
