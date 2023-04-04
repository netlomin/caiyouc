<template>
  <div class="bg">
    <van-nav-bar
      v-if="$route.meta.nav"
      :title="$route.meta.title"
      left-arrow
      fixed
      placeholder
      safe-area-inset-top
      @click-left="_back"
    />
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive"
        ref="routerView"
      />
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive"
      ref="routerView"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      _back() {
        let f = this.$refs.routerView.customBack
        if (f) f()
        else this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
  }
</style>