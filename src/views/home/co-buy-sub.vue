<template>
  <div>
    <div
      v-if="coBuy"
      class="app-container"
    >
      {{void (cp=$c.cp[coBuy.cp])}}
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
              <b>{{coBuy.cpName}}</b>
              <div class="sm grey">第{{coBuy.issue}}期</div>
            </div>
          </div>
          <div
            slot="right-icon"
            class="cell-body"
          >
            <div>
              <div class="right grey">{{coBuy.statusDesc}}</div>
              <div
                v-if="coBuy.status==30"
                class="right sm red"
              >中奖{{_.round(coBuy.prizeAmt*coBuy.subCnt/coBuy.totalCnt,2)}}元</div>
              <div
                v-if="coBuy.status==130"
                class="right sm red"
              >奖金{{_.round(coBuy.awardAmt*coBuy.subCnt/coBuy.totalCnt,2)}}元</div>
            </div>
          </div>
        </van-cell>
        <van-cell>
          <div class="cell-body">
            <a-progress
              :width="1.6*rem"
              :percent="coBuy.percent"
              :success-percent="coBuy.soldPercent"
              type="circle"
            >
              <template #format="percent">
                <div class="sm bold">{{coBuy.soldPercent}}%</div>
                <div class="xs grey">保底{{coBuy.guardPercent}}%</div>
              </template>
            </a-progress>
            <span class="m-l-8">
              <h6 class="md">{{coBuy.userNickName}}</h6>
              <span class="sm inline grey">{{coBuy.title}}</span>
            </span>
          </div>
          <div class="cell-foot">
            <van-row>
              <van-col
                v-for="data in coBuy.datas"
                span="6"
                class="center sm"
              >
                <div class="red">{{data.val}}</div>
                <span class="grey">{{data.text}}</span>
              </van-col>
            </van-row>
          </div>
        </van-cell>
      </van-cell-group>

      <van-cell-group :border="false">
        <van-cell>
          <div
            slot="title"
            class="cell-head grey"
          >订单信息</div>
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
                <b class="m-l-6">{{coBuy.id}}</b>
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
                <b class="red m-l-6">{{coBuy.cnt}}</b>注
                <b class="red">x{{coBuy.multiple}}</b>倍
                共<b class="red">{{coBuy.amt}}</b>元
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
                />
              </van-col>
            </van-row>
          </div>
        </van-cell>
      </van-cell-group>

      <van-cell-group :border="false">
        <van-cell :is-link="coBuy.showTicket">
          <div
            slot="title"
            class="cell-head grey"
          >
            <span>玩法：{{coBuy.cpName}}【</span>
            <span class="red">{{play.name}}</span>
            <span>】</span>
          </div>
          <div
            v-if="_showTicket"
            slot="right-icon"
            class="cell-head grey"
            @click="showTicket"
          >
            <span>查看彩票</span>
            <van-icon name="arrow" />
          </div>
        </van-cell>
        <van-cell>
          <div
            v-if="_showPick"
            class="pick-sets"
          >
            <van-row
              v-for="(set, i) in coBuy.sets"
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
                />
              </van-col>
            </van-row>
          </div>
          <div
            v-else
            class="tips"
          >
            {{coBuy.tips}}
          </div>
        </van-cell>
      </van-cell-group>

      <van-cell-group :border="false">
        <van-cell>
          <div
            class="cell-head"
            slot="title"
          >
            <span class="grey">认购信息</span>
          </div>
          <template #label>
            <div class="cell-body">
              <a-table
                :columns="columns"
                :data-source="coBuy.subs"
                size="small"
                :rowClassName="()=>'sm'"
                :pagination="false"
              >
                <b
                  slot="t1"
                  class="sm grey"
                >昵称</b>
                <b
                  slot="t2"
                  class="sm grey"
                >份额</b>
                <b
                  slot="t3"
                  class="sm grey"
                >金额</b>
                <b
                  slot="t4"
                  class="sm grey"
                >时间</b>
                <span
                  slot="time"
                  slot-scope="text"
                >{{dayjs(text).format('MM-DD HH:mm')}}</span>
              </a-table>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <van-submit-bar
      v-if="_subable"
      :price="_amt"
    >
      <div class="flex-middle">
        <span>认购份数</span>
        <van-stepper
          v-model="cnt"
          min="0"
          :max="_max"
          theme="round"
          :button-size=".5*rem"
          integer
          class="inline m-l-6"
        />
      </div>
      <template #button>
        <a-button
          :disabled="_disabledBuy"
          type="primary"
          @click="subBuy"
        >提交</a-button>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
  import $cp from '@/utils/cp.js'
  import cBalls from 'components/c-balls'

  export default {
    components: { cBalls },
    data() {
      return {
        columns: [
          { slots: { title: 't1' }, dataIndex: 'userNickName' },
          { slots: { title: 't2' }, dataIndex: 'cnt' },
          { slots: { title: 't3' }, dataIndex: 'amt' },
          { slots: { title: 't4' }, dataIndex: 'createTime', scopedSlots: { customRender: 'time' } }
        ],
        coBuy: null,
        draw: null,
        play: {},
        cnt: 0
      }
    },
    computed: {
      _amt() {
        return this.coBuy ? this.coBuy.unitAmt * this.cnt * 100 : 0
      },
      _max() {
        return this.coBuy ? this.coBuy.totalCnt - this.coBuy.soldCnt : 0
      },
      _disabledBuy() {
        return this.cnt == 0
      },
      _subable() {
        return this.coBuy && this.coBuy.status < 100 && this.coBuy.remainTime > 0 && this.coBuy.totalCnt > this.coBuy
          .soldCnt
      },
      _showPick() {
        let userId = this.$store.getters.userId
        if (!this.coBuy) return false
        if (this.coBuy.userId == this.$store.getters.userId) return true
        if (this.coBuy.visibility == 0) return true
        if (dayjs(this.coBuy.stopTime).diff(dayjs()) <= 0) return true
        if (this.coBuy.visibility == 1 && this.coBuy.subs.some(s => s.userId == userId)) return true
        return false
      },
      _showTicket() {
        let userId = this.$store.getters.userId
        return this.coBuy.showTicket && this._showPick
      }
    },
    created() {
      let id = this.$route.params.id
      api.cp.buy({ id }).then(vo => {
        vo.remainTime = dayjs(vo.endTime).diff(dayjs())
        vo.percent = Math.round((vo.guardCnt + vo.soldCnt) / vo.totalCnt * 100)
        vo.guardPercent = Math.round(vo.guardCnt / vo.totalCnt * 100)
        vo.soldPercent = Math.round(vo.soldCnt / vo.totalCnt * 100)
        vo.datas = [
          { val: vo.totalCnt, text: '总金额' },
          { val: vo.unitAmt, text: '每份金额' },
          { val: vo.totalCnt, text: '总份数' },
          { val: vo.totalCnt - vo.soldCnt, text: '剩余份数' }
        ]
        vo.tips = vo.visibility == 0 ? '' : vo.visibility == 1 ? '参与者可见' : '停售后可见'
        $cp.enhance(vo)
        this.coBuy = vo

        api.lot.play({
          cp: vo.cp,
          issue: vo.issue,
          play: vo.play
        }).then(play => {
          this.play = play
        }).catch(api.catch)

        api.cp.buySubs({ buyId: id }).then(subs => {
          subs.forEach(sub => {
            sub.key = sub.id
            sub.amt = sub.cnt
          })
          this.$set(vo, 'subs', subs)

          let userId = this.$store.getters.userId
          this.$set(vo, 'subCnt', subs.reduce((prev, cur) => {
            prev = prev.cnt ? prev.cnt : prev
            return userId == cur.userId ? prev + cur.cnt : prev
          }))
          console.log(vo)
        }).catch(api.catch)

        api.lot.draws({ cp: vo.cp, endIssue: vo.issue, startIssue: vo.issue }).then(draws => {
          if (draws.length) {
            let draw = draws[0]
            $cp.enhance(draw)
            this.draw = draw
            vo.draw(draw)
          }
        }).catch(api.catch)
      }).catch(api.catch)
    },
    methods: {
      subBuy() {
        let amt = this.coBuy.unitAmt * this.cnt
        api.cp.subBuy({ buyId: this.coBuy.id, cnt: this.cnt, amt }).then(vo => {
          this.$router.push({ name: "SubBuyResult" })
        }).catch(api.catch)
      },
      showTicket() {
        this.$router.push({ name: "TicketList", params: { buyId: this.coBuy.id } })
      },
      cpBuyId() {
        this.copyText(this.coBuy.id)
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
