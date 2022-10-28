<template>
  <div class="app-container">
    <van-nav-bar
      fixed
      placeholder
      safe-area-inset-top
      left-arrow
      @click-left="back"
    >
      <div
        slot="title"
        class="flex-middle"
      >
        <a-button @click="popup=!popup">
          <b class="m-r-6">{{title}}</b>
          <van-icon :name="'arrow-'+(popup?'up':'down')" />
        </a-button>
      </div>
    </van-nav-bar>
    <van-popup
      v-model="popup"
      position="top"
      duration="0"
      :overlay="false"
    >
      <van-tree-select
        :items="items"
        :main-active-index.sync="activeIndex"
        :active-id.sync="activeId"
        @click-item="clickTreeSelect"
      />
    </van-popup>

    <div
      v-if="issue&&draw"
      class="p_1 sm light-grey bg_white"
    >
      <span>第{{issue.issue}}期</span>
      <span class="m-l_2 red">奖池{{simNum(draw.poolAmt)}}</span>
      <div class="bar-right">
        <span>投注截止：</span>
        <van-count-down
          :time="issue.remainTime"
          format="DD天HH时mm分ss秒"
        />
      </div>
    </div>

    <van-collapse
      v-if="r5"
      v-model="collapseActives"
    >
      <van-collapse-item name="1">
        <div
          slot="title"
          class="flex-middle"
        >
          <span class="light-grey">上期开奖：</span>
          <div class="balls">
            <c-balls
              :areas="r5.datas[4].set.areas"
              size="sm"
              type="none"
            ></c-balls>
          </div>
        </div>
        <template #value>点击展开历史开奖</template>
        <a-table
          :data-source="r5.datas"
          size="small"
          :pagination="false"
        >
          <a-table-column
            v-for="(head, index) in r5.heads"
            :key="head.name"
            :data-index="head.name"
          >
            <span
              slot="title"
              :class="'sm '+(index==0?'p-l_1':'')"
            >{{head.desc}}</span>
            <template slot-scope="text, record">
              <div
                v-if="head.view=='code'"
                class="balls"
              >
                <c-balls
                  :areas="record.set.areas"
                  size="sm"
                  type="none"
                ></c-balls>
              </div>
              <span
                v-else
                :class="'sm '+(index==0?'p-l_1':'')"
              >{{text}}</span>
            </template>
          </a-table-column>
        </a-table>
      </van-collapse-item>
    </van-collapse>

    <div v-if="play">
      <c-pick
        v-for="(area, index) in play.areas"
        :area="area"
        class="m-t-8"
      ></c-pick>
    </div>

    <div class="fixed-bottom p_2">
      <van-row>
        <van-col span="8">
          <van-grid
            :column-num="2"
            :border="false"
          >
            <van-grid-item @click="clickRandItem">
              <template #icon>
                <van-icon name="add-o" />
              </template>
              <div
                slot="text"
                class="sm"
              >机选</div>
            </van-grid-item>
            <van-grid-item @click="clickCartItem">
              <template #icon>
                <van-icon name="cart-o" />
              </template>
              <div
                slot="text"
                class="sm"
              >选号蓝</div>
            </van-grid-item>
          </van-grid>
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
          <div>
            <a-button
              type="primary"
              block
              @click="clickAddBtn"
            >加入选号篮</a-button>
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
          { cp: 'SSQ', text: '双色球', children: [{ id: 1, text: '普通' }] },
          { cp: 'KL8', text: '快乐8', children: [{ id: 2, text: '选十' }] }
        ],
        issue: null,
        draw: null,
        collapseActives: ['0'],
        r5: null,
        play: null
      }
    },
    created() {
      this.loadPlays()
    },
    mounted() {

    },
    computed: {
      _cnt() {
        if (!(this.play)) return 0
        let cnt = 1
        this.play.areas.forEach(area => {
          if (!area.picks) {
            cnt *= 0
            return
          }
          let size = area.picks.filter(i => i == 1).length
          let gallSize = area.picks.filter(i => i == 2).length
          cnt *= util.comb(size, area.cnt - gallSize)
        })
        return Math.trunc(cnt)
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      clickTreeSelect(item) {
        this.popup = false
        this.reload()
      },
      clickCartItem() {
        this.$router.push({ name: 'Cart' })
      },
      clickRandItem() {
        this.play.areas.forEach(area => {
          let gallCnt = 0
          area.picks.forEach((pick, i) => {
            if (pick == 1) {
              this.$set(area.picks, i, 0)
            }
            if (pick == 2) {
              gallCnt++
            }
          })
          let max = area.picks.length - 1
          for (let i = area.rndCnt - gallCnt; i >= 1;) {
            let r = _.random(0, max)
            if (area.picks[r] == 0) {
              this.$set(area.picks, r, 1)
              i--
            }
          }
        })
      },
      clickAddBtn() {

      },
      reload() {
        let item = this.items[this.activeIndex]
        let subItem = item.children.filter(i => this.activeId == i.id)[0]
        this.title = item.text + '-' + subItem.text

        api.lot.issue(item.cp).then(vo => {
          vo.remainTime = dayjs(vo.stopTime).diff(dayjs())
          this.issue = vo
        }).catch(this.caught)
        api.lot.draws({ cp: item.cp, size: 1 }).then(vo => {
          this.draw = vo[0]
        }).catch(this.caught)

        api.lot.trend({ cp: item.cp, issues: 5 }).then(vo => {
          vo.datas.forEach((data, i) => {
            let obj = {}
            obj.key = data[0]
            vo.heads.forEach((head, j) => obj[head.name] = data[j])
            obj.cp = 'SSQ'
            $cp.enhance(obj)
            vo.datas[i] = obj
          })
          this.r5 = vo
        }).catch(this.caught)

        let play = _.cloneDeep(subItem)
        $cp.resolvePlay(play)
        this.play = play

        api.lot.stat({ cp: item.cp, stat: 'OMIT' }).then(vo => {
          vo = this.listTable(vo)[0]
          this.play.areas.forEach((area, i) => this.$set(area, 'omits', vo[i].datas[0]))
        }).catch(this.caught)
      },
      loadPlays() {
        this.items.forEach(item => {
          api.lot.plays({ cp: item.cp }).then(vo1 => {
            vo1.forEach(v1 => { v1.text = v1.name })
            item.children = vo1
            vo1.filter(v1 => this.activeId == v1.id).forEach(v1 => {
              this.reload()
            })
          }).catch(this.caught)
        })
      }
    }
  }
</script>
<style
  lang="scss"
  scoped
>
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
