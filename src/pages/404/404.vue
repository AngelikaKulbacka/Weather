<template>
  <a-result status="404" title="404" :sub-title="t('neutral.errorMessage')">
    <template #extra>
      <router-link :to="home">
        <a-button>{{ t('pages.404.backToDashboard') }}</a-button>
      </router-link>
    </template>
  </a-result>
</template>

<script lang="ts">
//#region vendor
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
//#endregion
//#region internal
import { pagePath } from '@paths/page.path';
//#endregion

export default defineComponent({
  name: 'PPage404',
  components: {},
  setup() {
    const { t } = useI18n();

    return { t };
  },
  data() {
    return {
      home: pagePath.home.pathname,
    };
  },
});
</script>

<style lang="less" scoped>
@import '@styles/base/variables.less';
@import '@styles/base/mixins.less';
</style>
