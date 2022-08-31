import axios from 'axios'
import md5 from 'md5'
import store from '@/store'

const currentEnv = _.cloneDeep(process.env)
const apiInstance = axios.create()
const key = '2c4e9851-32ac-40f1-b075-c33fade9acf6'
const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
let clientId = localStorage.getItem('client.id')
if (!clientId) {
  clientId = uuid()
  localStorage.setItem('client.id', clientId)
}
const client = '::' + clientId + ':::@::'
const digest = i => {
  const time = Math.trunc(Date.now() / 30000)
  const nonce = Math.trunc(Math.random() * 1000000)
  const sign = md5(key + clientId + nonce + i + time)
  return { nonce, sign }
}
apiInstance.defaults.baseURL = currentEnv.VUE_APP_API_SERVER
const spost = (url, s, params) => {
  let { nonce, sign } = digest(s)
  url = url + '?nonce=' + nonce + '&sign=' + sign
  return apiInstance.post(url, params)
}

apiInstance.interceptors.request.use(
  config => {
    console.log('config:', config)
    config.headers['X-token'] = store.getters.token
    config.headers['X-client'] = client
    return config
  },
  error => {
    console.log('request:error', error)
    return Promise.reject(error)
  })

apiInstance.interceptors.response.use(
  response => {
    console.log('response:', response)
    let { status, data } = response
    if (status != 200) {
      let err = { ok: false, msg: '程序/网络故障！' }
      err.code = 'HTTP_' + status
      return Promise.reject(error)
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
    console.log('response:error', error)
    error.ok = false
    error.msg = "程序/网络故障！"
    return Promise.reject(error)
  })

export default {
  time() {
    return apiInstance.post(`sys/time`)
  },
  ps: {
    sendMsg(params) {
      return spost('ps/send-msg', params.mobile, params)
    },
    login(params) {
      return apiInstance.post(`ps/login`, params)
    },
    codeLogin(params) {
      return apiInstance.post(`ps/code-login`, params)
    },
    user() {
      return apiInstance.post(`ps/user`)
    },
    setPassword(params) {
      return apiInstance.post(`ps/set-password`, params)
    },
    logout() {
      return apiInstance.post(`ps/logout`)
    }
  },
  user: {
    info(params) {
      return apiInstance.post(`user/info`, params)
    },
    act(params) {
      return apiInstance.post(`user/act`, params)
    },
  }
}
