<template>
  <div class="app-container">
    <div class="m-t_8 flex-col">
      <a-avatar
        :src="user.avatarUrl"
        :size="2.6*rem"
        :style="css.avatar"
      >{{firstChar(user.realName)}}</a-avatar>
      <a-upload
        class="m-t-8"
        list-type="picture"
        :action="$c.baseUrl+'/sys/upload'"
        :headers="headers"
        :data="data"
        :showUploadList="false"
        @change="uploadChange"
      >
        <a-button>上传头像</a-button>
      </a-upload>
    </div>

    <van-form @submit="submit">
      <c-panel
        margin=".5rem"
        :radius="6"
        shadow="1px 1px 6px #F88"
      >
        <van-field
          v-model.trim="user.nickName"
          name="nickName"
          label="昵称"
          placeholder="1-16个中英文字符"
          maxlength="16"
        />
        <van-field
          v-model.trim="user.wechat"
          name="webchat"
          label="微信"
          placeholder="请输入微信号"
          maxlength="16"
        />
        <van-field label="手机">
          <template #input>
            <span class="grey">{{user.mobile}}</span>
          </template>
        </van-field>
        <van-field label="姓名">
          <template #input>
            <span class="grey">{{user.realName}}</span>
          </template>
        </van-field>
        <van-field label="身份证">
          <template #input>
            <span class="grey">{{user.idCard}}</span>
          </template>
        </van-field>
      </c-panel>

      <div class="fixed-bottom">
        <van-field>
          <template #input>
            <a-button
              type="primary"
              htmlType="submit"
              block
            >保存</a-button>
          </template>
        </van-field>
      </div>
    </van-form>
  </div>
</template>

<script>
  import cPanel from 'components/c-panel'

  export default {
    components: { cPanel },
    data() {
      return {
        css: {
          avatar: { backgroundColor: $c.themeColor }
        },
        headers: { 'X-client': util.client().val },
        user: {},
      }
    },
    created() {
      api.user.info({}).then(user => {
        this.user = user
      }).catch(api.catch)
    },
    methods: {
      data(file) {
        return util.digest('file')
      },
      uploadChange(info) {
        let f = info.file
        if (!f.status || !(f.status == 'error' || f.status == 'done')) return
        let r = f.response
        if (!r || !r.code || r.code != 0) {
          this.$notify({ message: r && r.msg ? r.msg : '上传失败' })
          return
        }
        this.$set(this.user, 'avatar', r.data.id)
        this.$set(this.user, 'avatarUrl', r.data.url)
      },
      submit() {
        let { id, avatar, nickName, wechat } = this.user
        api.user.save({ id, avatar, nickName, wechat }).then(vo => {
          this.$notify({ message: '保存成功！', background: '#11FF11' })
        }).catch(api.catch)
      }
    }
  }
</script>

<style>
  .van-notify {
    top: 45px;
  }
</style>
