<!-- home -->
<template>
  <van-pull-refresh
    v-model="refreshing"
    @refresh="refresh"
  >
    <van-list
      v-if="list&&list.length"
      v-model="loading"
      :finished="finished"
      @load="load"
    >
      <van-cell-group
        v-for="item in list"
        :key="item.id"
        :border="false"
        inset
      >
        {{void (cp=$c.cp[item.cp])}}
        <van-cell :to="{ name: 'CoBuySub', params: { id: item.id }}">
          <div
            class="cell-head"
            slot="title"
          >
            <van-icon
              :name="cp.ico"
              class-prefix="cy"
              :color="cp.color"
            />
            <strong class="m-l-10">{{item.cpName}}</strong>
            <span style="float: right;">
              截止剩余：
              <van-count-down
                :time="item.remainTime"
                class="inline"
              />
            </span>
          </div>
          <template #label>
            <div class="cell-body">
              <a-progress
                :width="1.6*rem"
                :percent="item.percent"
                :success-percent="item.soldPercent"
                type="circle"
              >
                <template #format="percent">
                  <div class="sm bold">{{item.soldPercent}}%</div>
                  <div class="xs grey">保底{{item.guardPercent}}%</div>
                </template>
              </a-progress>
              <span class="m-l-10">
                <h6 class="md">{{item.userNickName}}</h6>
                <span class="sm inline w-6 van-ellipsis">{{item.title}}</span>
              </span>
            </div>
            <div class="cell-foot">
              <van-row>
                <van-col
                  span="6"
                  class="center"
                >
                  <h6 class="sm red">{{item.totalCnt}}</h6>
                  <span class="sm grey">总金额</span>
                </van-col>
                <van-col
                  span="6"
                  class="center"
                >
                  <h6 class="sm red">{{item.unitAmt}}</h6>
                  <span class="sm grey">单份金额</span>
                </van-col>
                <van-col
                  span="6"
                  class="center"
                >
                  <h6 class="sm red">{{item.totalCnt}}</h6>
                  <span class="sm grey">总份数</span>
                </van-col>
                <van-col
                  span="6"
                  class="center"
                >
                  <h6 class="sm red">{{item.totalCnt-item.soldCnt}}</h6>
                  <span class="sm grey">剩余份数</span>
                </van-col>
              </van-row>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <van-divider>没有更多合买了</van-divider>
    </van-list>
    <van-empty
      v-else
      description="暂无合买方案"
    />
  </van-pull-refresh>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        refreshing: false,
        finished: false,
        cur: 1,
        size: 10,
        list: []
      }
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        let { cur, size } = this
        let shopId = this.$store.getters.shopId
        api.cp.coBuys({ cur, size, shopId, all: false }).then(vo => {
          if (this.refreshing) {
            this.list = []
            this.refreshing = false
          }

          vo.forEach(e => {
            e.percent = Math.round((e.guardCnt + e.soldCnt) / e.totalCnt * 100)
            e.guardPercent = Math.round(e.guardCnt / e.totalCnt * 100)
            e.soldPercent = Math.round(e.soldCnt / e.totalCnt * 100)
            e.remainTime = dayjs(e.stopTime).diff(dayjs())
          })
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
        this.finished = false
        this.loading = true
        this.cur = 1
        this.load()
      }
    }
  }
</script>
<style
  lang="scss"
  scoped
>
  .van-pull-refresh {
    min-height: 100vh;
  }

  .van-cell-group--inset {
    margin: .2rem;
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
