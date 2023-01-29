<template>
  <div>
    <div class="m-t-8">
      <van-cell
        title="切换彩店"
        :to="{name:'ShopSelect'}"
        is-link
      >
        <div slot="icon">
          <van-icon
            name="shops"
            class-prefix="cy"
            class="red m-r_2"
          />
        </div>
      </van-cell>
      <van-cell
        title="设置密码"
        :to="{name:'Password'}"
        icon="lock"
        is-link
      >
        <div slot="icon">
          <van-icon
            slot="icon"
            name="lock"
            class="red m-r_2"
          />
        </div>
      </van-cell>
      <van-cell
        title="关于"
        :value="pkg.description+' v'+pkg.version"
      >
        <div slot="icon">
          <van-icon
            slot="icon"
            name="shield-o"
            class="red m-r_2"
          />
        </div>
      </van-cell>
    </div>

    <div class="fixed-bottom p_2">
      <a-button
        type="primary"
        block
        @click="clickLogoutBtn"
      >退出登录</a-button>
    </div>
  </div>
</template>

<script>
  import pkg from '/package.json'

  export default {
    data() {
      return {
        pkg: pkg
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      clickLogoutBtn() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
