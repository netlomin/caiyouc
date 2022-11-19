<template>
  <div>
    <div class="app-container">
      <a-result
        status="success"
        title="成功"
      >
        <template #extra>
          <a-button
            key="homeBtn"
            class="md"
            @click="clickHomeBtn"
          >前往大厅</a-button>
          <a-button
            key="pickBtn"
            type="danger"
            class="md"
            @click="clickBuyListBtn"
          >我的代购</a-button>
        </template>
      </a-result>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      customBack() {
        this.$router.replace({ name: 'Cart' })
      },
      clickHomeBtn() {
        this.$router.replace({ name: 'Home' })
      },
      clickBuyListBtn() {
        this.$router.replace({ name: 'BuyList' })
        // if (!navigator.share) {
        //   this.copyText(text)
        //   this.$toast({ message: '已复制申购信息，请前往微信联系店主！', position: 'top' })
        // } else {
        //   let options = {
        //     url: 'http://www.baidu.com', // 获取当前网站
        //     text: text
        //   }
        //   navigator.share(options).then(() => {
        //     console.log('Share success')
        //   }).catch(err => {
        //     console.error('Share：', err)
        //   })
        // }
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
</style>
