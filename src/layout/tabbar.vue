<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
    <div class="layout-footer">
      <van-tabbar
        fixed
        route
        v-model="active"
      >
        <van-tabbar-item
          v-for="(tab, index) in tabs"
          :to="tab.to"
          :icon="tab.icon"
          :key="index"
        >{{ tab.title }}</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0,
        tabs: [{
            title: '大厅',
            to: { name: 'Home' },
            icon: 'home-o'
          },
          {
            title: '用户',
            to: { name: 'User' },
            icon: 'user-o'
          }
        ]
      }
    }
  }
</script>
