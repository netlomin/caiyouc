<template>
  <div>
    <van-nav-bar :title="$route.meta.title" fixed placeholder safe-area-inset-top />

    <div class="fixed-bottom">
      <van-row>
        <van-col span="8" class="p_2">
          <a-button
            type="default"
            block
            @click="clickNo"
          >不同意</a-button>
        </van-col>
        <van-col span="16" class="p_2">
          <a-button
            type="primary"
            block
            @click="clickYes"
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
    methods: {
      setAgreen(b) {
        let pages = getCurrentPages()
        let prevPage = pages[pages.length - 2]
        if (prevPage && prevPage.$vm) {
          prevPage.$vm.check = b
        }
        this.$router.back()
      },
      clickNo() {
        this.setAgreen(false)
      },
      clickYes() {
        this.setAgreen(true)
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
