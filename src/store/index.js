import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import Application from '@/store/application.store';
// import CurrentUser from '@/store/current-user.store';
import Auth from '@/store/auth';
// import WindowWidth from '@/store/window-width.store';

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING(state, payload){
      state.loading = payload;
    }
  },
  actions: {
  },
  getters: {
    loading: (state, getters) => state.loading || getters['Auth/userIsFetching']
  },
  modules: {
    Application,
    Auth
  }
})
