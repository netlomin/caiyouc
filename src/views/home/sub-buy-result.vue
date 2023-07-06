<!-- home -->
<template>
  <div>
    <div class="app-container">
      <a-result
        status="success"
        title="成功"
      >
        <template #extra>
          <a-button
            key="buyBtn"
            class="md"
            @click="clickSubBtn"
          >我的彩单</a-button>
          <a-button
            key="homeBtn"
            type="primary"
            class="md"
            @click="clickHomeBtn"
          >前往大厅</a-button>
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
      clickHomeBtn() {
        this.$router.replace({ name: 'Home' })
      },
      clickSubBtn() {
        this.$router.replace({ name: 'BuyList' })
      }
    }
  }
</script>
<style
  lang="scss"
  scoped
>
</style>
