<!-- home -->
<template>
  <div>
    <van-cell-group :border="false">
      <van-cell>
        <div class="cell-head" slot="title">
          <van-icon name="gold-coin" :color="conf.themeColor" />
          <strong class="m-l-10">双色球</strong>
          <span class="sm grey">第2022076期</span>
          <span style="float: right">
            <label>截止剩余：</label>
            <van-count-down :time="time" class="inline" />
          </span>
        </div>
        <template #label>
          <div class="cell-body">
            <a-progress :width="1.6*rem" :percent="80" :success-percent="60" type="circle">
              <template #format="percent">
                <div class="sm bold">60%</div>
                <div class="xs grey">保底75%</div>
              </template>
            </a-progress>
            <span class="m-l-10">
              <h6 class="md">第一组</h6>
              <span class="sm inline w-6 van-ellipsis">今晚中大奖</span>
            </span>
          </div>
          <div class="cell-foot">
            <van-row>
              <van-col span="6" class="center">
                <h6 class="sm red">16000</h6>
                <span class="sm grey">总金额</span>
              </van-col>
              <van-col span="6" class="center">
                <h6 class="sm red">1.6</h6>
                <span class="sm grey">单份金额</span>
              </van-col>
              <van-col span="6" class="center">
                <h6 class="sm red">10000</h6>
                <span class="sm grey">总份数</span>
              </van-col>
              <van-col span="6" class="center">
                <h6 class="sm red">8000</h6>
                <span class="sm grey">剩余份数</span>
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
          <c-ball v-for="i in 12" :code="i" size="sm"></c-ball>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
  import cBall from 'components/c-ball'

  export default {
    components: { cBall },
    data() {
      return {
        time: 11.39 * 3600 * 1000
      }
    },
    computed: {},
    watch: {},
    created() {
      console.log(this.$route.params.id)
    },
    mounted() {},
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .van-cell-group {
    margin-top: .1rem;
  }

  .van-cell {
    padding: 0;
  }

  .van-cell__label {
    margin-top: 0;
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
</style>
