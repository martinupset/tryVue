import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
      userId: undefined
    },
    getters: {
      getUserId: state => state.userId
    },
    mutations: {
      setUserId (state, payload){
        state.userId = payload
      }
    },
    plugins: [createPersistedState()]
  })