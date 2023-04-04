<template>
  <div>
    <van-sticky :offset-top="45">
      <van-notice-bar
        left-icon="volume-o"
        text="推广邀请彩站入驻，可以每月获取收益。"
      />
      <c-panel
        padding=".3rem .5rem"
        margin="0"
        shadow="0 1px 1px #F1F6F8"
      >
        <van-row
          slot="head"
          type="flex"
          class="bold"
        >
          <van-col
            span="12"
            class="left"
          >我的收益</van-col>
          <van-col
            span="12"
            class="right"
          >
            <span class="m-r_1 red">{{act.amt+act.frozenAmt}}</span>元
          </van-col>
        </van-row>
        <van-row
          type="flex"
          class="grey"
        >
          <van-col
            span="12"
            class="left"
          >可提收益</van-col>
          <van-col
            span="12"
            class="right"
          >
            <span class="m-r_1 red">{{act.amt}}</span>元
          </van-col>
        </van-row>
        <van-row
          type="flex"
          class="m-t_2 grey"
        >
          <van-col
            span="12"
            class="left"
          >冻结收益</van-col>
          <van-col
            span="12"
            class="right"
          >
            <span class="m-r_1 blue">{{act.frozenAmt}}</span>元
          </van-col>
        </van-row>
      </c-panel>
      <div class="grap"></div>
      <c-panel
        padding=".3rem .5rem"
        margin="0 0 1px"
        shadow="0 1px 1px #F1F6F8"
      >
        <div class="bold">收益明细</div>
      </c-panel>
    </van-sticky>

    <van-pull-refresh
      v-model="refreshing"
      @refresh="refresh"
    >
      <van-list
        v-if="list.length"
        v-model="loading"
        :finished="finished"
        finished-text="已经到底了～"
        @load="load"
      >
        <van-cell v-for="item in list">
          <div
            slot="icon"
            class=" flex-middle m-r-10"
          >
            <van-icon
              :size=".8*rem"
              :name="item.amt>0?'gold-coin':'gold-coin-o'"
              :color="item.keepType>=550?'#66F':'#F66'"
            />
          </div>
          <template #title>
            <b>{{item.keepTypeText}}</b>
          </template>
          <template #label>
            <span class="grey">{{item.createTime}}</span>
          </template>
          <div>
            <span :class="{
              'red':item.keepType<550,
              'blue':item.keepType>=550,
              'm-r_1':true
            }">{{item.amt}}</span>
            <span>元</span>
          </div>
        </van-cell>
      </van-list>
      <van-empty v-else />
    </van-pull-refresh>
  </div>
</template>

<script>
  import cPanel from 'components/c-panel'

  export default {
    components: { cPanel },
    data() {
      return {
        act: {},
        refreshing: false,
        loading: false,
        finished: false,
        cur: 1,
        size: 10,
        list: []
      }
    },
    created() {
      this.loadCashAct()
    },
    methods: {
      customBack() {
        this.$router.replace({ name: 'User' })
      },
      loadCashAct() {
        api.user.act({ actType: 'PROFIT' }).then(vo => {
          this.act = vo
          this.refresh()
        }).catch(api.catch)
      },
      load() {
        let { cur, size, act } = this
        api.user.actDetails({
          actId: act.id,
          cur,
          size
        }).then(vo => {
          if (this.refreshing) {
            this.list = []
            this.refreshing = false
          }
          this.list = this.list.concat(vo)
          this.cur++
          this.finished = vo.length == 0
          this.loading = false
        }).catch(api.catch((err) => {
          this.loading = false
          return false
        }))
      },
      refresh() {
        this.loading = true
        this.finished = false
        this.cur = 1
        this.load()
      },
      changeIncludeFrozen() {
        this.refreshing = true
        this.refresh()
      }
    }
  }
</script>