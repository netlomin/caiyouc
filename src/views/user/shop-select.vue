<template>
  <div>
    <van-nav-bar
      title="选择彩站"
      right-text="添加彩站"
      fixed
      placeholder
      safe-area-inset-top
      left-arrow
      @click-left="clickLeft"
      @click-right="clickRight"
    ></van-nav-bar>

    <van-pull-refresh
      class="m-t-8"
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
          v-for="(item,index) in list"
          is-link
        >
          <div
            slot="icon"
            class="flex-middle m-r-10"
          >
            <a-avatar
              :src="item.avatarUrl"
              :size="2*rem"
            >{{firstChar(item.name)}}</a-avatar>
          </div>
          <template #title>
            <b class="">{{item.name}}</b>
          </template>
          <template #label>
            <span class="grey">地址：{{item.address}}</span>
          </template>
          <template #right-icon>
            <van-checkbox
              v-model="item.checked"
              @click="clickCheckbox(index)"
            ></van-checkbox>
          </template>
        </van-cell>
      </van-list>
      <van-empty v-else>
        <a-button
          type="primary"
          block
          @click="$router.push({ name: 'JoinShop' })"
        >添加彩站</a-button>
      </van-empty>
    </van-pull-refresh>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        prevPage: '',
        refreshing: false,
        loading: false,
        finished: false,
        cur: 1,
        size: 10,
        list: [],
        index: null
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => vm.prevPage = from.name)
    },
    created() {
      this.refresh()
      this.$root.$on('refreshShops', this.refresh)
    },
    methods: {
      clickLeft() {
        let shopId = this.$store.getters.shopId
        if (!shopId) {
          this.$store.dispatch('logout')
          return
        }
        if (!['Settings', 'User'].includes(this.prevPage)) {
          this.$router.replace({ name: 'Home' })
          return
        }
        this.$router.back()
      },
      clickRight() {
        this.$router.push({ name: 'JoinShop' })
      },
      clickCheckbox(index) {
        this.index = index
        api.ps.selectShop({ shopId: this.list[index].id }).then(vo => {
          this.list.forEach((e, i) => e.checked = i == index)
          api.ps.user().then(user => {
            this.$store.dispatch('user', user)
            if (!['Settings', 'User'].includes(this.prevPage)) {
              this.$router.replace({ name: 'Home' })
            }
          }).catch(api.catch)
        }).catch(api.catch)
      },
      load() {
        let { cur, size } = this
        api.ps.shops({ cur, size, all: true }).then(vo => {
          if (this.refreshing) {
            this.list = []
            this.refreshing = false
          }
          console.log(this.list)
          let shopId = this.$store.getters.shopId
          vo.forEach(e => e.checked = e.id == shopId)
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
