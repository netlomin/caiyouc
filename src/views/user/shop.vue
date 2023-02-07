<template>
  <div>
    <div class="m-t_8 flex-col">
      <a-avatar
        :src="shop.avatarUrl"
        :size="2.6*rem"
        :style="css.avatar"
      >{{firstChar(shop.name)}}</a-avatar>
    </div>

    <van-form>
      <c-panel
        margin=".5rem .6rem"
        :radius="6"
        shadow="1px 1px 6px #F88"
      >
        <van-field label="名称">
          <template #input>
            <span class="grey">{{shop.name}}</span>
          </template>
        </van-field>
        <van-field label="微信">
          <div slot="input" class="flex row-between">
            <div class="grey">{{shop.wechat}}</div>
            <div>
              <a href="weixin://dl/business/?ticket=ta428dhj739hg3efe6e">
                <van-icon
                  name="weixin"
                  class-prefix="cy"
                  color="#1A1"
                  :size=".28*rem"
                />
              </a>
            </div>
          </div>
        </van-field>
        <van-field label="联系方式">
          <template #input>
            <span class="grey">{{shop.mobile}}</span>
          </template>
        </van-field>
        <van-field label="地址">
          <template #input>
            <span class="grey">{{shop.address}}</span>
          </template>
        </van-field>
        <van-field label="店主姓名">
          <template #input>
            <span class="grey">{{shop.ownerRealName}}</span>
          </template>
        </van-field>
        <van-field label="店主手机">
          <template #input>
            <span class="grey">{{shop.ownerMobile}}</span>
          </template>
        </van-field>
        <van-field label="店主身份证">
          <template #input>
            <span class="grey">{{shop.ownerIdCard}}</span>
          </template>
        </van-field>
      </c-panel>
    </van-form>
  </div>
</template>

<script>
  import cPanel from 'components/c-panel'

  export default {
    components: { cPanel },
    data() {
      return {
        css: {
          avatar: { backgroundColor: $c.themeColor }
        },
        shop: {}
      }
    },
    created() {
      this.loadShop()
    },
    methods: {
      loadShop() {
        api.user.shop({}).then(vo => {
          this.shop = vo
        }).catch(api.catch)
      }
    }
  }
</script>
