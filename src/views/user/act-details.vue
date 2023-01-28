<template>
  <div>
    <van-sticky :offset-top="45">
      <van-notice-bar
        left-icon="volume-o"
        text="您可以微信联系店方转账预存金额"
      />
      <c-panel
        margin="-2px 0 .28rem"
        shadow="0 0 6px #F88"
      >
        <van-row
          slot="head"
          type="flex"
          class="bold"
        >
          <van-col
            span="12"
            class="left"
          >总余额</van-col>
          <van-col
            span="12"
            class="right"
          >
            <span class="m-r_1 red">{{cashAct.amt+cashAct.frozenAmt}}</span>元
          </van-col>
        </van-row>
        <van-row type="flex">
          <van-col
            span="12"
            class="left"
          >可用余额</van-col>
          <van-col
            span="12"
            class="right"
          >
            <span class="m-r_1 red">{{cashAct.amt}}</span>元
          </van-col>
        </van-row>
        <van-row type="flex">
          <van-col
            span="12"
            class="left"
          >冻结金额</van-col>
          <van-col
            span="12"
            class="right"
          >
            <span class="m-r_1 blue">{{cashAct.frozenAmt}}</span>元
          </van-col>
        </van-row>
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
              :color="item.keepType>=200?'#66F':'#F66'"
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
              'red':item.keepType<200,
              'blue':item.keepType>=200,
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
        cashAct: {},
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
        api.user.act({ actType: 'CASH' }).then(vo => {
          this.cashAct = vo
          this.refresh()
        }).catch(api.catch)
      },
      load() {
        let { cur, size, cashAct } = this
        api.user.actDetails({
          actId: cashAct.id,
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
      }
    }
  }
</script>
