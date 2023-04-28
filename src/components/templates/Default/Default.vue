<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-row :gutter="24">
        <a-col flex="84px">
          <CImage src="/public/logo.png" class="logo" :href="home" />
        </a-col>
        <a-col flex="auto">
          <a-menu theme="dark" mode="horizontal">
            <a-menu-item key="home" @click="handleHome">Home</a-menu-item>
            <a-menu-item key="helloWorld" @click="handleHelloWorld">
              Hello World
            </a-menu-item>
          </a-menu>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
            <KeepAlive>
              <Suspense>
                <Container size="lg">
                  <component :is="Component"></component>
                </Container>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </RouterView>
    </a-layout-content>

    <a-layout-footer class="footer">
      <a-typography-text strong>Made with ❤ and 🍕</a-typography-text>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
//#region vendor
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
//#endregion
//#region internal
import { pagePath } from '@paths/page.path';
import CImage from '@components/atoms/Image/Image.vue';
import Container from '@components/atoms/Container/Container.vue';
//#endregion

export default defineComponent({
  name: 'DefaultTemplate',
  components: { CImage, Container },
  setup() {
    const { t } = useI18n();
    const router = useRouter();

    const handleHome = () => {
      router.push(pagePath.home.pathname);
    };
    const handleHelloWorld = () => {
      router.push(pagePath.helloWorld.pathname);
    };

    return { t, handleHome, handleHelloWorld };
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

.layout {
  min-height: 100vh;
}

.logo {
  height: 36px;
}

.footer {
  display: flex;
  justify-content: center;
}
</style>
