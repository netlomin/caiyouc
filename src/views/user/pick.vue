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
        class="flex col-center"
      >
        <a-button @click="popup=!popup">
          <b class="m-r-6 red">{{title}}</b>
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
      class="flex row-between p_1 p-tb_2 sm light-grey bg_white"
    >
      <div>
        <span>第{{issue.issue}}期</span>
        <span class="m-l_2 red">奖池{{simNum(draw.poolAmt)}}</span>
      </div>
      <div>
        <span>投注截止：</span>
        <van-count-down
          :time="issue.remainTime"
          format="DD天HH时mm分ss秒"
          class="sm red"
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
          class="flex col-center sm"
        >
          <span class="light-grey">上期开奖：</span>
          <div class="balls">
            <c-balls
              :areas="r5.datas[4].set.areas"
              size="sm"
              type="none"
            />
          </div>
        </div>
        <div
          slot="value"
          class="light-grey sm"
        >点击展开历史开奖</div>
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
                />
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
      />
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
                <van-icon
                  name="cart-o"
                  :badge="cart.length"
                />
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
          class="flex-center p-lr_2"
        >
          <a-button
            type="primary"
            block
            :disabled="!_cnt"
            @click="clickAddBtn"
          >{{index!=null?'保存选号蓝':'加入选号篮'}}</a-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import cBall from 'components/c-ball'
  import cBalls from 'components/c-balls'
  import cPick from 'components/c-pick'
  import $cp from '@/utils/cp'

  export default {
    components: { cBall, cBalls, cPick },
    data() {
      return {
        index: null,
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
        play: null,
        pick: null,
        cart: []
      }
    },
    created() {
      this.cart = this.$store.getters.cart
      this.cart.forEach(pick => $cp.enhance(pick))
      if (this.cart.length) {
        let pick = this.cart[0]
        this.items.forEach((item, i) => {
          if (item.cp == pick.cp) {
            this.activeIndex = i
          }
        })
      }
      let index = this.$route.query.index
      if ((index || index == 0) && index < this.cart.length) {
        this.index = index
      }
      this.loadPlays()
    },
    mounted() {},
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
    watch: {
      pick(val, old) {
        if (val == null) {
          $cp.cleanPick(this.play)
        } else {
          $cp.showPick(this.play, val)
        }
      }
    },
    methods: {
      back() {
        this.$router.replace({ name: 'User' })
      },
      clickTreeSelect(item) {
        this.popup = false
        this.reload()
        this.cart = []
        this.$store.dispatch('setCart', this.cart)
      },
      clickCartItem() {
        this.$store.dispatch('setPlay', this.play)
        this.$router.push({ name: 'Cart' })
      },
      clickRandItem() {
        this.pick = $cp.randPick(this.play)
      },
      clickAddBtn() {
        if (this.index == null) {
          let pick = $cp.getPick(this.play)
          this.cart.push(pick)
          this.$store.dispatch('setCart', this.cart)
          $cp.cleanPick(this.play)
        } else {
          let pick = $cp.getPick(this.play)
          this.cart.splice(this.index, 1)
          this.cart.unshift(pick)
          this.$store.dispatch('setCart', this.cart)
          this.$router.push({ name: 'Cart' })
        }
      },
      reload() {
        let item = this.items[this.activeIndex]
        let subItem = item.children.filter(i => this.activeId == i.id)[0]
        this.title = item.text + '-' + subItem.text

        api.lot.issue(item.cp).then(vo => {
          vo.remainTime = dayjs(vo.stopTime).diff(dayjs())
          this.issue = vo
        }).catch(api.catch)
        api.lot.draws({ cp: item.cp, size: 1 }).then(vo => {
          this.draw = vo[0]
        }).catch(api.catch)

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
        }).catch(api.catch)

        let play = _.cloneDeep(subItem)
        $cp.resolvePlay(play)
        this.play = play
        this.$store.dispatch('setPlay', this.play)

        api.lot.stat({ cp: item.cp, stat: 'OMIT' }).then(vo => {
          vo = this.listTable(vo)[0]
          this.play.areas.forEach((area, i) => this.$set(area, 'omits', vo[i].datas[0]))
          this.pick = this.index == null ? null : this.cart[this.index]
        }).catch(api.catch)
      },
      loadPlays() {
        let play = this.cart.length ? this.cart[0].set.play : null
        this.items.forEach((item, i) => {
          api.lot.plays({ cp: item.cp }).then(vo1 => {
            vo1.forEach(v1 => {
              v1.text = v1.name
            })
            item.children = vo1
            vo1.forEach(v1 => {
              if (this.activeIndex == i && (play ? v1.play == play : this.activeId == v1.id)) {
                this.activeId = v1.id
                this.reload()
              }
            })
          }).catch(api.catch)
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
