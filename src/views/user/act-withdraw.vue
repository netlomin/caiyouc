<template>
  <div>
    <van-form @submit="submit">
      <van-field label="可用余额">
        <template #input>
          <span class="red">{{cashAct.amt}}</span>
        </template>
      </van-field>
      <van-field
        v-model.trim="amt"
        name="amt"
        type="number"
        label="清账金额"
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
  export default {
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
          this.amt = act.amt
        }).catch(api.catch)
      },
      submit() {
        api.user.submitAudit({
          type: 2,
          userId: this.$store.getters.userId,
          amt: this.amt
        }).then(vo => {
          this.$notify({ message: '提交成功！', background: '#11FF11' })
          this.refreshAct()
        }).catch(api.catch)
      }
    }
  }
</script>
