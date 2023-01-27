import axios from 'axios'
import md5 from 'md5'
import store from '@/store'
import { Toast } from 'vant'

const currentEnv = _.cloneDeep(process.env)
const apiInstance = axios.create()

apiInstance.defaults.baseURL = currentEnv.VUE_APP_API_SERVER
const spost = (url, s, params) => {
  let { nonce, sign } = util.digest(s)
  url = url + '?nonce=' + nonce + '&sign=' + sign
  return apiInstance.post(url, params)
}

apiInstance.interceptors.request.use(
  config => {
    config.headers['X-token'] = store.getters.token
    config.headers['X-client'] = util.client().val
    return config
  },
  error => {
    return Promise.reject(error)
  })

apiInstance.interceptors.response.use(
  response => {
    let { status, data } = response
    if (!(status == 200 || (data && data.code))) {
      let err = { ok: false, msg: '网络故障' }
      err.code = 'HTTP_' + status
      return Promise.reject(err)
    }

    if (data.ok) {
      return data.data
    }

    if (data.code == 1) {
      store.dispatch('toLogin')
    }
    return Promise.reject(data)
  },
  error => {
    let { status, data } = error.response
    if (!(data && data.code)) {
      let err = { ok: false, msg: '网络故障' }
      err.code = 'HTTP_' + status
      return Promise.reject(err)
    }

    if (data.code == 1) {
      store.dispatch('toLogin')
    }
    return Promise.reject(data)
  })

export default {
  time: () => apiInstance.post(`sys/time`),
  ps: {
    sendMsg: (params) => spost('ps/send-msg', params.mobile, params),
    checkLogin: () => apiInstance.post(`ps/check-login`),
    passport: () => apiInstance.post(`ps/passport`),
    login: (params) => apiInstance.post(`ps/login`, params),
    codeLogin: (params) => apiInstance.post(`ps/code-login`, params),
    user: () => apiInstance.post(`ps/user`),
    shops: (params) => apiInstance.post(`ps/shops`, params),
    joinShop: (params) => apiInstance.post(`ps/join-shop`, params),
    selectShop: (params) => apiInstance.post(`ps/select-shop`, params),
    setPassword: (params) => apiInstance.post(`ps/set-password`, params),
    saveIdentity: (params) => apiInstance.post(`ps/save-identity`, params),
    logout: () => apiInstance.post(`ps/logout`)
  },
  user: {
    info: (params) => apiInstance.post(`user/info`, params),
    save: (params) => apiInstance.post(`user/save`, params),
    act: (params) => apiInstance.post(`user/act`, params),
    allAct: (params) => apiInstance.post(`user/all-act`, params),
    actDetails: (params) => apiInstance.post(`user/act-details`, params),
    shop: (params) => apiInstance.post(`user/shop`, params),
    submitAudit: (params) => apiInstance.post(`user/submit-audit`, params)
  },
  lot: {
    issue: (cp) => apiInstance.post('lot/issue', { cp }),
    plays: (params) => apiInstance.post('lot/plays', params),
    trend: (params) => apiInstance.post('lot/trend', params),
    draws: (params) => apiInstance.post('lot/draws', params),
    stat: (params) => apiInstance.post('lot/stat', params)
  },
  cp: {
    startBuy: (params) => apiInstance.post('cp/start-buy', params),
    buy: (params) => apiInstance.post('cp/buy', params),
    buys: (params) => apiInstance.post('cp/buys', params),
    subBuy: (params) => apiInstance.post('cp/sub-buy', params),
    coBuys: (params) => apiInstance.post('cp/co-buys', params),
    buySubs: (params) => apiInstance.post('cp/buy-subs', params),
    buyTickets: (params) => apiInstance.post('cp/buy-tickets', params),
    checkBuyTicket: (params) => apiInstance.post('cp/check-buy-ticket', params)
  },
  catch: (obj) => {
    let type = typeof obj
    let handler = (err) => {
      if (type === 'function' && obj(err)) {
        return
      }
      if (typeof err.msg == 'string') {
        if (err.msg.length <= 4) {
          Toast.fail(err.msg)
        } else {
          Toast({ message: err.msg })
        }
        return
      }
      console.log('未知错误', err)
      Toast.fail('未知错误')
    }
    return type === 'undefined' || type === 'function' ? handler : handler(obj)
  }
}
