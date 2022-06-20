import To from 'await-to-js'
import Callback from '@/services/CallBack'

export default class Dict {
  // 字典
  static async find(payload) {
    const [err, res] = await To(apiInstance.get(`/api/DicItem/getdicitembynameasync/${payload.name}`))
    return Callback(err, res)
  }
}
