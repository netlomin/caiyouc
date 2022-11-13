<template>
  <div
    v-if="buy"
    class="app-container"
  >
    <van-cell-group :border="false">
      <van-cell>
        <div
          slot="title"
          class="cell-body"
        >
          <van-icon
            name="gold-coin"
            :color="$c.themeColor"
            :size="1.2*rem"
          />
          <span class="m-l-10">
            <b>{{buy.cpName}}</b><br />
            <span class="sm grey">第{{buy.issue}}期</span>
          </span>
        </div>
        <div
          slot="right-icon"
          class="cell-body"
        >
          <span class="grey">{{buy.statusDesc}}</span>
        </div>
      </van-cell>
      <van-cell>
        <div class="cell-head grey">
          <van-row>
            <van-col
              span="2"
              class="p-tb-4"
            >单号</van-col>
            <van-col
              span="22"
              class="p-tb-4"
            >
              <b class="m-l-6">{{buy.id}}</b>
            </van-col>
          </van-row>
          <van-row>
            <van-col
              span="2"
              class="p-tb-4"
            >购票</van-col>
            <van-col
              span="22"
              class="p-tb-4"
            >
              <b class="red m-l-6">{{buy.cnt}}</b>注
              <b class="red">x{{buy.multiple}}</b>倍
              共<b class="red">{{buy.amt}}</b>元
            </van-col>
          </van-row>
          <van-row v-if="draw">
            <van-col
              span="2"
              class="p-tb-4"
            >开奖</van-col>
            <van-col span="22">
              <c-balls
                :areas="draw.set.areas"
                size="sm"
                type="solid"
              ></c-balls>
            </van-col>
          </van-row>
        </div>
      </van-cell>
    </van-cell-group>

    <van-cell-group :border="false">
      <van-cell is-link>
        <div
          class="cell-head"
          slot="title"
        >
          <span class="grey">选号信息</span>
        </div>
        <div
          slot="right-icon"
          class="cell-head grey"
        >
          <span>查看彩票</span>
          <van-icon name="arrow" />
        </div>
      </van-cell>
      <van-cell>
        <div class="pick-sets">
          <van-row
            v-for="(set, i) in buy.sets"
            class="pick-set"
          >
            <van-col
              span="2"
              class="grey p-tb-4"
            >{{i+1}}</van-col>
            <van-col span="22">
              <c-balls
                :areas="set.areas"
                size="sm"
              ></c-balls>
            </van-col>
          </van-row>
        </div>
      </van-cell>
    </van-cell-group>

    <div class="fixed-bottom p_2">
      <a-button
        type="primary"
        block
        @click="clickCopyBtn"
      >复制选号</a-button>
    </div>
  </div>
</template>

<script>
  import $cp from '@/utils/cp.js'
  import cBalls from 'components/c-balls'

  export default {
    components: { cBalls },
    data() {
      return {
        buy: null,
        draw: null
      }
    },
    created() {
      let id = this.$route.params.id
      api.cp.buy({ id }).then(vo => {
        $cp.enhance(vo)
        api.lot.draws({ cp: vo.cp, endIssue: vo.issue, startIssue: vo.issue }).then(draws => {
          if (draws.length) {
            let draw = draws[0]
            $cp.enhance(draw)
            this.draw = draw
            vo.draw(draw)
          }
          this.buy = vo
        }).catch(this.caught)
      }).catch(this.caught)
    },
    methods: {
      clickCopyBtn() {
        api.lot.plays({ cp: this.buy.cp }).then(vo => {
          vo.forEach(play => {
            if (play.play == this.buy.set.play) {
              play.text = play.name
              $cp.resolvePlay(play)
              this.$store.dispatch('setPlay', play)

              let cart = []
              this.buy.sets.forEach(set => {
                cart.push({ cp: set.cp, code: set.code })
              })
              this.$store.dispatch('setCart', cart)
              this.$router.push({ name: 'Cart' })
            }
          })
        }).catch(this.caught)
      }
    }
  }
</script>
<style
  lang="scss"
  scoped
>
  .van-cell-group {
    margin-top: .2rem;
  }

  .van-cell {
    padding: 0;
  }

  .van-cell__label {
    margin-top: 0;
  }

  .ant-table-wrapper {
    width: 100%;
  }

  .cell-head,
  .cell-body {
    padding: .2rem .4rem;
    border-bottom: 1px solid #EEE;
  }

  .cell-foot {
    padding: .2rem 0;
  }

  .cell-body {
    display: flex;
    align-items: center;
  }

  .tips {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pick-sets {
    padding: .2rem .4rem;
  }

  .pick-set {
    padding: .16rem 0;
  }
</style>
