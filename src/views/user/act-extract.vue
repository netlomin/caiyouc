<template>
  <div>
    <van-notice-bar
      left-icon="volume-o"
      text="请确保微信号正确，平台将通过微信联系您转账。"
    />
    <van-form @submit="submit">
      <van-field label="待提收益">
        <template #input>
          <span class="red">{{act.amt}}</span>
        </template>
      </van-field>
      <van-field
        v-model.trim="amt"
        type="number"
        label="提取金额"
        placeholder="请输入提取金额"
        :formatter="(v)=>fmtN(v,2,12,1)"
        :rules="[
          {required:true,message:'请输入提取金额'},
          {validator:(v)=>v>=10,message:'提取金额必须>=10'},
          {validator:(v)=>v<=act.amt,message:'待提收益不足'}
        ]"
      />
      <van-field
        v-model.trim="wechat"
        label="微信号"
        placeholder="请输入微信号"
        :rules="[
          {required:true,message:'请输入微信号'}
        ]"
      />
      <van-field>
        <template #input>
          <a-button
            type="primary"
            htmlType="submit"
            block
          >提交</a-button>
        </template>
      </van-field>
    </van-form>
  </div>
</template>

<script>
  import cPanel from 'components/c-panel'

  export default {
    components: { cPanel },
    data() {
      return {
        act: {},
        amt: null,
        wechat: null
      }
    },
    created() {
      this.refreshAct()
    },
    methods: {
      refreshAct() {
        api.user.act({ actType: 'PROFIT' }).then(vo => {
          this.act = vo
        }).catch(api.catch)
      },
      submit() {
        this.$dialog.confirm({
          title: '提示',
          message: `本次提取收益金额：<a class="red">${this.amt}</a>元`,
        }).then(() => {
          api.user.submitAudit({
            type: 5,
            userId: this.$store.getters.userId,
            amt: this.amt,
            adjustRemark: this.wechat
          }).then(vo => {
            this.$notify({ message: '提交成功！', background: '#11FF11' })
            this.refreshAct()
          }).catch(api.catch)
        }).catch(() => {})
      }
    }
  }
</script>

<style>
  .van-notify {
    top: 45px;
  }
</style>