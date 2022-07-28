<template>
  <div>
    <van-nav-bar fixed placeholder safe-area-inset-top left-arrow @click-left="back">
      <div slot="title" class="flex-center">
        <a-button @click="popup=!popup">
          <b class="m-r-6">{{title}}</b>
          <van-icon :name="'arrow-'+(popup?'up':'down')" />
        </a-button>
      </div>
    </van-nav-bar>
    <van-popup v-model="popup" position="top" duration="0" :overlay="false">
      <van-tree-select :items="items" :main-active-index.sync="activeIndex" :active-id.sync="activeId"
        @click-item="clickItem" />
    </van-popup>

    <div class="p_1 sm light-grey bg_white">
      <span>第2022001期</span>
      <span class="m-l_2 red">奖池20.00亿</span>
      <div class="bar-right">
        <span>投注截止：</span>
        <van-count-down :time="12.5*3600*1000" format="DD天HH时mm分ss秒" />
      </div>
    </div>

    <van-collapse v-if="r5" v-model="collapseActives">
      <van-collapse-item name="1">
        <div slot="title" class="flex-center">
          <span class="light-grey">上期开奖：</span>
          <div class="balls">
            <c-balls :areas="r5.datas[0].set.areas" size="sm" type="none"></c-balls>
          </div>
        </div>
        <template #value>点击展开历史开奖</template>
        <a-table :data-source="r5.datas" size="small" :pagination="false">
          <a-table-column v-for="(head, index) in r5.heads" :key="head.name" :data-index="head.name">
            <span slot="title" :class="'sm '+(index==0?'p-l_1':'')">{{head.desc}}</span>
            <template slot-scope="text, record">
              <div v-if="head.view=='code'" class="balls">
                <c-balls :areas="record.set.areas" size="sm" type="none"></c-balls>
              </div>
              <span v-else :class="'sm '+(index==0?'p-l_1':'')">{{text}}</span>
            </template>
          </a-table-column>
        </a-table>
      </van-collapse-item>
    </van-collapse>

    <van-cell class="m-t-8">
      <div slot="title" class="cell-title">
        <b class="md red">红球</b>
        <span class="sm grey">(请选至少6个号码)</span>
        <div class="cell-title__right">
          <span class="grey">机选</span>
          <van-stepper v-model="redCnt" disable-input :button-size=".5*rem" class="inline m-l-6" />
        </div>
      </div>
      <template #label>
        <van-grid :column-num="6" :border="false">
          <van-grid-item v-for="value in 6" :key="value">
            <template #icon>
              <c-ball :code="value"></c-ball>
            </template>
          </van-grid-item>
        </van-grid>
      </template>
    </van-cell>
  </div>
</template>

<script>
  import cBall from 'components/c-ball'
  import cBalls from 'components/c-balls'
  import $cp from '@/utils/cp.js'
  import r5Ret from '@/mock/user/r5.json'

  export default {
    components: { cBall, cBalls },
    data() {
      return {
        title: '双色球-普通',
        popup: false,
        activeIndex: 0,
        activeId: 1,
        items: [
          { text: '双色球', children: [{ id: 1, text: '普通' }] },
          { text: '快乐8', children: [{ id: 2, text: '选十' }] }
        ],
        collapseActives: ['0'],
        draws: [],
        r5: null,
        redCnt: 5
      }
    },
    computed: {},
    watch: {},
    created() {
      let r5 = _.cloneDeep(r5Ret.data)
      let heads = ['issue', 'code', 'odd', 'zone', 'ac']
      r5.heads.forEach((head, i) => {
        head.name = heads[i]
      })
      r5.datas.forEach((data, i) => {
        let obj = {}
        obj.key = data[0]
        r5.heads.forEach((head, j) => {
          obj[head.name] = data[j]
          this.$set(obj, head.name, data[j])
        })
        obj.cp = 'SSQ'
        $cp.enhance(obj)
        r5.datas[i] = obj
      })
      this.r5 = r5
    },
    mounted() {},
    methods: {
      back() {
        this.$router.back()
      },
      clickItem(item) {
        this.title = this.items[this.activeIndex].text + '-' + item.text
        this.popup = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .van-popup--top {
    top: 46px;
  }

  .van-count-down {
    display: inline-block;
    font-size: .3rem;
  }

  /deep/ .van-collapse-item .van-cell {
    padding: .2rem .1rem 0 .1rem;
    font-size: .3rem;
    line-height: 1.5;
  }

  /deep/ .van-collapse-item .van-cell__title {
    flex: 2.5;
  }

  /deep/ .van-collapse-item .van-cell__right-icon {
    font-size: .3rem;
    line-height: 1.5;
  }

  /deep/ .van-collapse-item__content {
    padding: 0;
  }

  /deep/ .ant-table-small>.ant-table-content>.ant-table-body {
    margin: 0;
  }

  /deep/ .ant-table td,
  /deep/ .ant-table th {
    padding: .1rem 0 !important;
  }

  .bar-right {
    display: inline-block;
    position: absolute;
    right: .1rem;
  }

  .balls {
    display: inline-block;
    width: 4.68rem;
  }

  .cell-title {
    border-bottom: 1px solid #EEE;

    &__right {
      display: flex;
      justify-content: center;
      float: right;
    }
  }
</style>
