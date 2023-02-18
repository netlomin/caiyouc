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
          <div slot="input" class="w-10 flex row-between">
            <div class="grey">{{shop.wechat}}</div>
            <div>
              <a href="wechat://" @click="copyText(shop.wechat)">
                <van-icon
                  name="weixin"
                  class-prefix="cy"
                  color="#1A1"
                  :size=".4*rem"
                />
              </a>
            </div>
          </div>
        </van-field>
        <van-field label="联系方式">
          <div slot="input" class="w-10 flex row-between">
            <div>
              <a :href="'tel:'+shop.mobile">
                <van-icon
                  name="phone-o"
                  :size=".4*rem"
                />
                <u class="grey">{{shop.mobile}}</u>
              </a>
            </div>
            <div>
                <van-icon
                  name="fuzhi"
                  class-prefix="cy"
                  :size=".4*rem"
                  color="#1A8"
                  @click="clickCopy(shop.mobile)"
                />
            </div>
          </div>
        </van-field>
        <van-field label="地址">
          <template #input>
            <span class="grey">{{shop.address}}</span>
          </template>
        </van-field>
        <van-field label="站长姓名">
          <template #input>
            <span class="grey">{{shop.ownerRealName}}</span>
          </template>
        </van-field>
        <van-field label="站长手机">
          <div slot="input" class="w-10 flex row-between">
            <div>
              <a :href="'tel:'+shop.ownerMobile">
                <van-icon
                  name="phone-o"
                  :size=".4*rem"
                />
                <u class="grey">{{shop.ownerMobile}}</u>
              </a>
            </div>
            <div>
                <van-icon
                  name="fuzhi"
                  class-prefix="cy"
                  :size=".4*rem"
                  color="#1A8"
                  @click="clickCopy(shop.mobile)"
                />
            </div>
          </div>
        </van-field>
        <van-field label="站长身份证">
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
      },
      clickCopy(txt){
        this.copyText(txt)
        this.$notify({ message: '复制成功！', background: '#1F1' })
      }
    }
  }
</script>

<style>
  .van-notify {
    top: 45px;
  }
</style>
