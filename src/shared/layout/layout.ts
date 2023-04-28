import { App, Component, createApp } from 'vue';
// @ts-ignore - build error
import overrides from '@root/overrides';

// style
import '@styles/base/antd.less';
import { setTwoToneColor } from '@ant-design/icons-vue';

// Vue Packages
import Antd from 'ant-design-vue';
import { VUE_QUERY_CLIENT, QueryClient } from 'vue-query';
import { createPinia } from 'pinia';

// dayjs
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import utc from 'dayjs/plugin/utc';
import locale_pl from 'dayjs/locale/pl';

dayjs.extend(isToday);
dayjs.extend(utc);
dayjs.locale(locale_pl);

// internal imports
import router from '@router/index';
import i18n from '@resources';

const createEntry = (
  rootComponent: Component,
  selector: string,
  additionalConfi?: (app: App) => void
): App => {
  const app = createApp(rootComponent);

  setTwoToneColor([overrides['primary-color'], 'rgba(0,0,0,0)']);

  //#region region plugins/extensions
  app.provide(
    VUE_QUERY_CLIENT,
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          retryDelay: (attemptIndex: number) =>
            Math.min(1000 * 3 ** attemptIndex, 30000),
        },
      },
    })
  );
  app.use(Antd);
  app.use(createPinia());
  app.use(router);
  app.use(i18n);
  //#endregion

  if (additionalConfi instanceof Function) {
    additionalConfi(app);
  }
  app.mount(selector);

  return app;
};

export default createEntry;
