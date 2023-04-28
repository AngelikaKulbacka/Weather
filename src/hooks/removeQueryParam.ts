import { Router } from 'vue-router';
import { set } from 'lodash-es';

/**
 * It takes a router and a query param name, and removes the query param from the current route
 * @param {Router} router - Router - the router object
 * @param {string} paramName - The name of the query parameter you want to remove.
 */
export const removeQueryParam = (router: Router, paramName: string) => {
  const _query = { ...router.currentRoute.value.query };
  set(_query, paramName, undefined);
  router.replace({
    ...router.currentRoute.value,
    query: {
      ..._query,
    },
  });
};
