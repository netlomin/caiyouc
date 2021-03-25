import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app
  },
  getters,
  plugins: [createPersistedState()]
})

export default store
