import store from '@/store';

export default function tokenAuthInterceptor(axiosInstance) {
  axiosInstance.interceptors.request.use((request) => {
    // eslint-disable-next-line no-param-reassign
    request.headers.Authorization = `Bearer ${store.state.token}`;
    return request;
  });
}
