<template>
  <div>
    <div class="user-section">
      <div class="user-box">
        <a-avatar
          :src="user.avatarUrl"
          :size="1.28*rem"
          :style="css.avatar"
          @click="navTo({name:'UserInfo'})"
        >{{firstChar(user.nickName)}}</a-avatar>
        <div class="white">
          <b class="m-l_3 md">{{user.nickName}}</b>
          <div
            class="shop-bar m-t_1 m-l_2 sm"
            @click="navTo({name:'Shop'})"
          >
            <van-icon
              name="home-o"
              class="green"
              size=".28rem"
            />
            <span class="m-l_2">{{shop.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cover-container">
      <img
        class="arc"
        src="static/img/arc.png"
      />
      <div class="account-section">
        <div class="integral-box">
          <van-icon
            name="balance-o"
            color="#E88818"
            size=".4rem"
          />
          <span class="m-l_2 red">{{act.amt}}</span>
        </div>
        <div
          class="btn"
          @click="navTo({name:'ActExtract'})"
        >提取</div>
      </div>
    </div>

    <c-panel
      margin="0 .5rem"
      :radius="6"
    >
      <van-cell
        title="推广邀请"
        :to="{name:'Invite'}"
        is-link
      >
        <div slot="icon">
          <van-icon
            name="qr"
            class="red m-r_2"
          />
        </div>
      </van-cell>
      <van-cell
        title="收益明细"
        :to="{name:'ActProfits'}"
        is-link
      >
        <div slot="icon">
          <van-icon
            name="gold-coin-o"
            class="red m-r_2"
          />
        </div>
      </van-cell>
      <van-cell
        title="系统"
        :to="{name:'Settings'}"
        icon="setting-o"
        is-link
      >
        <div slot="icon">
          <van-icon
            name="setting-o"
            class="red m-r_2"
          />
        </div>
      </van-cell>
    </c-panel>
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
        act: {}
      }
    },
    created() {
      let userId = this.$store.getters.userId
      api.user.info({ id: userId }).then(vo => {
        vo.nickName = util.ifnil(vo.nickName, vo.mobile)
        this.user = vo
      }).catch(api.catch)
      api.user.shop({}).then(vo => {
        this.shop = vo
      }).catch(api.catch)
      api.user.act({ actType: 'PROFIT' }).then(vo => {
        this.act = vo
      }).catch(api.catch)
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .user-section {
    position: relative;
    height: 3.6rem;
    padding: .6rem .5rem 0;
    background-color: $theme-color;

    .user-box {
      height: 1.8rem;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 1;
    }
  }

  .cover-container {
    padding: 0 .5rem;
    position: relative;
    background: $bg-color;

    .arc {
      position: absolute;
      top: -.5rem;
      left: 0;
      width: 100%;
      height: .6rem;
    }
  }

  .account-section {
    display: flex;
    position: relative;
    background: #fff;
    align-items: center;
    border-radius: .18rem;
    top: -.88rem;
    justify-content: space-between;
    padding: .28rem;
    color: #888;

    .integral-box {
      font-size: $font-lg;
    }

    .btn {
      width: 1.6rem;
      height: .6rem;
      line-height: .6rem;
      text-align: center;
      font-size: $font-sm;
      color: #FFF;
      border-radius: .3rem;
      background: linear-gradient(to right, #F8C868, #F8E868);
      z-index: 1;
    }
  }

  .shop-bar {
    height: .6rem;
    line-height: .6rem;
    padding: 0 .38rem;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: .6rem;
  }
</style>