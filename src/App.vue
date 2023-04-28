<template>
  <div :class="{ 'spin-active': globalState.loading }">
    <a-config-provider :locale="locale">
      <a-spin
        size="large"
        :spinning="globalState.loading"
        class="global-spinner">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Transition mode="out-in">
              <KeepAlive>
                <Suspense>
                  <component :is="Component"></component>
                </Suspense>
              </KeepAlive>
            </Transition>
          </template>
        </RouterView>
      </a-spin>
    </a-config-provider>
  </div>
</template>

<script lang="ts">
//#region vendor
import { defineComponent } from 'vue';
import plPL from 'ant-design-vue/es/locale/pl_PL';
//#endregion
//#region internal
import { useGlobal } from '@store/useGlobal';
import { useI18n } from 'vue-i18n';
//#endregion

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const { t } = useI18n();
    const globalState = useGlobal();

    const locale = plPL;

    return { globalState, locale, t };
  },
});
</script>

<style lang="less" scoped>
@import '@styles/base/variables.less';
@import '@styles/base/mixins.less';

:deep(.ant-spin.global-spinner) {
  position: fixed;
  max-height: 100vh;
}
.spin-active {
  transition: z-index 0 linear;
  transition-delay: 0.3s;

  :deep(.ant-spin-nested-loading) {
    z-index: 1001;
  }
}
</style>

<style lang="less">
@import '@styles/base/variables.less';
@import '@styles/base/mixins.less';

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
