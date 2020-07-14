import router from '@/router';
import store from '@/store';

export default function refreshAuthInterceptor(failedRequest) {
  return new Promise((resolve, reject) => {
    store.dispatch('refreshToken').then((tokenRefreshResponse) => {
      const { token } = tokenRefreshResponse.data;
      if (!token) {
        router.push('/login');
        return reject(failedRequest);
      }

      const tokenHeader = `Bearer ${token}`;
      // eslint-disable-next-line no-param-reassign
      failedRequest.response.config.headers.Authorization = tokenHeader;

      return resolve(tokenRefreshResponse);
    }).catch(() => {
      router.push('/login');
      return reject(failedRequest);
    });
  });
}
