<template>
  <div
    class="app-container"
    id="scroller"
  >
    <van-row>
      <van-col span="12">
        <div class="m-5">
          <a-button
            block
            @click="clickRandBtn"
          >
            <van-icon name="add-o" />
            <span class="m-l-6">机选5注</span>
          </a-button>
        </div>
      </van-col>
      <van-col span="12">
        <div class="m-5">
          <a-button
            block
            @click="clickClearBtn"
          >
            <van-icon name="delete-o" />
            <span class="m-l-6">清空选号</span>
          </a-button>
        </div>
      </van-col>
    </van-row>

    <div v-if="cart.length">
      <van-cell
        v-for="(set, index) in _sets"
        is-link
      >
        <div
          slot="icon"
          class="flex-middle m-r-10"
          @click="removePick(index)"
        >
          <van-icon
            :size=".6*rem"
            name="close"
            color="#CCC"
          />
        </div>
        <div
          slot="title"
          @click="editPick(index)"
        >
          <c-balls
            :areas="set.areas"
            type="none"
          ></c-balls>
        </div>
      </van-cell>
    </div>
    <div v-else>
      <van-empty description="暂无选号" />
    </div>

    <div class="fixed-bottom p_2">
      <van-row>
        <van-col
          span="16"
          class="sm flex-center"
        >
          <span class="grey m-r-8">{{_cnt}}注 {{multiple}}倍</span>
          <span class="red">共{{_cnt*multiple*2}}元</span>
        </van-col>
        <van-col
          span="8"
          class="flex-center grey"
        >
          <span>投</span>
          <van-stepper
            v-model="multiple"
            min="1"
            :max="$c.cp[play.cp].maxMultiple"
            :button-size=".5*rem"
          />
          <span>倍</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col
          span="8"
          class="flex-center grey"
        >
          <a-button
            block
            @click="clickCoBuyBtn"
            :disabled="!_cnt"
          >发起合买</a-button>
        </van-col>
        <van-col
          span="1"
          class="flex-center grey"
        >
        </van-col>
        <van-col
          span="15"
          class="flex-center"
        >
          <a-button
            type="primary"
            block
            @click="clickBuyBtn"
            :disabled="!_cnt"
          >提交订单</a-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import cBalls from 'components/c-balls'
  import $cp from '@/utils/cp'

  export default {
    components: { cBalls },
    data() {
      return {
        cart: [],
        multiple: 1,
        play: null
      }
    },
    computed: {
      _sets() {
        return this.cart.map(pick => pick.set)
      },
      _cnt() {
        let areas = this.play.areas
        let cnt = 0
        this._sets.forEach(set => {
          let c = 1
          set.areas.forEach((a, i) => {
            let g = a.codesList[0].length
            let s = a.codesList[1].length
            c *= util.comb(s, areas[i].cnt - g)
          })
          cnt += c
        })
        return Math.trunc(cnt)
      }
    },
    created() {
      this.cart = this.$store.getters.cart
      this.cart.forEach(pick => $cp.enhance(pick))
      this.play = this.$store.getters.play
    },
    mounted() {},
    methods: {
      customBack() {
        this.$router.push({ name: 'Pick' })
      },
      clickRandBtn() {
        let play = this.$store.getters.play
        for (let i = 1; i <= 5; i++) {
          let pick = $cp.randPick(play)
          this.cart.unshift(pick)
        }
        this.$store.dispatch('setCart', this.cart)
      },
      clickClearBtn() {
        this.cart = []
        this.$store.dispatch('setCart', this.cart)
      },
      removePick(index) {
        this.$delete(this.cart, index)
      },
      editPick(index) {
        this.$router.push({ name: 'Pick', query: { index } })
      },
      clickCoBuyBtn() {
        if (this.cart.length >= 100) {
          this.$notify({ message: '单次提交最多99组号码！', background: '#FF1111' })
          return
        }
        this.$router.push({ name: 'CoBuy', query: { multiple: this.multiple } })
      },
      clickBuyBtn() {
        if (this.cart.length >= 100) {
          this.$notify({ message: '单次提交最多99组号码！', background: '#FF1111' })
          return
        }

        let userId = this.$store.getters.userId
        this.api.user.act({ userId, actType: 'CASH' }).then(vo => {
          let amt = this._cnt * this.multiple * 2
          if (vo.amt < amt) {
            this.$dialog.alert({
              title: '提示',
              message: '购彩金额不足，余额：' + vo.amt + '元！',
            }).then(() => {})
          } else {
            this.$dialog.confirm({
              title: '提示',
              message: `购彩金额：<a class="red">${amt}</a> 元，确认提交订单！`,
            }).then((action) => {
              let cp = this.play.cp
              api.lot.issue({ cp }).then(vo => {
                let params = {
                  "issue": vo.issue,
                  "cp": cp,
                  "play": this.play.play,
                  "type": 1,
                  "amt": amt,
                  "cnt": this._cnt,
                  "code": this.code(),
                  "multiple": this.multiple
                }
                api.cp.startBuy(params).then(vo => {
                  this.cart = []
                  this.$store.dispatch('setCart', this.cart)
                  this.$router.push({ name: 'BuyResult' })
                }).catch(api.catch)
              }).catch(api.catch)
            }).catch(() => {})
          }
        }).catch(api.catch)
      },
      code() {
        let sets = this.cart.map(pick => pick.set)
        return sets.length == 1 ? sets[0].code : sets.reduce((prev, cur) => {
          return (prev.code ? prev.code : prev) + '&' + cur.code
        })
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .flex-center {
    height: 1.1rem;
  }
</style>
