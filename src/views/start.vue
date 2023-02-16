<template>
  <div class="bg">
    <img
      src="static/img/logo.png"
      :style="'margin-top:-.5rem;'"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      this.$store.dispatch('checkLogin')
    }
  }
</script>

<style scoped>
  .bg {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #E85858;
  }

  .bg img {
    position: absolute;
    width: 2.24rem;
    height: 2.24rem;
  }
</style>
