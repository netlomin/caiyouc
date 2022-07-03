<template>
  <div :class="'c-ball ' + size + '_' + type" :style="_style">{{code}}</div>
</template>

<script>
  export default {
    name: 'c-ball',
    props: {
      code: { type: [Number, String], default: '0' },
      size: { type: String, default: 'md' },
      color: { type: String, default: '#FF8888' },
      type: { type: String, default: 'solid' }
    },
    data() { return {} },
    computed: {
      _style() {
        let style = {}
        switch (this.type) {
          case 'none':
            style.color = this.color
            break;
          case 'solid':
            style.color = '#FFF'
            style.backgroundColor = style.borderColor = this.color
            break;
          case 'plain':
            style.borderColor = style.color = this.color
            style.backgroundColor = '#FFF'
        }
        return style
      }
    },
    methods: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .c-ball {
    display: inline-block;
    text-align: center;
  }

  @each $size in $sizes {
    $i: index($sizes, $size);

    .#{$size}_none {
      font-size: nth($font-sizes, $i);
      width: nth($font-sizes, $i) * 1.6;
    }

    .#{$size}_solid,
    .#{$size}_plain {
      font-size: nth($font-sizes, $i);
      width: nth($font-sizes, $i) * 2 + 0.2rem;
      height: nth($font-sizes, $i) * 2 + 0.2rem;
      line-height: nth($font-sizes, $i) * 2 + 0.2rem;
      border-radius: nth($font-sizes, $i) * 2 + 0.2rem;
      border: 1px solid #FFF;
    }
  }
</style>
