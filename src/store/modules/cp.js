const state = {
  cart: [],
  play: null
}
const mutations = {
  SET_CART(state, cart) {
    state.cart = cart.map(p => {
      let { cp, code } = p
      return { cp, code }
    })
  },
  SET_PLAY(state, play) {
    state.play = play
  }
}
const actions = {
  setCart({ commit }, cart) {
    commit('SET_CART', cart)
  },
  setPlay({ commit }, play) {
    commit('SET_PLAY', play)
  }
}
export default {
  state,
  mutations,
  actions
}
