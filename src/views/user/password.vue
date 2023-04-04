<template>
  <div class="m-t-8">
    <van-form @submit="submitPassWord">
      <van-field
        v-model.trim="passWord"
        name="passWord"
        type="password"
        placeholder="密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <van-field
        v-model.trim="passWord2"
        name="passWord2"
        type="password"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请输入确认密码' }]"
      />
      <van-field>
        <template #input>
          <a-button
            type="primary"
            htmlType="submit"
            block
          >设置密码</a-button>
        </template>
      </van-field>
    </van-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        passWord: '',
        passWord2: ''
      }
    },
    methods: {
      submitPassWord(params) {
        if (this.passWord != this.passWord2) {
          this.$notify('两次输入的密码不一致！')
          return
        }
        api.ps.setPassword(params).then(vo => {
          this.$notify({ message: '设置密码成功！', background: '#11FF11' })
        }).catch(api.catch)
      }
    }
  }
</script>