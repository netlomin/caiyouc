<template>
  <div
    v-if="area"
    class="c-pick"
  >
    <van-cell>
      <div
        slot="title"
        class="cell-title"
      >
        <b
          class="md"
          :style="{color:area.colors[1]}"
        >{{area.desc}}</b>
        <span class="sm grey">(请选至少{{area.cnt}}个号码)</span>
        <div class="cell-title__right">
          <span class="grey">机选</span>
          <van-stepper
            v-model="area.rndCnt"
            :min="area.cnt"
            :max="area.codes.length"
            disable-input
            :button-size=".5*rem"
            class="inline m-l-6"
          />
        </div>
      </div>
      <template #label>
        <van-grid
          :column-num="area.col"
          :border="false"
        >
          <van-grid-item
            v-for="(code, i) in area.codes"
            :key="code"
            @click="clickBall(i)"
          >
            <template #icon>
              <c-ball
                :code="code"
                :type="ballType(i)"
                :color="ballColor(i)"
                size="md"
              ></c-ball>
            </template>
            <div
              slot="text"
              class="sm center"
            >
              <div class="light-grey">{{area.omits[i]}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </template>
    </van-cell>
  </div>
</template>

<script>
  import cBall from 'components/c-ball'

  export default {
    name: 'c-pick',
    components: { cBall },
    props: {
      area: { type: Object, default: null },
      type: { type: String, default: '' }
    },
    data() {
      return {}
    },
    created() {
      this.init()
    },
    watch: {
      area(newData, oldData) {
        if (!this.area.picks) {
          this.init()
        }
      }
    },
    methods: {
      init() {
        if (!this.area.picks) {
          this.$set(this.area, 'picks', Array(this.area.codes.length).fill(0))
        }
        if (!this.area.omits) {
          this.$set(this.area, 'omits', Array(this.area.codes.length).fill('?'))
        }
      },
      ballType(i) {
        let picks = this.area.picks
        return picks[i] == 0 ? 'plain' : 'solid'
      },
      ballColor(i) {
        let picks = this.area.picks
        return this.area.colors[picks[i] == 0 ? 1 : 2 - picks[i]]
      },
      gallEnabled() {
        return this.area.gallEnabled && this.area.picks.filter(p => p == 2).length <= this.area.cnt - 2
      },
      clickBall(i) {
        let picks = this.area.picks
        if (this.gallEnabled()) {
          this.$set(picks, i, picks[i] >= 2 ? 0 : picks[i] + 1)
        } else {
          this.$set(picks, i, 1 - picks[i])
        }
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .c-pick {

    /deep/ .van-grid-item__content {
      padding: .06rem 0;
    }

    .cell-title {
      border-bottom: 1px solid #EEE;
      padding-bottom: .1rem;

      &__right {
        display: flex;
        justify-content: center;
        float: right;
      }
    }
  }
</style>
