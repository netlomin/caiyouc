import axios from 'axios'
import store from '@/store'

const currentEnv = _.cloneDeep(process.env)
const apiInstance = axios.create()
apiInstance.defaults.baseURL = currentEnv.VUE_APP_API_SERVER

apiInstance.interceptors.request.use(
  config => {
    console.log('config:', config)
    config.headers['X-token'] = store.getters.token
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
    login() {

    },
    logout() {
      return apiInstance.post(`ps/logout`)
    }
  },
  user: {
    info(params) {
      return apiInstance.post(`user/info`, params)
    }
  }
}
