import store from '@/store';

export default async function guest({ next }) {
  if (store.state.token) return next('/');
  try {
    const response = await store.dispatch('refreshToken');
    if (!response.data) return next();
    return next('/');
  } catch (error) {
    return next();
  }
}
