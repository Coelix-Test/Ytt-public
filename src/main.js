import Vue from 'vue'
import SvgSprite from 'vue-svg-sprite';
import VModal from 'vue-js-modal';
import App from './App.vue'
import '@/config/env';
import '@/config/preferences';
import '@/styles/app.scss'
import router from './router'
import store from './store'
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

Vue.use(SvgSprite, {
  url: '/sprite.svg',
});

Vue.use(VModal);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

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
