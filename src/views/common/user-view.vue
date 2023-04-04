<template>
  <component :is="_is" />
</template>

<script>
  export default {
    computed: {
      _is() {
        let t = this.$store.getters.userType
        let path = this.$route.path
        path = t && t >= 80 ? path + '-1' : path
        return () => import(`@/views${path}`)
      }
    }
  }
</script>