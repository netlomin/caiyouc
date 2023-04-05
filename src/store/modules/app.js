import router from '@/router'
import md5 from 'md5'

const state = {
  token: '',
  passportId: '',
  userId: '',
  shopId: '',
  userType: ''
}

const mutations = {
  LOGIN(state, token) {
    state.token = token
  },
  SET_USER(state, user) {
    state.userId = user.id
    state.passportId = user.passportId
    state.shopId = user.shopId
    state.userType = user.type
  },
  LOGOUT(state, token) {
    state.token = ''
  }
}

const actions = {
  loadUser({ commit, dispatch }, params) {
    let { passportId, userId, shopId } = this.state
    api.ps.user({ passportId, userId, shopId }).then(vo => {
      commit('SET_USER', vo)
      if (!vo.passportId) {
        return dispatch('toLogin')
      }
      if (!vo.shopId) {
        return router.push({ name: 'ShopSelect' })
      }
      router.replace({ name: 'Home' })
    }).catch(api.catch)
  },
  toLogin({ commit }, params) {
    commit('LOGOUT')
    router.push({ name: "Login" })
  },
  login({ commit, dispatch }, params) {
    let method = 'login'
    if (params.code) {
      method = 'codeLogin'
    } else {
      params.passWord = md5(params.passWord)
    }
    return api.ps[method](params).then(vo => {
      commit('LOGIN', vo.token)
      dispatch('loadUser')
    })
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