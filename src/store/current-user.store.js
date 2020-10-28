import { AuthAPI } from '@/api';

export default {
  namespaced: true,
  state: {
    data: {},
    loaded: false,
    logged: false,
  },
  mutations: {
    auth(state, token) {
      state.logged = true;
      localStorage.setItem('auth', token);
      const auth = `Bearer ${token}`;
      env.API.defaults.headers.common['Authorization'] = auth;
    },
    saveData(state, data) {
      state.data = data;
    },
    logout(state, data) {
      state.data = {};
      state.logged = false;
      delete env.API.defaults.headers.common['Authorization'];
      localStorage.removeItem('auth');
    },
    load(state) {
      state.loaded = true;
    },
  },
  actions: {
    updateData({ commit }) {
      return AuthAPI.getCurrentUser().then(res => {
        commit('saveData', res.data);
        return res.data;
      });
    },
  },
  getters: {
    token(state) {
      return localStorage.getItem('auth');
    },
    auth(state, getters) {
      if(getters.token) {
        return `Bearer ${getters.token}`;
      } else {
        return null;
      }
    },
    isLogged(state) {
      return state.logged;
    },
    isLoaded(state) {
      return state.loaded;
    },
    data(state) {
      return state.data;
    },
    rolePrefix(state){

    },
  },
}