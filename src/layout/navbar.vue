<template>
  <div>
    <van-nav-bar :title="$route.meta.title" left-arrow fixed placeholder safe-area-inset-top @click-left="_back" />
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view ref="routerView"></router-view>
    </keep-alive>
    <router-view v-else ref="routerView"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'NavBarLayout',
    components: {},
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
