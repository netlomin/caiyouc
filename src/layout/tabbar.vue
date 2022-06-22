<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <van-tabbar fixed route v-model="active" @change="changeTab">
        <van-tabbar-item v-for="(tab, index) in tabs" :to="tab.to" :icon="tab.icon" :key="index">
          {{ tab.title }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppLayout',
    components: {},
    data() {
      return {
        active: 0,
        tabs: [{
            title: '首页',
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
    },
    methods: {
      changeTab(v) {
        console.log('tab value:', v)
      }
    }
  }
</script>
