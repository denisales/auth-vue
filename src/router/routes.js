import Home from '../views/Home.vue';
import About from '../views/About.vue';

import guestMiddleware from './middlewares/guestMiddleware';
import authMiddleware from './middlewares/authMiddleware';
// import teste from './middlewares/teste';

const routes = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Home',
    component: Home,
    meta: {
      middleware: [guestMiddleware],
    },
  },
  {
    path: '/',
    name: 'About',
    component: About,
    meta: {
      middleware: [authMiddleware],
    },
  },
];

export default routes;
