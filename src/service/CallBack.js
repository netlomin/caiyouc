import { Toast } from 'vant'

export default (err, res) => {
  if (err) {
    const info = JSON.parse(JSON.stringify(err))
    let finalRes = err
    if (info && info.response) {
      finalRes = {
        code: info.response.status,
        message: info.response.status === 401 ? '登录失效，请重新登录' : info.response.statusText
      }
    }
    if (finalRes.code !== 401) {
      Toast.fail(finalRes.message)
    }
    if (finalRes.code === 401) {
      // 401退出登录暂时屏蔽
      // Toast.error(finalRes.message)
      // vueApp.$store.dispatch({
      //   type: 'Auth/clearUserInfo',
      // })
    }
    return finalRes
  }
  if (res.data.code) {
    Toast(res.data.msg)
    return {
      code: res.data.code,
      message: res.data.msg
    }
  }
  return res.data
}
