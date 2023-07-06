<template>
  <div>
    <!-- 轮播 -->
    <van-swipe
      :autoplay="5000"
      indicator-color="white"
      style="height: 4rem;"
    >
      <van-swipe-item
        v-for="(image, index) in images"
        :key="index"
      >
        <van-image
          width="10rem"
          height="4rem"
          :src="image"
          fit="fill"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 通知栏 -->
    <van-notice-bar
      left-icon="volume-o"
      :scrollable="false"
      class="m-tb-2"
    >
      <van-swipe
        vertical
        :style="{
          height: '.88rem',
          lineHeight: '.88rem'
        }"
        :autoplay="10000"
        :show-indicators="false"
      >
        <van-swipe-item>欢迎进入彩乐官方站，本站不提供选号预约服务！</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <!--列表-->
    <div class="p_2 p-tb_3 red bg_white bold">最新开奖</div>
    <c-panel
      v-for="item in list"
      :key="item.id"
      margin=".1rem"
      :radius="6"
    >
      <div class="m-tb_2 flex col-center row-between">
        <div class="flex col-center">
          <b>{{item.cpName}}</b>
          <van-tag
            v-if="today(item.nextOpenTime)"
            round
            type="danger"
          >今晚开奖</van-tag>
        </div>
        <div>
          <span class="grey sm">
            {{item.issue+'期｜'+item.openTime+'（'+week(item.week)+'）'}}
          </span>
        </div>
      </div>
      <div class="m-tb_4">
        <c-balls
          :areas="item.set.areas"
          size="sm"
          type="solid"
          margin=".1rem"
        />
      </div>
    </c-panel>
    <van-empty v-if="!list.length" />
  </div>
</template>

<script>
  import $cp from '@/utils/cp'
  import cPanel from 'components/c-panel'
  import cBalls from 'components/c-balls'

  export default {
    components: { cPanel, cBalls },
    data() {
      return {
        images: [
          'static/img/carousel.png',
        ],
        list: []
      }
    },
    created() {
      this.refresh()
    },
    methods: {
      today(d) {
        return dayjs().format('YYYY-MM-DD') == d
      },
      refresh() {
        api.cp.latestDraws().then(vo => {
          vo.forEach(e => $cp.enhance(e))
          this.list = vo
        }).catch(api.catch)
      }
    }
  }
</script>