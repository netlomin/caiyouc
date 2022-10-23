<template>
  <div class="app-container">
    <div class="m-t_8 flex-col">
      <a-avatar
        :src="shop.avatarUrl"
        :size="2.6*rem"
        :style="css.avatar"
      >{{firstChar(shop.name)}}</a-avatar>
      <a-button
        class="m-t-8"
        @click="scan"
      >扫一扫</a-button>
    </div>

    <div class="m-t_8 p-lr_1">
      <van-form @submit="submit">
        <van-field
          v-model="shop.name"
          name="name"
          label="彩店名"
          placeholder="彩店名"
          readonly
        />
        <van-field
          v-model="shop.wechat"
          name="wechat"
          label="微信号"
          placeholder="彩店微信号"
          readonly
        />
        <van-field
          v-model="shop.mobile"
          name="mobile"
          label="手机号"
          placeholder="彩店联系方式"
          readonly
        />
        <van-field
          v-model="shop.ownerRealName"
          name="ownerRealName"
          label="店主名"
          placeholder="店主姓名"
          readonly
        />
        <van-field
          v-model="shop.ownerIdCard"
          name="ownerIdCard"
          label="身份证"
          placeholder="店主身份证"
          readonly
        />
      </van-form>
    </div>

    <c-scan ref="scaner"></c-scan>

    <div class="fixed-bottom p_2">
      <a-button
        type="primary"
        block
        @click="submit"
      >提交</a-button>
    </div>
  </div>
</template>

<script>
  import cScan from 'components/c-scan/c-scan'

  export default {
    components: { cScan },
    data() {
      return {
        css: {
          avatar: { backgroundColor: conf.themeColor }
        },
        shop: {}
      }
    },
    methods: {
      scan() {
        this.$refs.scaner.media()
      },
      submit() {}
    }
  }
</script>

<style
  lang="scss"
  scoped
>
</style>
