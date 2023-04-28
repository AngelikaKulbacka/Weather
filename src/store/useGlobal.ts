import { defineStore } from 'pinia';

type TGlobalState = {
  loading: boolean;
  error: string | boolean;
  success: string | boolean;
  warning: string | boolean;
};

export const useGlobal = defineStore('global', {
  state: (): TGlobalState => {
    return {
      loading: false,
      error: false,
      success: false,
      warning: false,
    };
  },
  actions: {
    changeLoading(payload?: boolean) {
      this.loading = payload === undefined ? !this.loading : payload;
    },
  },
});
