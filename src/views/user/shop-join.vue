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

    <van-form @submit="submit">
      <c-panel
        margin=".5rem"
        :radius="6"
        shadow="1px 1px 6px #F88"
      >
        <div slot="head">
          <div class="red p_2">彩站信息</div>
        </div>
        <van-notice-bar
          left-icon="info-o"
          text="开启摄像头，扫一扫彩站二维码可自动获取！"
        />
        <van-field
          v-model="shop.name"
          name="name"
          label="彩站名"
          placeholder="彩站名"
          readonly
          :rules="[{ required: true, message: '请扫一扫彩站二维码' }]"
        />
        <van-field
          v-model="shop.wechat"
          name="wechat"
          label="微信号"
          placeholder="彩站微信号"
          readonly
        />
        <van-field
          v-model="shop.mobile"
          name="shop.mobile"
          label="手机号"
          placeholder="彩站联系方式"
          readonly
        />
        <van-field
          v-model="shop.ownerRealName"
          name="ownerRealName"
          label="站长名"
          placeholder="站长姓名"
          readonly
        />
        <van-field
          v-model="shop.ownerIdCard"
          name="ownerIdCard"
          label="身份证"
          placeholder="站长身份证"
          readonly
        />
      </c-panel>

      <c-panel
        margin=".5rem"
        :radius="6"
        shadow="1px 1px 6px #F66"
      >
        <div slot="head">
          <div class="red p_2">身份信息</div>
        </div>
        <van-notice-bar
          left-icon="info-o"
          :scrollable="false"
        >
          <van-swipe
            vertical
            :style="{
              height: '.88rem',
              lineHeight: '.88rem'
            }"
            :autoplay="3000"
            :show-indicators="false"
          >
            <van-swipe-item>身份信息是购彩、转账唯一凭证，请确保真实有效。</van-swipe-item>
            <van-swipe-item>身份信息作为凭证，提交后不可更改！</van-swipe-item>
            <van-swipe-item>身份信息会保存到账号，再次添加彩站可直接使用！</van-swipe-item>
          </van-swipe>
        </van-notice-bar>
        <van-field
          v-model.trim="ps.mobile"
          name="ps.mobile"
          label="手机"
          placeholder="本人手机号码"
          readonly
        />
        <van-field
          v-model.trim="ps.realName"
          name="realName"
          label="姓名"
          placeholder="请输入本人姓名"
          :rules="[{ required: true, message: '请输入本人姓名' }]"
          :readonly="!canEditIdentity"
        />
        <van-field
          v-model.trim="ps.idCard"
          name="idCard"
          label="身份证"
          placeholder="请输入本人身份证"
          maxlength="18"
          :rules="[{ required: true, message: '请输入本人身份证' }]"
          :readonly="!canEditIdentity"
        />
      </c-panel>

      <c-scan
        ref="scaner"
        @result="onScanResult"
      />

      <div class="fixed-bottom">
        <van-field>
          <template #input>
            <a-button
              type="primary"
              htmlType="submit"
              block
            >确认添加</a-button>
          </template>
        </van-field>
      </div>
    </van-form>
  </div>
</template>

<script>
  import cScan from 'components/c-scan/c-scan'
  import cPanel from 'components/c-panel'
  import qs from "qs"

  export default {
    components: { cScan, cPanel },
    data() {
      return {
        css: {
          avatar: { backgroundColor: $c.themeColor }
        },
        shop: {},
        ps: {},
        canEditIdentity: false
      }
    },
    mounted() {
      api.ps.passport().then(ps => {
        this.ps = ps
        this.canEditIdentity = util.nil(ps.realName) && util.nil(ps.idCard)
      }).catch(api.catch)
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
        let { s } = qs.parse(ret.split('?')[1], { ignoreQueryPrefix: true })
        if (!s) {
          this.$notify('未知二维码！')
          return
        }
        api.user.shop({ id: s }).then(vo => {
          this.shop = vo
        }).catch(api.catch)
      },
      submit() {
        if (!this.canEditIdentity) {
          this.joinShop()
          return
        }
        let { realName, idCard } = this.ps
        api.ps.saveIdentity({
          realName,
          idCard
        }).then(vo => {
          this.joinShop()
        }).catch(api.catch(err => {
          this.joinShop()
          return true
        }))
      },
      joinShop() {
        api.ps.joinShop({
          shopId: this.shop.id,
        }).then(vo => {
          this.$notify({ message: '添加彩站成功！', background: '#11FF11' })
          this.$root.$emit('refreshShops')
          setTimeout(() => this.$router.back(), 800)
        }).catch(api.catch(e => {
          if (e.code == '606') {
            this.$dialog.alert({ title: '提示', message: '你已添加过该彩站！' })
            return true
          }
          return false
        }))
      }
    }
  }
</script>

<style>
  .van-notify {
    top: 45px;
  }
</style>