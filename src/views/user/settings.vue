<template>
  <div>
    <div class="m-t-8">
      <van-cell title="意见反馈" icon="service-o" size="large" is-link />
      <van-cell title="设置密码" icon="lock" size="large" is-link />
      <van-cell title="关于" :value="pkg.description+' v'+pkg.version" icon="home-o" size="large" />
    </div>

    <div class="fixed-bottom p_2">
      <a-button type="primary" block @click="clickLogoutBtn">退出登录</a-button>
    </div>
  </div>
</template>

<script>
  import pkg from '/package.json'

  export default {
    data() {
      return { pkg: pkg }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      clickLogoutBtn() {
        this.$router.push({ name: "Login" })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
