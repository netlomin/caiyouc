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
          span="8"
          class="flex-center grey"
        >
          <span>投</span>
          <van-stepper
            v-model="multiple"
            min="1"
            max="99"
            :button-size=".5*rem"
          />
          <span>倍</span>
        </van-col>
        <van-col
          span="8"
          class="sm flex-center"
        >
          <div>
            <div class="grey">{{_cnt}}注</div>
            <div class="red">{{_cnt*2}}元</div>
          </div>
        </van-col>
        <van-col
          span="8"
          class="flex-center"
        >
          <a-button
            type="primary"
            block
            @click="clickBuyBtn"
          >发起合买</a-button>
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
        multiple: 1
      }
    },
    computed: {
      _sets() {
        return this.cart.map(pick => pick.set)
      },
      _cnt() {
        let play = this.$store.getters.play
        let areas = play.areas
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
      clickBuyBtn() {
        // this.$router.push({ name: 'CoBuy' })
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
