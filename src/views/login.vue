<template>
  <div>
    <div class="h-1"></div>

    <div class="center">
      <van-image
        width="3rem"
        height="3rem"
        :round="true"
        src="static/img/logo.png"
        class="logo"
      />
    </div>

    <c-panel
      margin=".8rem 1.2rem"
      :radius="8"
      shadow="1px 1px 6px #F88"
    >
      <van-tabs
        v-model="active"
        :line-width="2.5*rem"
      >
        <van-tab title="密码登录">
          <van-form
            @submit="login"
            class="m-t_8"
          >
            <van-field
              v-model.trim="mobile"
              name="mobile"
              type="digit"
              maxlength="11"
              placeholder="手机号码"
              :rules="[{ required: true, message: '请输入手机号码' }]"
            />
            <van-field
              v-model.trim="passWord"
              name="passWord"
              type="password"
              placeholder="密码"
              :rules="[{ required: true, message: '请输入密码' }]"
            />
            <van-field
              name="check"
              :rules="[{ required: true, message: '请勾选同意《用户协议》' }]"
            >
              <template #input>
                <van-checkbox
                  v-model="check"
                  shape="square"
                >
                  <span class="grey">请勾选同意<a>《用户协议》</a></span>
                </van-checkbox>
              </template>
            </van-field>
            <van-field>
              <template #input>
                <a-button
                  block
                  type="primary"
                  htmlType="submit"
                >登录</a-button>
              </template>
            </van-field>
          </van-form>
        </van-tab>

        <van-tab title="短信登录">
          <van-form
            @submit="login"
            class="m-t_8"
          >
            <van-field
              v-model.trim="mobile"
              name="mobile"
              placeholder="手机号码"
              :rules="[{ required: true, message: '请输入手机号码' }]"
            />
            <van-field
              v-model.trim="code"
              name="code"
              maxlength="6"
              center
              clearable
              placeholder="验证码"
            >
              <template #button>
                <a-button
                  type="primary"
                  size="small"
                  @click="sendSms"
                  :disabled="disabled"
                >{{sendBtnTxt}}</a-button>
              </template>
            </van-field>
            <van-field
              name="check"
              :rules="[{ required: true, message: '请勾选同意《用户协议》' }]"
            >
              <template #input>
                <van-checkbox
                  v-model="check"
                  shape="square"
                >
                  <span class="grey">请勾选同意<a>《用户协议》</a></span>
                </van-checkbox>
              </template>
            </van-field>
            <van-field>
              <template #input>
                <a-button
                  type="primary"
                  htmlType="submit"
                  block
                >注册 / 登录</a-button>
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
    methods: {
      login(params) {
        this.$store.dispatch('login', params).then(vo => {
          this.$store.dispatch('loadUser')
        }).catch(api.catch(err => {
          if (err.msg) {
            this.$notify({ message: err.msg })
            return true
          }
        }))
      },
      sendSms() {
        if (!(this.mobile && this.mobile.length == 11)) {
          this.$notify('请输入手机号')
          return
        }
        this.disabled = true
        api.ps.sendMsg({ mobile: this.mobile }).then(vo => {
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
        }).catch(api.catch(err => {
          this.disabled = false
          if (err.msg) {
            this.$notify(err.msg)
            return true
          }
        }))
      }
    }
  }
</script>

<style>
  .logo {
    background: rgba(256, 118, 118, 1);
    box-shadow: 0 1px 8px 2px #F88;
  }
</style>
