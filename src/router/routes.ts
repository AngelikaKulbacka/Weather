import { RouteRecordRaw } from 'vue-router';
import { pagePath } from '@paths/page.path';

// Template
import DefaultTemplate from '@components/templates/Default/Default.vue';

// Pages
import Page404 from '@pages/404/404.vue';
import Home from '@pages/Home/Home.vue';
import HelloWorld from '@pages/HelloWorld/HelloWorld.vue';
import WeatherForm from '@pages/Weather/WeatherForm.vue';

const routes: RouteRecordRaw[] = [
  // outside
  {
    path: pagePath.base.pathname,
    component: DefaultTemplate,
    children: [
      {
        path: pagePath.base.pathname,
        redirect: pagePath.helloWorld.pathname,
      },
      {
        path: pagePath.home.pathname,
        name: 'home',
        component: Home,
      },

      {
        path: pagePath.helloWorld.pathname,
        name: 'helloWorld',
        component: HelloWorld,
      },

      {
        path: '/weather',
        name: 'weather',
        component: WeatherForm,
        props: true,
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: Page404,
  },
];

export default routes;
