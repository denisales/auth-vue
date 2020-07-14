import Vue from 'vue';
import VueRouter from 'vue-router';
import middlewarePipeline from './middlewarePipeline';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(middlewarePipeline);

export default router;
