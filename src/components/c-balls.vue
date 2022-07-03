<template>
  <div class="c-balls">
    <template v-for="(area,i) in areas">
      <template v-for="(codes,j) in area.codesList">
        <template v-for="(code,k) in codes">
          <cy-ball :code="code" :size="size" :type="area.hit(code)?'solid':'plain'" class="m-4" :color="area.color(j)">
          </cy-ball>
        </template>
      </template>
    </template>
    </view>
</template>

<script>
  export default {
    name: 'c-balls',
    props: {
      areas: { type: Array, default: [] },
      size: { type: String, default: 'md' }
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .c-balls {
    margin: 0;
    text-align: left;
  }
</style>
