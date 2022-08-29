import axios from 'axios'
import To from 'await-to-js'
import {
  Toast
} from 'vant'

const currentEnv = _.cloneDeep(process.env)
const apiInstance = axios.create()
apiInstance.defaults.baseURL = currentEnv.VUE_APP_API_SERVER

apiInstance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

apiInstance.interceptors.response.use(response => {
  return response
}, error => {
  if (error.code) {
    return Promise.reject(err)
  }

  let err = {
    ok: false,
    code: "net",
    msg: "程序/网络故障！",
    error
  }
  return Promise.reject(err)
})

export default {
  time() {
    return apiInstance.get(`/sys/time`)
  }
}
