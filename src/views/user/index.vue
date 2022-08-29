<!-- home -->
<template>
  <div>
    <c-panel :bg="conf.themeColor">
      <a-avatar :src="user.avatar" :size="rem" :style="css.avatar">{{firstChar(user.nickName)}}</a-avatar>
      <b class="white m-l-6">{{user.nickName}}</b>
      <van-row class="m-t-18">
        <van-col span="12" class="white center">
          <b>10000.00</b>
          <div>账户余额(元)</div>
        </van-col>
        <van-col span="12" class="white center">
          <b>18000.00</b>
          <div>累计中奖(元)</div>
        </van-col>
      </van-row>
      <div class="m-t-8"></div>
    </c-panel>

    <div class="m-t-8">
      <van-cell title="发起合买" :to="{name:'Pick'}" icon="add-o" size="large" is-link />
      <van-cell title="我的合买" :to="{name:'CoBuyList'}" icon="orders-o" size="large" is-link />
      <van-cell title="系统" :to="{name:'Settings'}" icon="setting-o" size="large" is-link />
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
          avatar: { backgroundColor: conf.colors.blue }
        },
        user: {}
      }
    },
    created() {
      this.api.user.info({}).then(vo => {
        vo.nickName = _.defaultTo(vo.nickName, vo.mobile)
        this.user = vo
      }).catch(this.caught)
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {}
  }
</script>
<style lang="scss" scoped>
</style>
