import { useGlobal } from '@store/useGlobal';
import { Modal } from 'ant-design-vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

let globalState: ReturnType<typeof useGlobal>;
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, right: 0 };
    }
  },
});

router.beforeEach(() => {
  globalState = globalState || useGlobal();

  globalState.changeLoading(false);
  Modal.destroyAll();
});

export default router;
