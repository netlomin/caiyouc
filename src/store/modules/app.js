import router from '@/router'
import md5 from 'md5'

const state = {
  token: '',
  passportId: '',
  userId: '',
  shopId: ''
}
const mutations = {
  LOGIN(state, token) {
    state.token = token
  },
  SET_USER(state, user) {
    state.passportId = user.passportId
    state.userId = user.userId
    state.shopId = user.shopId
  },
  LOGOUT(state, token) {
    state.token = ''
  }
}
const actions = {
  toLogin({ commit, dispatch }, params) {
    commit('LOGOUT')
    router.push({ name: "Login" })
  },
  login({ commit }, params) {
    let method = 'login'
    if (params.code) {
      method = 'codeLogin'
    } else {
      params.passWord = md5(params.passWord)
    }
    return api.ps[method](params)
      .then(vo => commit('LOGIN', vo.token))
  },
  user({ commit }, user) {
    commit('SET_USER', user)
  },
  logout({ commit, dispatch }) {
    dispatch('toLogin')
  }
}
export default {
  state,
  mutations,
  actions
}
