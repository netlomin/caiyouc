<template>
  <component :is="" />
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      _back() {
        let f = this.$refs.routerView.customBack
        if (f) f()
        else this.$router.back()
      }
    }
  }
</script>
