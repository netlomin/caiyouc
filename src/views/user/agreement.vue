<template>
  <div>
    <van-nav-bar :title="$route.meta.title" fixed placeholder safe-area-inset-top />

    <div class="fixed-bottom">
      <van-row>
        <van-col span="4">
          <a-button
            type="default"
            block
            @click="clickLogoutBtn"
          >不同意</a-button>
        </van-col>
        <van-col span="8">
          <a-button
            type="primary"
            block
            @click="clickLogoutBtn"
          >我已阅读并同意</a-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {},
    methods: {}
  }
</script>
<style lang="scss" scoped>
</style>
