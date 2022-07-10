<!-- home -->
<template>
  <div>
    <div v-if="order" class="app-container">
      <van-cell-group :border="false">
        <van-cell>
          <div class="cell-head" slot="title">
            <van-icon name="gold-coin" :color="conf.themeColor" />
            <strong class="m-l-10">{{order.cpName}}</strong>
            <span class="sm grey">第{{order.issue}}期</span>
            <span style="float: right">
              <label>截止剩余：</label>
              <van-count-down :time="order.remainTime" class="inline" />
            </span>
          </div>
          <template #label>
            <div class="cell-body">
              <a-progress :width="1.6*rem" :percent="order.percent" :success-percent="order.soldPercent" type="circle">
                <template #format="percent">
                  <div class="sm bold">{{order.soldPercent}}%</div>
                  <div class="xs grey">保底{{order.guardPercent}}%</div>
                </template>
              </a-progress>
              <span class="m-l-10">
                <h6 class="md">{{order.title}}</h6>
                <span class="sm inline w-6 van-ellipsis">{{order.subtitle}}</span>
              </span>
            </div>
            <div class="cell-foot">
              <van-row>
                <van-col v-for="data in order.datas" span="6" class="center">
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
          <div class="cell-head" slot="title">
            <span class="grey">方案信息</span>
          </div>
          <template #label>
            <div v-if="order.visible!=2" class="tips"> {{order.tips}}</div>
            <div v-else class="pick-sets">
              <van-row v-for="(set, i) in order.pick.sets" class="pick-set">
                <van-col span="3">{{i}}</van-col>
                <van-col span="21">
                  <c-balls :areas="set.areas" size="xs"></c-balls>
                </van-col>
              </van-row>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group :border="false">
        <van-cell>
          <div class="cell-head" slot="title">
            <span class="grey">购买信息</span>
          </div>
          <template #label>
            <div class="cell-body">
              <a-table :columns="columns" :data-source="order.buys" size="small" :rowClassName="()=>'sm'"
                :pagination="false">
                <b slot="t1" class="sm">昵称</b>
                <b slot="t2" class="sm">份额</b>
                <b slot="t3" class="sm">金额</b>
                <b slot="t4" class="sm">时间</b>
                <span slot="time" slot-scope="text">{{dayjs(text).format('MM-DD HH:mm')}}</span>
              </a-table>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <van-submit-bar tip="申购后联系店主付款,店主确认购买成功!">
      <div>
        <span>申购份数</span>
        <van-stepper v-model="cnt" theme="round" button-size="22" disable-input />
      </div>
      <template #button>
        <van-button :color="conf.themeColor" size="small">申购</van-button>
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
          { slots: { title: 't1' }, dataIndex: 'actName' },
          { slots: { title: 't2' }, dataIndex: 'cnt' },
          { slots: { title: 't3' }, dataIndex: 'amt' },
          { slots: { title: 't4' }, dataIndex: 'createTime', scopedSlots: { customRender: 'time' } }
        ],
        order: null,
        cnt: 0
      }
    },
    computed: {},
    watch: {},
    created() {
      console.log(this.$route.params.id)
      mock.remainTime = dayjs(mock.stopTime).diff(dayjs())
      mock.datas = [
        { val: mock.totalAmt, text: '总金额' },
        { val: mock.amt, text: '每份金额' },
        { val: mock.totalCnt, text: '总份数' },
        { val: mock.totalCnt - mock.soldCnt, text: '剩余份数' }
      ]
      mock.percent = Math.round((mock.guardCnt + mock.soldCnt) / mock.totalCnt * 100)
      mock.guardPercent = Math.round(mock.guardCnt / mock.totalCnt * 100)
      mock.soldPercent = Math.round(mock.soldCnt / mock.totalCnt * 100)
      mock.tips = mock.visible == 0 ? '截止后可见' : mock.visible == 1 ? '参与者可见' : ''
      mock.buys.forEach(buy => { buy.key = buy.id })
      $cp.enhance(mock.pick)
      this.order = mock
    },
    mounted() {},
    methods: {}
  }
</script>
<style lang="scss" scoped>
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
