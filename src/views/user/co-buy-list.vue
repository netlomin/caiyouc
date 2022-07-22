<template>
  <div>
    <van-tabs v-model="activeTab" :line-width="1.6*rem">
      <van-tab title="所有" name=""></van-tab>
      <van-tab title="待开奖" name="0"></van-tab>
      <van-tab title="已中奖" name="1"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="refreshing" @refresh="refresh">
      <van-list v-if="list.length" v-model="loading" :finished="finished" finished-text="已经到底了～" @load="load">
        <van-cell>11</van-cell>
      </van-list>
      <van-empty v-else description="暂无合买" />
    </van-pull-refresh>
  </div>
</template>

<script>
  import coBuyListRet from '@/mock/user/co-buy-list.json'

  export default {
    data() {
      return {
        activeTab: "",
        refreshing: false,
        loading: false,
        finished: false,
        list: []
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      load() {
        setTimeout(() => {
          if (this.refreshing) {
            this.list = []
            this.refreshing = false
          }
          let coBuyList = coBuyListRet.data
          let list = coBuyList.filter(e => !this.list.filter(l => e.id === l.id).length)
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
        this.loading = true
        this.finished = false
        this.load()
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
