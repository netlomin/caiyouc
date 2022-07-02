<!-- home -->
<template>
  <van-pull-refresh v-model="refreshing" @refresh="refresh">
    <van-list v-if="list&&list.length" v-model="loading" :finished="finished" @load="load">
      <van-cell-group v-for="item in list" :key="item.id" :border="false" inset>
        <van-cell :to="{ name: 'About', params: { id: item.id }}">
          <div class="cell-head" slot="title">
            <van-icon name="gold-coin" :color="conf.themeColor" />
            <strong class="m-l-10">{{item.cpName}}</strong>
            <span style="float: right;">
              截止剩余：
              <van-count-down :time="time" class="inline" />
            </span>
          </div>
          <template #label>
            <div class="cell-body">
              <a-progress :width="1.6*rem" :percent="item.percent" :success-percent="item.soldPercent" type="circle">
                <template #format="percent">
                  <div class="sm bold">{{item.soldPercent}}%</div>
                  <div class="xs grey">保底{{item.guardPercent}}%</div>
                </template>
              </a-progress>
              <span class="m-l-10">
                <h6 class="md">{{item.title}}</h6>
                <span class="sm inline w-6 van-ellipsis">{{item.subtitle}}</span>
              </span>
            </div>
            <div class="cell-foot">
              <van-row>
                <van-col span="6" class="center">
                  <h6 class="sm red">{{item.totalAmt}}</h6>
                  <span class="sm grey">总金额</span>
                </van-col>
                <van-col span="6" class="center">
                  <h6 class="sm red">{{item.amt}}</h6>
                  <span class="sm grey">单份金额</span>
                </van-col>
                <van-col span="6" class="center">
                  <h6 class="sm red">{{item.totalCnt}}</h6>
                  <span class="sm grey">总份数</span>
                </van-col>
                <van-col span="6" class="center">
                  <h6 class="sm red">{{item.totalCnt-item.soldCnt}}</h6>
                  <span class="sm grey">剩余份数</span>
                </van-col>
              </van-row>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <van-divider>没有更多订单了</van-divider>
    </van-list>
    <van-empty v-else description="暂无合买订单" />
  </van-pull-refresh>
</template>

<script>
  import mock from '@/mock/home/index.json'

  export default {
    data() {
      return {
        css: {},
        time: 30.65 * 60 * 60 * 1000,
        rate: 0,
        list: [],
        loading: false,
        refreshing: false,
        finished: false
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
      load() {
        setTimeout(() => {
          if (this.refreshing) {
            this.list = []
            this.refreshing = false
          }
          let list = mock.list.filter(e => this.list.filter(l => e.id === l.id).length == 0)
          list.forEach(e => {
            e.percent = Math.round((e.guardCnt + e.soldCnt) / e.totalCnt * 100)
            e.guardPercent = Math.round(e.guardCnt / e.totalCnt * 100)
            e.soldPercent = Math.round(e.soldCnt / e.totalCnt * 100)
            this.list.push(e)
          })
          this.finished = list.length == 0
          this.loading = false
        }, 200)
      },
      refresh() {
        // 清空列表数据
        this.finished = false
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.load()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .van-pull-refresh {
    min-height: 100vh;
  }

  .van-cell-group {
    margin-top: 10px;
  }

  .van-cell__label {
    margin-top: 0;
  }

  .cell-head,
  .cell-body {
    padding: 0.2rem 0;
    border-bottom: 1px solid #EEE;
  }

  .cell-foot {
    padding-top: 0.2rem;
  }

  .cell-body {
    display: flex;
    align-items: center;
  }
</style>
