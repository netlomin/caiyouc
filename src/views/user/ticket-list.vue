<template>
  <div class="app-container">
    <van-cell-group
      v-if="_ticket && buy"
      :border="false"
    >
      <van-cell>
        <div slot="title">
          <span>
            <b>{{buy.cpName}}</b>
            <span class="sm grey m-l-6">第{{buy.issue}}期</span>
          </span>
        </div>
        <div
          slot="right-icon"
          class="grey"
        >
          <b class="red">{{this.index+1}}</b>/<i>{{this.list.length}}</i>
        </div>
      </van-cell>
      <van-cell>
        <div class="grey">
          <b class="red">{{_ticket.cnt}}</b>注
          <b class="red">x{{_ticket.multiple}}</b>倍
        </div>
        <div
          slot="right-icon"
          class="grey"
        >
          <span>{{_ticket.statusDesc}}</span>
        </div>
      </van-cell>
      <van-cell>
        <div class="grey">
          <van-row
            v-for="(set,i) in _ticket.sets"
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
              ></c-balls>
            </van-col>
          </van-row>
        </div>
      </van-cell>
      <van-cell>
        <div
          v-if="_ticket.originalImgUrl"
          class="flex-center"
        >
          <van-image
            width="10rem"
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

    <div class="fixed-bottom p_2">
      <van-row>
        <van-col span="6">
          <div class="p-8">
            <a-button
              block
              :disabled="index<=0"
              @click="index--"
            >上一张</a-button>
          </div>
        </van-col>
        <van-col span="6">
          <div class="p-8">
            <a-button
              type="primary"
              block
              :disabled="!(_ticket&&_ticket.status==10)"
              @click="checkTicket(11)"
            >错票</a-button>
          </div>
        </van-col>
        <van-col span="6">
          <div class="p-8">
            <a-button
              block
              :disabled="!(_ticket&&_ticket.status==10)"
              @click="checkTicket(20)"
            >对票</a-button>
          </div>
        </van-col>
        <van-col span="6">
          <div class="p-8">
            <a-button
              block
              :disabled="index>=list.length-1"
              @click="index++"
            >下一张</a-button>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import $cp from '@/utils/cp'
  import cBalls from 'components/c-balls'

  export default {
    components: { cBalls },
    data() {
      return {
        buyId: null,
        buy: null,
        list: [],
        index: 0
      }
    },
    computed: {
      _ticket() {
        return this.list.length > this.index ? this.list[this.index] : null
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
        }).catch(this.caught)
        api.cp.buyTickets({ buyId: this.buyId }).then(vo => {
          vo.forEach(i => $cp.enhance(i))
          this.list = vo
        }).catch(this.caught)
      },
      checkTicket(status) {
        api.cp.checkBuyTicket({ id: this._ticket.id, status }).then(vo => {
          this.index = Math.min(this.index + 1, this.list.length - 1)
        }).catch(this.caught)
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .ticket-img {
    border: 1px solid #EEE;
  }
</style>
