<template>
  <div class="c-balls">
    <template v-for="(area,i) in areas">
      <template v-for="(codes,j) in area.codesList">
        <template v-for="(code,k) in codes">
          <c-ball
            :code="code"
            :size="size"
            :type="type?type:(area.hit(code)?'solid':'plain')"
            :style="{margin:margin}"
            :color="area.color(j)"
          />
        </template>
      </template>
    </template>
  </div>
</template>

<script>
  import cBall from 'components/c-ball'

  export default {
    name: 'c-balls',
    components: { cBall },
    props: {
      areas: { type: Array, default: () => [] },
      size: { type: String, default: 'md' },
      type: { type: String, default: '' },
      margin: { type: String, default: '.05rem' }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .c-balls {
    margin: 0;
    text-align: left;
  }
</style>