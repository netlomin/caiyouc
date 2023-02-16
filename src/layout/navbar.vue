<template>
  <div>
    <van-nav-bar :title="$route.meta.title" left-arrow fixed placeholder safe-area-inset-top @click-left="_back" />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" ref="routerView" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" ref="routerView" />
  </div>
</template>

<script>
  export default {
    name: 'NavBarLayout',
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
