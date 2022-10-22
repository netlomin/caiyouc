<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.onLoad()
    },
    methods: {
      onLoad() {
        api.ps.user().then(vo => {
          let passportId = this.$store.getters.passportId
          let shopId = this.$store.getters.shopId
          if (vo.passportId == passportId && shopId) {
            return
          }
          this.$store.dispatch('user', vo)
          if (!vo.userId) {
            this.$router.push({ name: 'SelectShop' })
            return
          }
        }).catch(this.caught)
      }
    }
  }
</script>

<style lang="scss"></style>
