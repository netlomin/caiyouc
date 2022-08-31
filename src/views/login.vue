<template>
  <div class="app-container">
    <van-nav-bar :title="$route.meta.title" fixed placeholder safe-area-inset-top>
    </van-nav-bar>

    <c-panel margin="2rem 1rem">
      <van-tabs v-model="active" :line-width="4*rem">
        <van-tab title="登录">
          <van-form @submit="login" class="m-t_8">
            <van-field v-model="mobile" name="mobile" placeholder="手机号码"
              :rules="[{ required: true, message: '请输入手机号码' }]" />
            <van-field v-model="passWord" name="passWord" type="password" placeholder="密码"
              :rules="[{ required: true, message: '请输入密码' }]" />
            <van-field name="check" :rules="[{ required: true, message: '请勾选同意《用户协议》' }]">
              <template #input>
                <van-checkbox v-model="check" shape="square">
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

        <van-tab title="注册">
          <van-form @submit="login" class="m-t_8">
            <van-field v-model="mobile" name="mobile" placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="code" name="code" center clearable placeholder="验证码">
              <template #button>
                <a-button type="primary" size="small" @click="sendSms" :disabled="disabled">{{sendBtnTxt}}</a-button>
              </template>
            </van-field>
            <van-field name="check" :rules="[{ required: true, message: '请勾选同意《用户协议》' }]">
              <template #input>
                <van-checkbox v-model="check" shape="square">
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
        sendBtnTxt: '发送验证码',
        active: 0,
        mobile: '',
        passWord: '',
        code: '',
        check: false,
        disabled: false
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      login(params) {
        this.$store.dispatch('login', params).then(vo => {
          api.ps.user().then(user => {
            this.$store.dispatch('user', user)
            this.$router.replace({ name: 'Home' })
          })
        }).catch(error => {
          if (this.caught(error)) return
          this.$notify({ message: error.msg })
        })
      },
      sendSms() {
        if (!(this.mobile && this.mobile.length == 11)) {
          this.$notify('请输入手机号')
          return
        }
        this.disabled = true
        api.ps.sendMsg({ mobile: this.mobile })
          .then(vo => {
            let a = 60
            let i = setInterval(() => {
              if (a <= 0) {
                this.sendBtnTxt = '发送验证码'
                this.disabled = false
                clearInterval(i)
                return
              }
              this.sendBtnTxt = a + '秒'
              a--
            }, 1000)
          })
          .catch(error => {
            this.disabled = false
            if (!this.caught(error)) {
              this.$notify(error.msg)
            }
          })
      }
    }
  }
</script>
<style>
  .van-notify {
    padding: .1rem;
    top: 45px;
  }
</style>
