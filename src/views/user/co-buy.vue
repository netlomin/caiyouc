<template>
  <div>
    <van-form>
      <van-field>
        <template #label>
          方案金额
        </template>
        <template #input>
          <span class="red">{{_amt}}</span>
        </template>
        <template #extra>
          <span>元</span>
        </template>
      </van-field>
      <van-field>
        <template #label>
          每份金额
        </template>
        <template #input>
          <span class="red">{{unitAmt}}</span>
        </template>
        <template #extra>
          <span>元</span>
        </template>
      </van-field>

      <van-cell-group class="m-t-6">
        <van-field label="我要认购">
          <template #input>
            <van-stepper
              v-model="soldCnt"
              :min="_minCnt"
              :max="_amt"
              :input-width="2*rem"
            />
          </template>
          <template #extra>
            <span>元</span>
          </template>
        </van-field>
        <van-field label="我要保底">
          <template #input>
            <van-stepper
              v-model="guardCnt"
              min="0"
              :max="_amt-soldCnt"
              :input-width="2*rem"
            />
          </template>
          <template #extra>
            <span>元</span>
          </template>
        </van-field>
      </van-cell-group>

      <van-cell-group class="m-t-6">
        <van-field label="保密设置">
          <template #input>
            <van-tabs
              v-model="visibility"
              type="card"
              :ellipsis="false"
              :color="$c.themeColor"
            >
              <van-tab name="0">
                <div
                  slot="title"
                  class="m-lr_3"
                >公开</div>
              </van-tab>
              <van-tab
                title="参与可见"
                name="1"
              ></van-tab>
              <van-tab
                title="停售可见"
                name="2"
              ></van-tab>
            </van-tabs>
          </template>
        </van-field>
        <van-field
          v-model.trim="title"
          rows="1"
          label="方案宣言"
          type="textarea"
          maxlength="32"
          placeholder="请输入方案宣言"
          autosize
          show-word-limit
        />
      </van-cell-group>

      <van-submit-bar :price="(soldCnt+guardCnt)*100">
        <template #button>
          <a-button
            type="primary"
            :disabled="(soldCnt+guardCnt)<=0"
            @click="clickSubmitBtn"
          >提交合买</a-button>
        </template>
      </van-submit-bar>
    </van-form>
  </div>
</template>

<script>
  import $cp from '@/utils/cp'

  export default {
    data() {
      return {
        play: null,
        cart: [],
        multiple: 1,
        unitAmt: 1,
        soldCnt: 0,
        guardCnt: 0,
        visibility: 1,
        title: '大吉大利，今晚吃鸡！'
      }
    },
    computed: {
      _sets() {
        return this.cart.map(pick => pick.set)
      },
      _cnt() {
        let areas = this.play.areas
        let cnt = 0
        this._sets.forEach(set => {
          let c = 1
          set.areas.forEach((a, i) => {
            let g = a.codesList[0].length
            let s = a.codesList[1].length
            c *= util.comb(s, areas[i].cnt - g)
          })
          cnt += c
        })
        return Math.trunc(cnt)
      },
      _amt() {
        return this._cnt * this.multiple * 2
      },
      _minCnt() {
        return Math.ceil(this._amt / 10)
      }
    },
    created() {
      let multiple = this.$route.query.multiple
      this.multiple = multiple ? multiple : 1
      this.cart = this.$store.getters.cart
      this.cart.forEach(pick => $cp.enhance(pick))
      this.play = this.$store.getters.play
      this.soldCnt = this._minCnt
      this.guardCnt = this._amt - this._minCnt
    },
    methods: {
      clickSubmitBtn() {
        if (this.cart.length >= 100) {
          this.$notify({ message: '单次提交最多99组号码！', background: '#FF1111' })
          return
        }

        let userId = this.$store.getters.userId
        this.api.user.act({ userId, actType: 'CASH' }).then(vo => {
          let amt0 = this.soldCnt + this.guardCnt
          if (vo.amt < amt0) {
            this.$dialog.alert({
              title: '提示',
              message: '余额不足，余额：<b class="red">' + vo.amt + '</b>元！',
            }).then(() => {})
          } else {
            this.$dialog.confirm({
              title: '提示',
              message: '总支付金额：<b class="red">' + amt0 + '</b>元，确认提交合买！',
            }).then((action) => {
              let cp = this.play.cp
              api.lot.issue({ cp }).then(vo => {
                let params = {
                  "issue": vo.issue,
                  "cp": cp,
                  "play": this.play.play,
                  "type": 2,
                  "cnt": this._cnt,
                  "amt": this._amt,
                  "code": this.code(),
                  "multiple": this.multiple,
                  "totalCnt": this._amt,
                  "unitAmt": this.unitAmt,
                  "soldCnt": this.soldCnt,
                  "guardCnt": this.guardCnt,
                  "visibility": this.visibility,
                  "title": this.title
                }
                api.cp.startBuy(params).then(vo => {
                  this.cart = []
                  this.$store.dispatch('setCart', this.cart)
                  this.$router.push({ name: 'BuyResult' })
                }).catch(api.catch)
              }).catch(api.catch)
            }).catch(() => {})
          }
        }).catch(api.catch)
      },
      code() {
        let sets = this.cart.map(pick => pick.set)
        return sets.length == 1 ? sets[0].code : sets.reduce((prev, cur) => {
          return (prev.code ? prev.code : prev) + '&' + cur.code
        })
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  /deep/ .van-tabs__nav--card {
    margin: 0;
  }
</style>
