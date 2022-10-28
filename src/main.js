// 兼容 IE
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import $c from '@/config'
import router from './router'
import store from './store'
import _ from 'lodash'
import util from './utils/util'
import dayjs from 'dayjs'
// import eruda from 'eruda'
import mixin from './utils/mixin'
import api from '@/service/api'

// 全局引入按需引入UI库 vant
import '@/plugin/vant'
// 全局引入按需引入UI库 ant-design-vue
import '@/plugin/ant-design-vue'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'

const currentEnv = _.cloneDeep(process.env)
currentEnv.DEBUG = currentEnv.VUE_APP_DEBUG === 'true' || mixin.methods.urlParam('DEBUG')
// 开发环境配置调试
if (currentEnv.DEBUG) {
  // eruda.init()
}
Vue.config.devtools = currentEnv.DEBUG
Vue.config.productionTip = !currentEnv.DEBUG

let JSONbig = require('json-bigint')({ storeAsString: true })
window.JSON = JSONbig
Vue.prototype.$notify.setDefaultOptions({ color: '#FFF', background: $c.themeColor })
const rem = screen.width / 10
const px = 10 / screen.width

const init = () => {
  _.assign(window, {
    $c,
    _,
    util,
    dayjs,
    currentEnv,
    store,
    rem,
    px,
    api
  })

  _.assign(Vue.prototype, {
    $c,
    _,
    util,
    dayjs,
    currentEnv,
    rem,
    px,
    api
  })

  Vue.mixin(mixin)

  const app = new Vue({
    router,
    store,
    render: h => {
      return h(App)
    }
  }).$mount('#app')

  _.assign(window, {
    app
  })
}

const url = './static/extraConfig.json'
axios.get(url).then(async extraConfigRes => {
  if (extraConfigRes && extraConfigRes.data) {
    _.assign(currentEnv, extraConfigRes.data)
    return init()
  }
  return init()
})
