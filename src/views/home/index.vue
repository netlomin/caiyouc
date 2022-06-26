<!-- home -->
<template>
  <van-pull-refresh v-model="refreshing" @refresh="refresh">
    <van-list v-if="list&&list.length" v-model="loading" :finished="finished" @load="load" :style="css.list">
      <!-- <van-cell v-for="item in list" :key="item" :title="item">
      </van-cell> -->
      <van-cell-group inset>
        <van-cell>
          <div class="cell-title" slot="title">
            <van-icon name="gold-coin-o"></van-icon>
            <strong class="m-l-10">双色球</strong>
            <span style="float: right;">
              截止剩余：
              <van-count-down :time="time" class="inline" />
            </span>
          </div>
          <div class="cell-body" slot="label">
            <span class="custom-title">单元格111111111111111111111111111111111111111</span>
          </div>
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
          list: { margin: '20px 0' }
        },
        time: 30.65 * 60 * 60 * 1000,
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

  .cell-title {
    padding: 6px 0;
    border-bottom: 1px solid #EEE;
  }

  .cell-body {
    padding: 6px 0;
  }

  .m-l-10 {
    margin-left: 10px;
  }
</style>
