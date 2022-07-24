<template>
  <div>
    <van-tabs v-model="activeTab" :line-width="2.5*rem">
      <van-tab title="所有" name=""></van-tab>
      <van-tab title="我发起" name="0"></van-tab>
      <van-tab title="待开奖" name="0"></van-tab>
      <van-tab title="已中奖" name="1"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="refreshing" @refresh="refresh">
      <van-list v-if="list.length" v-model="loading" :finished="finished" finished-text="已经到底了～" @load="load">
        <van-cell v-for="buy in list" :to="{name:'CombinOrder',params:{id:buy.projectId}}" is-link>
          <div slot="icon" class=" flex-center m-r-10">
            <van-icon :size="rem" name="gold-coin" :color="conf.themeColor" />
          </div>
          <template #title>
            <b class="">{{buy.project.cpName}}</b>
          </template>
          <template #label>
            <span class="grey">{{buy.createTime}}</span>
          </template>
          <template #right-icon>
          </template>
          <div>
            <div>待开奖</div>
            <div>{{buy.cnt+' 份'}}</div>
          </div>
        </van-cell>
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
    watch: {
      activeTab(newVal, oldVal) {
        this.refresh()
      }
    },
    created() {
      this.refresh()
    },
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
            this.list.push(e)
          })
          this.finished = true
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
