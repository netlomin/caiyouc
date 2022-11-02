<!-- home -->
<template>
  <div>
    <c-panel :bg="$c.themeColor">
      <a-avatar
        class="m-6"
        :src="user.avatarUrl"
        :size="1.28*rem"
        :style="css.avatar"
      >{{firstChar(user.nickName)}}</a-avatar>
      <div class="user-bar inline white">
        <b>{{user.nickName}}</b>
        <div class="shop-bar sm">
          <van-icon
            name="home-o"
            class="green"
          />
          <span class="m-l-5">{{shop.name}}</span>
        </div>
      </div>

      <van-row class="white center m-t-8">
        <van-col span="12">
          <div class="p-tb-10">
            <b>{{fmtAmt(cashAct.amt)}}</b>
            <div>账户余额(元)</div>
          </div>
        </van-col>
        <van-col span="12">
          <div class="p-tb-10">
            <b>{{fmtAmt(prizeAct.amt)}}</b>
            <div>累计中奖(元)</div>
          </div>
        </van-col>
      </van-row>
    </c-panel>

    <div class="m-t-8">
      <van-cell
        title="发起购彩"
        :to="{name:'Pick'}"
        icon="add-o"
        size="large"
        is-link
      />
      <van-cell
        title="购彩记录"
        :to="{name:'CoBuyList'}"
        icon="orders-o"
        size="large"
        is-link
      />
      <van-cell
        title="系统"
        :to="{name:'Settings'}"
        icon="setting-o"
        size="large"
        is-link
      />
    </div>
  </div>
</template>

<script>
  import cPanel from 'components/c-panel'

  export default {
    components: { cPanel },
    data() {
      return {
        css: {
          avatar: { backgroundColor: $c.colors.blue }
        },
        user: {},
        shop: {},
        cashAct: {},
        prizeAct: {}
      }
    },
    mounted() {
      let userId = this.$store.getters.userId
      this.api.user.info({ id: userId }).then(vo => {
        vo.nickName = _.defaultTo(vo.nickName, vo.mobile)
        this.user = vo
      }).catch(this.caught)
      this.api.user.shop({}).then(vo => {
        this.shop = vo
      }).catch(this.caught)
      this.api.user.act({ userId, actType: 'CASH' }).then(vo => {
        this.cashAct = vo
      }).catch(this.caught)
      this.api.user.act({ userId, actType: 'PRIZE' }).then(vo => {
        this.prizeAct = vo
      }).catch(this.caught)
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .user-bar {
    vertical-align: middle;
  }

  .shop-bar {
    height: .6rem;
    line-height: .6rem;
    padding: 0 .38rem;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: .6rem;
  }
</style>
