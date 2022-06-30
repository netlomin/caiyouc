<!-- home -->
<template>
  <van-pull-refresh v-model="refreshing" @refresh="refresh">
    <van-list v-if="list&&list.length" v-model="loading" :finished="finished" @load="load" :style="css.list">
      <van-cell-group v-for="item in list" :key="item" inset>
        <van-cell>
          <div class="cell-head" slot="title">
            <van-icon name="gold-coin" :color="conf.themeColor" />
            <strong class="m-l-10">双色球</strong>
            <span style="float: right;">
              截止剩余：
              <van-count-down :time="time" class="inline" />
            </span>
          </div>
          <template #label>
            <div class="cell-body">
              <a-progress width="1.6rem" :percent="60" :success-percent="30" type="circle" />
              <span class="m-l-10">
                <h6 class="md">天上水</h6>
                <span class="sm inline w-6 van-ellipsis">今晚必中今晚必中今晚必中今晚必中今晚必中今晚必中今晚必中今晚必中今晚必中今晚必中</span>
              </span>
            </div>
            <div class="cell-foot">
              <van-row>
                <van-col span="6" class="center">
                  <h6 class="sm red">16000</h6>
                  <span class="sm grey">总金额</span>
                </van-col>
                <van-col span="6" class="center">
                  <h6 class="sm red">1.6</h6>
                  <span class="sm grey">每份金额</span>
                </van-col>
                <van-col span="6" class="center">
                  <h6 class="sm red">10000</h6>
                  <span class="sm grey">总份数</span>
                </van-col>
                <van-col span="6" class="center">
                  <h6 class="sm red">4000</h6>
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
        css: {
          list: {
            margin: '20px 0'
          }
        },
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
            this.list = [1]
            this.refreshing = false
          }
          let list = mock.list.filter(e => this.list.filter(l => e.id === l.id).length == 0)
          list.forEach(e => this.list.push(e))
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
  .inline {
    display: inline-block !important;
  }

  .cell-head,
  .cell-body,
  .cell-foot {
    padding: 6px 0;
  }

  .cell-head,
  .cell-body {
    border-bottom: 1px solid #EEE;
  }

  .cell-body {
    /* height: 100vh; 表示全屏高度 */
    width: 100%;
    display: flex;
    /* 垂直居中 */
    align-items: center;
    /* 横向居中 */
    /* justify-content: center;*/
  }
</style>
