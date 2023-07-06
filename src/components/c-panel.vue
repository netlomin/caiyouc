<template>
  <div
    class="c-panel"
    :style="{
  		borderRadius: radius + 'px',
  		margin: margin,
  		boxShadow: shadow,
      backgroundColor: bg
  	}"
  >
    <div
      v-if="$slots.head"
      class="c-panel__head"
      :style="[{padding: padding}, headStyle]"
    >
      <slot name="head" />
    </div>
    <div
      class="c-panel__body"
      :style="[{padding: padding}, bodyStyle]"
    >
      <slot />
    </div>
    <div
      v-if="$slots.foot"
      class="c-panel__foot"
      :style="[{padding: padding}, footStyle]"
    >
      <slot name="foot" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'c-panel',
    props: {
      padding: { type: String, default: '0.2rem' },
      margin: { type: String, default: "0" },
      bg: { type: String, default: '#FFF' },
      radius: { type: Number, default: 0 },
      shadow: { type: String, default: 'none' },
      headStyle: { type: Object, default: () => {} },
      bodyStyle: { type: Object, default: () => {} },
      footStyle: { type: Object, default: () => {} }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .c-panel {
    position: relative;
    overflow: hidden;
    font-size: $font-md;
    box-sizing: border-box;

    &__head {
      border-bottom: 1px solid #f1f6f8;
    }

    &__body {}

    &__foot {
      border-top: 1px solid #f1f6f8;
    }
  }
</style>
