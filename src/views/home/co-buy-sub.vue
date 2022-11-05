<!-- home -->
<template>
  <div>
    <div
      v-if="coBuy"
      class="app-container"
    >
      <van-cell-group :border="false">
        <van-cell>
          <div
            class="cell-head"
            slot="title"
          >
            <van-icon
              name="gold-coin"
              :color="$c.themeColor"
            />
            <strong class="m-l-10">{{coBuy.cpName}}</strong>
            <span class="sm grey">第{{coBuy.issue}}期</span>
            <span style="float: right">
              <label>截止剩余：</label>
              <van-count-down
                :time="coBuy.remainTime"
                class="inline"
              />
            </span>
          </div>
          <template #label>
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
              <span class="m-l-10">
                <h6 class="md">{{coBuy.userNickName}}</h6>
                <span class="sm inline w-6 van-ellipsis">{{coBuy.title}}</span>
              </span>
            </div>
            <div class="cell-foot">
              <van-row>
                <van-col
                  v-for="data in coBuy.datas"
                  span="6"
                  class="center"
                >
                  <h6 class="sm red">{{data.val}}</h6>
                  <span class="sm grey">{{data.text}}</span>
                </van-col>
              </van-row>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group :border="false">
        <van-cell>
          <div
            class="cell-head"
            slot="title"
          >
            <span class="grey">方案信息</span>
          </div>
          <template #label>
            <div
              v-if="coBuy.visibility"
              class="tips"
            > {{coBuy.tips}}</div>
            <div
              v-else
              class="pick-sets"
            >
              <van-row
                v-for="(set, i) in coBuy.sets"
                class="pick-set"
              >
                <van-col span="2">{{i}}</van-col>
                <van-col span="22">
                  <c-balls
                    :areas="set.areas"
                    size="sm"
                  ></c-balls>
                </van-col>
              </van-row>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group :border="false">
        <van-cell>
          <div
            class="cell-head"
            slot="title"
          >
            <span class="grey">购买信息</span>
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

    <van-submit-bar :price="_amt">
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
          @click="buy"
        >提交</a-button>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
  import mock from '@/mock/home/combin-order.json'
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
      }
    },
    created() {
      let id = this.$route.params.id
      api.cp.buy({ id }).then(vo => {
        vo.remainTime = dayjs(vo.stopTime).diff(dayjs())
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

        api.cp.buySubs({ buyId: id }).then(vo => {
          vo.forEach(sub => {
            sub.key = sub.id
            sub.amt = sub.cnt
          })
          this.$set(this.coBuy, 'subs', vo)
        }).catch(this.caught)
      }).catch(this.caught)
    },
    methods: {
      buy() {
        console.log(this.order.id, this.order.amt, this.cnt)
        this.$router.push({ name: "CombinResult", params: { id: 2 } })
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
