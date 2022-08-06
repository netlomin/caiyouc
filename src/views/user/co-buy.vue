<template>
  <div>
    <van-form @submit="submitPassWord">
      <van-field>
        <template #label>
          方案金额
        </template>
        <template #input>
          <span class="red">112</span>
        </template>
        <template #extra>
          <span>元</span>
        </template>
      </van-field>
      <van-field>
        <template #label>
          每份金额
        </template>
        <template #input>
          <span class="red">112</span>
        </template>
        <template #extra>
          <span>元</span>
        </template>
      </van-field>

      <van-cell-group class="m-t-6">
        <van-field v-model="totalCnt" name="totalCnt" label="我要分成" type="digit" placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }]">
          <template #extra>
            <span>份</span>
          </template>
        </van-field>
        <van-field v-model="totalCnt" name="totalCnt" label="我要认购" placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }]">
          <template #extra>
            <span>份</span>
          </template>
        </van-field>
        <van-field v-model="totalCnt" name="totalCnt" label="我要保底" placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }]">
          <template #extra>
            <span>份</span>
          </template>
        </van-field>
      </van-cell-group>

      <van-cell-group class="m-t-6">
        <van-field label="保密设置">
          <template #input>
            <van-tabs v-model="secrecy" type="card" :ellipsis="false" :color="conf.themeColor">
              <van-tab name="1">
                <div slot="title" class="m-lr_3">公开</div>
              </van-tab>
              <van-tab title="参与可见" name="2"></van-tab>
              <van-tab title="停售可见" name="3"></van-tab>
            </van-tabs>
          </template>
        </van-field>
        <van-field v-model="subTitle" rows="1" label="方案宣言" type="textarea" maxlength="50" placeholder="请输入方案宣言"
          autosize show-word-limit />
      </van-cell-group>

      <van-submit-bar :price="_amt" tip="提交后需联系店主付款，经店主审核后发布到大厅！">
        <template #button>
          <a-button :disabled="_disabledBuy" type="primary" size="small" @click="clickSubmitBtn">提交合买</a-button>
        </template>
      </van-submit-bar>
    </van-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        subTitle: '',
        totalCnt: 1,
        secrecy: '1'
      }
    },
    computed: {
      _amt() {
        return 0
      }
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      clickSubmitBtn() {
        this.$router.push({ name: 'CoBuyResult' })
      }
    }
  }
</script>
<style lang="scss" scoped>
  /deep/ .van-tabs__nav--card {
    margin: 0;
  }
</style>
