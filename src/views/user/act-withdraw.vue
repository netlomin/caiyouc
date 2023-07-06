<template>
  <div>
    <van-notice-bar
      left-icon="volume-o"
      text="提交清账后，彩站会通过微信联系您转账。"
    />
    <van-form @submit="submit">
      <van-field label="可清余额">
        <template #input>
          <span class="red">{{cashAct.amt}}</span>
        </template>
      </van-field>
      <van-field
        v-model.trim="amt"
        type="number"
        label="清账金额"
        placeholder="请输入清账金额"
        :formatter="(v)=>fmtN(v,2,12,1)"
        :rules="[
          {required:true,message:'请输入清账金额'},
          {validator:(v)=>v>0,message:'清账金额必须大于0'},
          {validator:(v)=>v<=cashAct.amt,message:'可用余额不足'}
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
        cashAct: {},
        amt: null
      }
    },
    created() {
      this.refreshAct()
    },
    methods: {
      refreshAct() {
        api.user.act({ actType: 'CASH' }).then(act => {
          this.cashAct = act
        }).catch(api.catch)
      },
      submit() {
        this.$dialog.confirm({
          title: '提示',
          message: `确定提交清账（金额：<a class="red">${this.amt}</a>元）？`,
        }).then(() => {
          api.user.submitAudit({
            type: 2,
            userId: this.$store.getters.userId,
            amt: this.amt
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
