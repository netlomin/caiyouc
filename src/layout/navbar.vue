<template>
  <div class="app-container">
    <div class="layout-header">
      <van-nav-bar title="标题" right-text="按钮" left-arrow />
    </div>
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBarLayout',
    components: {},
    data() {
      return {}
    },
    methods: {}
  }
</script>
