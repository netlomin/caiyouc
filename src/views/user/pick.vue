<template>
  <div class="app-container">
    <van-nav-bar fixed placeholder safe-area-inset-top left-arrow @click-left="back">
      <div slot="title" class="flex-middle">
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
        <div slot="title" class="flex-middle">
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

    <c-pick v-for="(area, index) in play.areas" :area="area" class="m-t-8"></c-pick>

    <div class="fixed-bottom p_2">
      <van-row>
        <van-col span="8">
          <van-grid :column-num="2" :border="false">
            <van-grid-item>
              <template #icon>
                <van-icon name="add-o" />
              </template>
              <div slot="text" class="sm">机选</div>
            </van-grid-item>
            <van-grid-item @click="clickCartItem">
              <template #icon>
                <van-icon name="cart-o" />
              </template>
              <div slot="text" class="sm">选号蓝</div>
            </van-grid-item>
          </van-grid>
        </van-col>
        <van-col span="8" class="sm flex-center">
          <div class="box">
            <div class="grey">0注</div>
            <div class="red">0元</div>
          </div>
        </van-col>
        <van-col span="8" class="flex-center">
          <div class="box">
            <a-button type="primary" block>加入选号篮</a-button>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import cBall from 'components/c-ball'
  import cBalls from 'components/c-balls'
  import cPick from 'components/c-pick'
  import $cp from '@/utils/cp.js'
  import r5Ret from '@/mock/user/r5.json'
  import playRet from '@/mock/user/play.json'

  export default {
    components: { cBall, cBalls, cPick },
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
        redCnt: 5,
        play: null
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

      let play = _.cloneDeep(playRet.data[0])
      $cp.resolvePlay(play)
      console.log(play)
      this.play = play
    },
    mounted() {},
    methods: {
      back() {
        this.$router.back()
      },
      clickItem(item) {
        this.title = this.items[this.activeIndex].text + '-' + item.text
        this.popup = false
      },
      clickCartItem() {
        this.$router.push({ name: 'Cart' })
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

  /deep/ .van-grid-item__content {
    padding: 0;
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

  .fixed-bottom {
    border-top: 1px solid #DDD;
  }

  .flex-center {
    height: 1.1rem;
  }
</style>
