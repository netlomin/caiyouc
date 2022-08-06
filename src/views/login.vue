<template>
  <div class="app-container">
    <van-nav-bar :title="$route.meta.title" fixed placeholder safe-area-inset-top @click-left="back">
      <div slot="left" class="flex-middle">
        <van-icon name="home-o" class="lg" />
      </div>
    </van-nav-bar>

    <c-panel margin="2rem 1rem">
      <van-tabs v-model="active" :line-width="4*rem">
        <van-tab title="账号登录">
          <van-form @submit="login" class="m-t_8">
            <van-field v-model="userName" name="userName" placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="passWord" name="passWord" type="password" placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field name="checkbox" :rules="[{ required: true, message: '请勾选同意《用户协议》' }]">
              <template #input>
                <van-checkbox v-model="checkbox" shape="square">
                  <span class="grey">请勾选同意<a>《用户协议》</a></span>
                </van-checkbox>
              </template>
            </van-field>
            <van-field>
              <template #input>
                <a-button block type="primary" htmlType="submit">登录</a-button>
              </template>
            </van-field>
          </van-form>
        </van-tab>
        <van-tab title="短信登录">
          <van-form @submit="login" class="m-t_8">
            <van-field v-model="userName" name="userName" placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="code" center clearable placeholder="验证码">
              <template #button>
                <a-button type="primary" size="small">发送验证码</a-button>
              </template>
            </van-field>
            <van-field name="checkbox" :rules="[{ required: true, message: '请勾选同意《用户协议》' }]">
              <template #input>
                <van-checkbox v-model="checkbox" shape="square">
                  <span class="grey">请勾选同意<a>《用户协议》</a></span>
                </van-checkbox>
              </template>
            </van-field>
            <van-field>
              <template #input>
                <a-button type="primary" htmlType="submit" block>注册 / 登录</a-button>
              </template>
            </van-field>
          </van-form>
        </van-tab>
      </van-tabs>
    </c-panel>
  </div>
</template>

<script>
  import cPanel from 'components/c-panel'

  export default {
    components: { cPanel },
    data() {
      return {
        active: 0,
        userName: '',
        passWord: '',
        code: '',
        checkbox: false
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      back() {
        this.$router.replace({ name: "Home" })
      },
      login() {

      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
