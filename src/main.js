import Vue from 'vue'

import SvgSprite from 'vue-svg-sprite';
Vue.use(SvgSprite, {
  url: '/sprite.svg',
});

import VModal from 'vue-js-modal';
Vue.use(VModal);

import App from './App.vue'

import '@/config/env';
import '@/config/preferences';

import '@/styles/app.scss'

import router from './router'
import store from './store'

Vue.config.productionTip = false

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
