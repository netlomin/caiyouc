<template>
  <div>
    <van-sticky :offset-top="44">
      <van-tabs
        v-model="activeTab"
        :line-width="2.5*rem"
        class="m-b-1"
      >
        <van-tab
          title="所有"
          name=""
        ></van-tab>
        <van-tab
          title="单购"
          name="1"
        ></van-tab>
        <van-tab
          title="合买"
          name="2"
        ></van-tab>
        <van-tab
          title="我发起"
          name="3"
        ></van-tab>
      </van-tabs>
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
        <van-cell
          v-for="buy in list"
          :to="typeTo(buy.id, buy.type)"
          is-link
        >
          {{void (cp=$c.cp[buy.cp])}}
          <div
            slot="icon"
            class=" flex-middle m-r-10"
          >
            <van-icon
              :name="cp.ico"
              class-prefix="cy"
              :color="cp.color"
              :size=".8*rem"
            />
          </div>
          <template #title>
            <b>{{buy.cpName}}</b>
          </template>
          <template #label>
            <span class="grey">{{buy.createTime}}</span>
          </template>
          <template #right-icon>
          </template>
          <div>
            <div
              v-if="buy.status==130"
              class="red"
            >{{'派奖 '+_.round(buy.awardAmt, 2)+' 元'}}</div>
            <div
              v-else-if="buy.status==30"
              class="red"
            >{{'中奖 '+_.round(buy.prizeAmt, 2)+' 元'}}</div>
            <div v-else>{{buy.statusDesc}}</div>
            <div>{{buy.amt+' 元'}}</div>
          </div>
        </van-cell>
      </van-list>
      <van-empty v-else />
    </van-pull-refresh>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeTab: "",
        refreshing: false,
        loading: false,
        finished: false,
        cur: 1,
        size: 10,
        list: []
      }
    },
    watch: {
      activeTab(newVal, oldVal) {
        this.refreshing = true
        this.refresh()
      }
    },
    created() {
      this.refresh()
    },
    methods: {
      customBack() {
        this.$router.replace({ name: 'User' })
      },
      load() {
        let { cur, size } = this
        let params = { cur, size, all: false }
        if (this.activeTab == '1' || this.activeTab == '2') {
          params.type = this.activeTab
        }
        if (this.activeTab == '3') {
          let userId = this.$store.getters.userId
          params.userIds = [userId]
        }
        api.cp.buys(params).then(vo => {
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
      typeTo(id, type) {
        return { name: type == 2 ? 'CoBuySub' : 'BuyDetail', params: { id: id } }
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .fixed-top {
    top: 44px
  }
</style>
