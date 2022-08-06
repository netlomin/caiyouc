<template>
  <div class="app-container">
    <van-row>
      <van-col span="12">
        <div class="m-5">
          <a-button block>
            <van-icon name="add-o" />
            <span class="m-l-6">继续选号</span>
          </a-button>
        </div>
      </van-col>
      <van-col span="12">
        <div class="m-5">
          <a-button block>
            <van-icon name="delete-o" />
            <span class="m-l-6">清空选号</span>
          </a-button>
        </div>
      </van-col>
    </van-row>

    <div v-if="_picked">
      <van-cell v-for="set in _sets" :to="{name:'CombinOrder',params:{id:set.id}}" is-link>
        <div slot="icon" class="flex-middle m-r-10">
          <van-icon :size=".6*rem" name="close" color="#CCC" />
        </div>
        <template #title>
          <c-balls :areas="set.areas" type="none"></c-balls>
        </template>
      </van-cell>
    </div>
    <div v-else>
      <van-empty description="暂无选号" />
    </div>

    <div class="fixed-bottom p_2">
      <van-row>
        <van-col span="8" class="flex-center grey">
          <span>投</span>
          <van-stepper v-model="value" min="1" max="99" :button-size=".5*rem" />
          <span>倍</span>
        </van-col>
        <van-col span="8" class="sm flex-center">
          <div>
            <div class="grey">0注</div>
            <div class="red">0元</div>
          </div>
        </van-col>
        <van-col span="8" class="flex-center">
          <a-button type="primary" block @click="clickBuyBtn">发起合买</a-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import cBalls from 'components/c-balls'
  import pick from '@/mock/user/pick.json'
  import $cp from '@/utils/cp.js'

  export default {
    components: { cBalls },
    data() {
      return {
        pick: null,
        value: 1
      }
    },
    computed: {
      _picked() {
        return this.pick && this.pick.sets && this.pick.sets.length
      },
      _sets() {
        return this.pick ? this.pick.sets : null
      }
    },
    created() {
      this.init()
    },
    mounted() {},
    methods: {
      init() {
        let p = _.cloneDeep(pick)
        $cp.enhance(p)
        this.pick = p
      },
      clickBuyBtn() {
        this.$router.push({ name: 'CoBuy' })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .flex-center {
    height: 1.1rem;
  }
</style>
