<template>
  <component
    :is="href ? 'router-link' : 'div'"
    class="image-container"
    :class="{
      'image-container--with-aspect': ratio !== 'auto',
      'image-container--rounded': rounded,
    }"
    v-bind="href && { to: href }">
    <div v-if="renderFallbackSlot">
      <slot name="fallback"></slot>
    </div>
    <a-image
      v-else
      :src="src"
      :preview="preview"
      :fallback="fallback"
      @error="handleError">
      <template #placeholder>
        <a-image :src="placeholder" :preview="false" />
      </template>
    </a-image>
  </component>
</template>

<script lang="ts">
//#region vendor
import { defineComponent, PropType, ref } from 'vue';
//#endregion
//#region internal
//#endregion

type TAspectRatio =
  | '16/9'
  | '9/16'
  | '4/3'
  | '3/4'
  | '21/9'
  | '9/21'
  | '3/2'
  | '2/3'
  | '1/1'
  | 'auto'
  | string;

const DEFAULT_IMG = '/public/img/placeholder.png';

export default defineComponent({
  name: 'WImage',
  components: {},
  props: {
    href: {
      type: String,
      default: undefined,
    },
    src: {
      type: String,
      default: undefined,
      required: true,
    },
    fallback: {
      type: String,
      default: DEFAULT_IMG,
    },
    placeholder: {
      type: String,
      default: DEFAULT_IMG,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    ratio: {
      type: String as PropType<TAspectRatio>,
      default: 'auto',
    },
  },
  setup(props, { slots }) {
    const renderFallbackSlot = ref(false);
    const handleError = () => {
      if ('fallback' in slots) {
        renderFallbackSlot.value = true;
      }
    };

    return {
      renderFallbackSlot,
      handleError,
    };
  },
});
</script>

<style lang="less" scoped>
@import '@styles/base/variables.less';
@import '@styles/base/mixins.less';

.image-container {
  width: 100%;
  height: 100%;
  display: inline-block;
  :deep(.ant-image) {
    position: relative;
    width: 100%;
    height: 100%;

    .ant-image-img {
      min-width: 100%;
      min-height: 100%;
      height: 100%;
      object-fit: contain;
    }

    .ant-image-placeholder {
      .ant-image {
        display: flex;
      }

      .ant-image-img {
        object-fit: contain;
      }
    }
  }

  &--with-aspect {
    :deep(.ant-image) {
      aspect-ratio: v-bind(ratio);

      .ant-image-img {
        aspect-ratio: v-bind(ratio);
      }
    }
  }

  &--rounded {
    :deep(.ant-image) {
      .ant-image-mask,
      .ant-image-img {
        border-radius: @image-border-radius;
      }
    }
  }
}
</style>
