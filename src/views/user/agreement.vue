<template>
  <div>
    <van-nav-bar
      :title="$route.meta.title"
      fixed
      placeholder
      safe-area-inset-top
    />

    <div class="fixed-bottom p_2">
      <a-button
        type="primary"
        block
        @click="clickBtn"
      >我已阅读并同意</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      clickBtn() {
        this.$root.$emit('agree', true)
        this.$router.back()
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
</style>
