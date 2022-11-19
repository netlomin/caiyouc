<template>
  <div>
    <van-tabs
      v-model="activeTab"
      :line-width="2.5*rem"
    >
      <van-tab
        title="所有"
        name="2"
      ></van-tab>
      <van-tab
        title="单购"
        name="0"
      ></van-tab>
      <van-tab
        title="合买"
        name="1"
      ></van-tab>
      <van-tab
        title="我发起"
        name="3"
      ></van-tab>
    </van-tabs>
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
          :to="buy.type?{name:'CoBuySub',params:{id:buy.id}}:{name:'BuyDetail',params:{id:buy.id}}"
          is-link
        >
          <div
            slot="icon"
            class=" flex-middle m-r-10"
          >
            <van-icon
              :size="rem"
              name="gold-coin"
              :color="$c.themeColor"
            />
          </div>
          <template #title>
            <b class="">{{buy.cpName}}</b>
          </template>
          <template #label>
            <span class="grey">{{buy.createTime}}</span>
          </template>
          <template #right-icon>
          </template>
          <div>
            <div>{{buy.statusDesc}}</div>
            <div>{{buy.amt+' 元'}}</div>
          </div>
        </van-cell>
      </van-list>
      <van-empty
        v-else
        description="暂无合买"
      />
    </van-pull-refresh>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeTab: "2",
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
        if (this.activeTab == '0' || this.activeTab == '1') {
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
          this.finished = true
          this.loading = false
        }).catch(this.caught)
      },
      refresh() {
        this.loading = true
        this.finished = false
        this.load()
      }
    }
  }
</script>
