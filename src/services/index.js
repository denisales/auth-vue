import Vue from 'vue';
import api from '@/services/api';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import refreshAuthInterceptor from '@/services/interceptors/refreshAuthInterceptor';
import tokenAuthInterceptor from '@/services/interceptors/tokenAuthInterceptor';

createAuthRefreshInterceptor(api, refreshAuthInterceptor);
tokenAuthInterceptor(api);

Vue.prototype.$http = api;

// import all in main.js
