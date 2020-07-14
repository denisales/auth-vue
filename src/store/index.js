import Vue from 'vue';
import Vuex from 'vuex';
import { refreshTokenService, loginService, logoutService } from '@/services/authService';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: null,
    jwtTokenExpiry: null,
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload.token;
      state.jwtTokenExpiry = payload.jwtTokenExpiry;
    },
    CLEAR_TOKEN: (state) => {
      state.token = null;
      state.jwtTokenExpiry = null;
    },
  },
  actions: {
    async login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const { email, password } = payload;
        loginService({ email, password }).then((response) => {
          const { token, jwt_token_expiry: jwtTokenExpiry } = response.data;
          commit('SET_TOKEN', { token, jwtTokenExpiry });
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    async logout({ commit }) {
      return new Promise((resolve, reject) => {
        logoutService().then((response) => {
          commit('CLEAR_TOKEN');
          window.localStorage.setItem('logout', Date.now());
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    refreshToken({ commit }) {
      return new Promise((resolve, reject) => {
        refreshTokenService().then(async (response) => {
          if (!response.data) {
            commit('CLEAR_TOKEN');
            return reject(response);
          }
          const { token, jwt_token_expiry: jwtTokenExpiry } = response.data;
          commit('SET_TOKEN', { token, jwtTokenExpiry });
          return resolve(response);
        }).catch((err) => {
          window.localStorage.setItem('logout', Date.now());
          commit('CLEAR_TOKEN');
          return reject(err);
        });
      });
    },
  },
  modules: {
  },
});
