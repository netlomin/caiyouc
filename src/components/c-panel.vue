<template>
  <div :style="_style">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'c-panel',
    props: {
      padding: { type: [Number, String], default: 0.2 },
      margin: { type: [Number, String], default: 0 },
      bg: { type: String, default: '#FFF' }
    },
    data() { return {} },
    computed: {
      _style() {
        let style = {}
        style.backgroundColor = this.bg
        style.padding = typeof this.padding == 'number' ? this.padding + 'rem' : this.padding
        style.margin = typeof this.margin == 'number' ? this.margin + 'rem' : this.margin
        return style
      }
    },
    methods: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
