import router from '@/router'

const state = {
  token: ''
}
const mutations = {
  LOGIN(state, token) {
    state.token = token
  },
  LOGOUT(state, token) {
    state.token = ''
  }
}
const actions = {
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$api[params.passWord ? 'login' : 'codeLogin'](params).then(obj => {
        commit('login', obj.token)
        resolve(obj)
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout({ commit, dispatch }) {
    dispatch('toLogin')
  },
  toLogin({ commit, dispatch }, params) {
    commit('LOGOUT')
    router.push({ name: "Login" })
  }
}
export default {
  state,
  mutations,
  actions
}
