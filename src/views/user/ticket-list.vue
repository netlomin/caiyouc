<template>
  <div class="app-container">
    <van-notice-bar
      left-icon="volume-o"
      :scrollable="false"
    >
      <van-swipe
        vertical
        :style="{
          height: '.88rem',
          lineHeight: '.88rem'
        }"
        :autoplay="5000"
        :show-indicators="false"
      >
        <van-swipe-item>请仔细核对彩票，发现问题请及时微信联系彩站补票！</van-swipe-item>
        <van-swipe-item>中奖金额由选号计算，彩站按照实际出票兑奖金额派奖！</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <c-panel v-if="_ticket&&buy">
      {{void (cp=$c.cp[buy.cp])}}
      <div
        slot="head"
        class="flex row-between"
      >
        <div class="flex col-center">
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
        <div>
          <div class="right grey">{{_ticket.statusDesc}}</div>
          <div
            v-if="_ticket.status==121"
            class="right sm red"
          >中奖{{_.round(_ticket.prizeAmt,2)}}元</div>
        </div>
      </div>
      <div class="grey">
        <van-row class="pick-set p-tb-4">
          <van-col
            span="3"
            class="grey"
          >购票：</van-col>
          <van-col span="21">
            <b class="red">{{_ticket.cnt}}</b>注
            <b class="red">x{{_ticket.multiple}}</b>倍
          </van-col>
        </van-row>
        <van-row class="pick-set p-tb-4">
          <van-col span="3">玩法：</van-col>
          <van-col
            span="21"
            class="red"
          >[{{play.name}}]</van-col>
        </van-row>
      </div>
      <van-cell-group
        slot="foot"
        :border="false"
      >
        <van-cell class="grey">
          <van-row v-for="(set,i) in _ticket.sets">
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
        </van-cell>
        <van-cell>
          <div
            v-if="_ticket.originalImgUrl"
            class="flex-center"
            @click="ImagePreview({
              images: [_ticket.originalImgUrl],
              showIndex: false
            })"
          >
            <van-image
              width="6rem"
              height="8rem"
              fit="contain"
              :src="_ticket.originalImgUrl"
              class="ticket-img"
            />
          </div>
          <van-empty
            v-else
            description="待出票"
          />
        </van-cell>
      </van-cell-group>
    </c-panel>

    <div class="fixed-bottom p_1">
      <div class="flex row-between">
        <div class="p-8">
          <a-button
            block
            :disabled="index<=0"
            @click="index--"
          >上一张</a-button>
        </div>
        <div class="grey">
          <b class="red">{{this.index+1}}</b>/<i>{{this.list.length}}</i>
        </div>
        <div class="p-8">
          <a-button
            block
            :disabled="index>=list.length-1"
            @click="index++"
          >下一张</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $cp from '@/utils/cp'
  import cPanel from 'components/c-panel'
  import cBalls from 'components/c-balls'

  export default {
    components: { cPanel, cBalls },
    data() {
      return {
        buyId: null,
        buy: null,
        play: {},
        draw: null,
        list: [],
        index: 0
      }
    },
    computed: {
      _ticket() {
        let t = this.list.length > this.index ? this.list[this.index] : null
        t && this.draw && t.draw(this.draw)
        return t
      }
    },
    created() {
      this.buyId = this.$route.params.buyId
      this.refresh()
    },
    methods: {
      refresh() {
        api.cp.buy({ id: this.buyId }).then(vo => {
          this.buy = vo

          api.lot.draws({
            cp: vo.cp,
            endIssue: vo.issue,
            startIssue: vo.issue
          }).then(draws => {
            if (draws.length) {
              let draw = draws[0]
              this.draw = draw
            }
          }).catch(api.catch)

          api.lot.play({
            cp: vo.cp,
            issue: vo.issue,
            play: vo.play
          }).then(play => {
            this.play = play
          }).catch(api.catch)
        }).catch(api.catch)

        api.cp.buyTickets({
          buyId: this.buyId
        }).then(vo => {
          vo.forEach(i => $cp.enhance(i))
          this.list = vo
        }).catch(api.catch)
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .ticket-img {
    border: 1px solid #F88;
  }
</style>
