import store from '@/store';

export default function auth({ next }) {
  if (!store.state.token) {
    return next('/login');
  }
  return next();
}
