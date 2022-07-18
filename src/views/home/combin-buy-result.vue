<!-- home -->
<template>
  <div>
    <div v-if="order" class="app-container">
      <a-result status="success" title="申购完成" sub-title="30分钟内有效，请尽快联系店主购买！">
        <template #extra>
          <a-button key="homeBtn" class="md" @click="clickHomeBtn">首页</a-button>
          <a-button key="buyBtn" type="danger" class="md" @click="clickBuyBtn">联系店主</a-button>
        </template>
      </a-result>
    </div>
  </div>
</template>

<script>
  import mock from '@/mock/home/combin-order.json'

  export default {
    components: {},
    data() {
      return {
        order: null
      }
    },
    computed: {},
    watch: {},
    created() {
      console.log(this.$route.params.id)
      this.order = {}
    },
    mounted() {},
    methods: {
      clickHomeBtn() {
        this.$router.replace({ name: 'Home' })
      },
      clickBuyBtn() {
        let text = '1111'
        if (!navigator.share) {
          this.copyText(text)
          this.$toast({ message: '已复制申购信息，请前往微信联系店主！', position: 'top' })
        } else {
          let options = {
            url: 'http://www.baidu.com', // 获取当前网站
            text: text
          }
          navigator.share(options).then(() => {
            console.log('Share success')
          }).catch(err => {
            console.error('Share：', err)
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
