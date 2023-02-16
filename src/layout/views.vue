<template>
  <div>
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view ref="routerView" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" ref="routerView" />
  </div>
</template>

<script>
  export default {
    name: 'ViewsLayout',
    data() {
      return {}
    }
  }
</script>
