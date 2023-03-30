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
  checkLogin({ commit, dispatch }, params) {
    api.ps.checkLogin().then(vo => {
      return dispatch(vo ? 'loadUser' : 'toLogin')
    }).catch(api.catch)
  },
  loadUser({ commit, dispatch }, params) {
    api.ps.user().then(user => {
      let userId = this.state.userId
      let passportId = this.state.passportId
      let shopId = this.state.shopId

      if (user.passportId == passportId && userId && userId != user.userId) {
        api.ps.selectShop({ shopId, save: false }).then(vo => {
          user.userId = userId
          user.shopId = shopId
          dispatch("forward", user)
        }).catch(api.catch((err) => {
          dispatch("forward", user)
        }))
      } else {
        dispatch("forward", user)
      }
    }).catch(api.catch)
  },
  forward({ commit, dispatch }, user) {
    dispatch("user", user)

    if (!user.shopId) {
      return router.push({ name: 'ShopSelect' })
    }
    return router.replace({ name: 'Home' })
  },
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
