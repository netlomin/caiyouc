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

    <c-scan
      ref="scaner"
      @result="onScanResult"
    ></c-scan>

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
  import qs from "qs"

  export default {
    components: { cScan },
    data() {
      return {
        css: {
          avatar: { backgroundColor: $c.themeColor }
        },
        shop: {}
      }
    },
    methods: {
      scan() {
        this.$refs.scaner.media()
      },
      onScanResult(ret) {
        if (!ret.includes('?')) {
          this.$notify('未知二维码！')
          return
        }
        let { shopId } = qs.parse(ret.split('?')[1], { ignoreQueryPrefix: true })
        if (!shopId) {
          this.$notify('未知二维码！')
          return
        }
        api.user.shop({ id: shopId }).then(vo => {
          this.shop = vo
        }).catch(this.caught)
      },
      submit() {
        if (this.shop.id) {
          api.ps.joinShop({ shopId: this.shop.id }).then(vo => {
            this.$notify({ message: '添加彩店成功！', background: '#11FF11' })
          }).catch(this.caught(e => {
            if (e.code != '606') {
              return false
            }

            this.$dialog.alert({ title: '提示', message: '你已添加过该彩店！' })
            return true
          }))
        }
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
</style>
