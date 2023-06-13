<template>
  <div
    v-if="buy"
    class="app-container"
  >
    {{void (cp=$c.cp[buy.cp])}}
    <van-cell-group :border="false">
      <van-cell>
        <div
          slot="title"
          class="cell-body flex col-center"
        >
          <van-icon
            :name="cp.ico"
            class-prefix="cy"
            :color="cp.color"
            :size=".88*rem"
          />
          <div class="m-l-8">
            <b>{{buy.cpName}}</b>
            <div class="sm grey">第{{buy.issue}}期</div>
          </div>
        </div>
        <div
          slot="right-icon"
          class="cell-body"
        >
          <div>
            <div class="right grey">{{buy.statusDesc}}</div>
            <div
              v-if="buy.status==30"
              class="right sm red"
            >中奖{{_.round(buy.prizeAmt, 2)}}元</div>
            <div
              v-if="buy.status==130"
              class="right sm red"
            >奖金{{_.round(buy.awardAmt, 2)}}元</div>
          </div>
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
              class="p-tb-4 flex row-between"
            >
              <b class="m-l-6">{{buy.id}}</b>
              <div>
                <a @click="cpBuyId">[复制]</a>
              </div>
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
                :margin="3"
              />
            </van-col>
          </van-row>
        </div>
      </van-cell>
    </van-cell-group>

    <van-cell-group :border="false">
      <van-cell :is-link="buy.showTicket">
        <div
          slot="title"
          class="cell-head"
        >
          <b>玩法【</b>
          <b class="red">{{play.name}}</b>
          <b>】</b>
        </div>
        <div
          v-if="buy.showTicket"
          slot="right-icon"
          class="cell-head grey"
          @click="showTicket"
        >
          <span>查看彩票</span>
          <van-icon name="arrow" />
        </div>
      </van-cell>
      <van-cell>
        <div class="pick-sets">
          <van-row
            v-for="(set,i) in buy.sets"
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
                :margin="3"
              />
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
        draw: null,
        play: {}
      }
    },
    created() {
      let id = this.$route.params.id
      api.cp.buy({ id }).then(vo => {
        $cp.enhance(vo)
        this.buy = vo

        api.cp.draw({ cp: vo.cp, play: vo.play, issue: vo.issue }).then(draw => {
          if (draw) {
            $cp.enhance(draw)
            this.draw = draw
            vo.draw(draw)
          }
        }).catch(api.catch)

        api.lot.play({ cp: vo.cp, issue: vo.issue, play: vo.play }).then(play => {
          this.play = play
        }).catch(api.catch)
      }).catch(api.catch)
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
        }).catch(api.catch)
      },
      showTicket() {
        this.$router.push({ name: "TicketList", params: { buyId: this.buy.id } })
      },
      cpBuyId() {
        this.copyText(this.buy.id)
        this.$notify({ message: '复制成功', type: 'success' })
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
    line-height: 1.5;
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

<style>
  .van-notify {
    top: 45px;
  }
</style>