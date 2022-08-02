<template>
  <div v-if="area" class="c-pick">
    <van-cell>
      <div slot="title" class="cell-title">
        <b class="md red">{{area.desc}}</b>
        <span class="sm grey">(请选至少{{area.cnt}}个号码)</span>
        <div class="cell-title__right">
          <span class="grey">机选</span>
          <van-stepper v-model="area.rndCnt" :min="area.cnt" :max="area.codes.length" disable-input
            :button-size=".5*rem" class="inline m-l-6" />
        </div>
      </div>
      <template #label>
        <van-grid :column-num="area.col" :border="false">
          <van-grid-item v-for="code in area.codes" :key="code">
            <template #icon>
              <c-ball :code="code" type="plain" size="md"></c-ball>
            </template>
            <div slot="text" class="sm center">
              <div class="light-grey">11</div>
              <div class="red">8</div>
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
    }
  }
</script>

<style lang="scss" scoped>
  .c-pick {}

  /deep/ .van-grid-item__content {
    padding: .1rem 0;
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
