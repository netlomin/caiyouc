<template>
  <div>
    <c-panel
      margin=".1rem"
      :radius="6"
    >
      <div
        slot="head"
        class="center bold"
      >我的推广码</div>
      <div class="center">
        <vue-qr
          :text="url"
          :correctLevel="1"
          :size="200"
          colorDark="#168"
        />
      </div>
      <div
        slot="foot"
        class="red"
      >注意：邀请彩站扫码入驻，可以获得推广奖励。</div>
    </c-panel>

    <c-panel margin=".1rem">
      <div
        slot="head"
        class="red bold"
      >奖励规则</div>
      <div class="grey">
        <div>1、平台每月按彩站贡献收益，推广员等级给推广员发放收益分成。当月收益分成次月5号出账。</div>
        <div>2、当月彩站贡献收益包括服务费，广告收益等。</div>
        <div>3、当月推广员等级和分成比例参照下表：</div>
        <a-table
          :columns="columns"
          :data-source="data"
          size="small"
          :pagination="false"
        />
      </div>
    </c-panel>
  </div>
</template>

<script>
  import cPanel from 'components/c-panel'
  import VueQr from 'vue-qr'

  export default {
    components: { cPanel },
    data() {
      return {
        url: '',
        columns: [
          { title: '等级', dataIndex: 'level', key: 'level' },
          { title: '贡献收益彩站数', dataIndex: 'count', key: 'count' },
          { title: '分成比例', dataIndex: 'ratio', key: 'ratio' }
        ],
        data: [
          { key: 1, level: 1, count: '1~2', ratio: '10%' },
          { key: 2, level: 2, count: '3~4', ratio: '15%' },
          { key: 3, level: 3, count: '5~6', ratio: '20%' },
          { key: 4, level: 4, count: '6~7', ratio: '25%' },
          { key: 5, level: 5, count: '8~9', ratio: '30%' },
          { key: 6, level: 6, count: '9~10', ratio: '35%' },
          { key: 7, level: 7, count: '11~12', ratio: '40%' },
          { key: 8, level: 8, count: '13~14', ratio: '45%' },
          { key: 9, level: 9, count: '>=15', ratio: '50%' }
        ]
      }
    },
    created() {
      api.user.info({}).then(vo => {
        let url = 'https://1688.cpolar.cn/x/#/pages/open/register?'
        this.url = url + 'p=' + vo.passportId
      }).catch(api.catch)
    }
  }
</script>