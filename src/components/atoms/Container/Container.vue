<template>
  <div
    :class="[
      'c-container',
      size && `c-container--${size}`,
      xs && `c-container--${xs}-from-xs`,
      sm && `c-container--${sm}-from-sm`,
      md && `c-container--${md}-from-md`,
      lg && `c-container--${lg}-from-lg`,
      noPadding && 'c-container--no-padding',
    ]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
//#region vendor
import { computed, defineComponent, PropType } from 'vue';
//#endregion
//#region internal
import { isObject, isString } from 'lodash-es';
//#endregion

export type TContainerSize = 'xs' | 'sm' | 'md' | 'lg';

export default defineComponent({
  name: 'CContainer',
  props: {
    size: {
      type: String as PropType<TContainerSize>,
      default: undefined,
    },
    xs: {
      type: String as PropType<TContainerSize>,
      default: undefined,
    },
    sm: {
      type: String as PropType<TContainerSize>,
      default: undefined,
    },
    md: {
      type: String as PropType<TContainerSize>,
      default: undefined,
    },
    lg: {
      type: String as PropType<TContainerSize>,
      default: undefined,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const containerClasses = computed(() => {
      const classes: string[] = [];

      if (isString(props.size)) {
        classes.push(`c-container--${props.size}`);
      } else if (isObject(props.size)) {
        Object.entries(props.size).forEach(([key, value]) =>
          classes.push(`c-container--${value}-from-${key}`)
        );
      }

      return classes;
    });

    return { containerClasses };
  },
});
</script>

<style lang="less" scoped>
@import '@styles/base/variables.less';
@import '@styles/base/mixins.less';

.c-container {
  margin: 0 auto;
  padding: 0 @padding-md;
  width: 100%;
}

.c-container--xs {
  max-width: @max-width-xs;

  &-from-xs {
    @media only screen and (min-width: @screen-xs) {
      max-width: @max-width-xs;
    }
  }
  &-from-sm {
    @media only screen and (min-width: @screen-sm) {
      max-width: @max-width-xs;
    }
  }
  &-from-md {
    @media only screen and (min-width: @screen-md) {
      max-width: @max-width-xs;
    }
  }
  &-from-lg {
    @media only screen and (min-width: @screen-lg) {
      max-width: @max-width-xs;
    }
  }
}

.c-container--sm {
  max-width: @max-width-sm;

  &-from-xs {
    @media only screen and (min-width: @screen-xs) {
      max-width: @max-width-sm;
    }
  }
  &-from-sm {
    @media only screen and (min-width: @screen-sm) {
      max-width: @max-width-sm;
    }
  }
  &-from-md {
    @media only screen and (min-width: @screen-md) {
      max-width: @max-width-sm;
    }
  }
  &-from-lg {
    @media only screen and (min-width: @screen-lg) {
      max-width: @max-width-sm;
    }
  }
}

.c-container--md {
  max-width: @max-width-md;

  &-from-xs {
    @media only screen and (min-width: @screen-xs) {
      max-width: @max-width-md;
    }
  }
  &-from-sm {
    @media only screen and (min-width: @screen-sm) {
      max-width: @max-width-md;
    }
  }
  &-from-md {
    @media only screen and (min-width: @screen-md) {
      max-width: @max-width-md;
    }
  }
  &-from-lg {
    @media only screen and (min-width: @screen-lg) {
      max-width: @max-width-md;
    }
  }
}

.c-container--lg {
  max-width: @max-width-lg;

  &-from-xs {
    @media only screen and (min-width: @screen-xs) {
      max-width: @max-width-lg;
    }
  }
  &-from-sm {
    @media only screen and (min-width: @screen-sm) {
      max-width: @max-width-lg;
    }
  }
  &-from-md {
    @media only screen and (min-width: @screen-md) {
      max-width: @max-width-lg;
    }
  }
  &-from-lg {
    @media only screen and (min-width: @screen-lg) {
      max-width: @max-width-lg;
    }
  }
}

.c-container--no-padding {
  padding: 0;
}
</style>
