// 兼容 IE
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import conf from '@/config'
import router from './router'
import store from './store'
import axios from 'axios'
import _ from 'lodash'
import dayjs from 'dayjs'
import eruda from 'eruda'
import fnMixin from './utils/fnMixins'

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
currentEnv.DEBUG = currentEnv.VUE_APP_DEBUG === 'true' || fnMixin.methods.urlParam('DEBUG')
// 开发环境配置调试
if (currentEnv.DEBUG) {
  eruda.init()
}
Vue.config.devtools = currentEnv.DEBUG
Vue.config.productionTip = !currentEnv.DEBUG

new Vue({
  router,
  store,
  render: h => {
    return h(App)
  }
}).$mount('#app')
const apiInstance = axios.create()
const eascInstance = axios.create()

const init = () => {
  apiInstance.defaults.baseURL = currentEnv.VUE_APP_API_SERVER
  eascInstance.defaults.baseURL = currentEnv.VUE_APP_EASC_SERVER
  _.assign(window, {
    conf,
    _,
    axios,
    apiInstance,
    eascInstance,
    dayjs,
    currentEnv,
    store
  })
  _.assign(Vue.prototype, {
    conf,
    _,
    dayjs,
    currentEnv
  })
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
