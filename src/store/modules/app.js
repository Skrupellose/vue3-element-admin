import storge from '@u/storge'
import cookie from '@u/cookie'
import { login, logout } from '@a/common'
// const { getToken, removeToken, getUsername, removeUsername } = cookie
const state = {
  collapse: storge.getSession('collapse') || false,
  token: cookie.getToken() || '',
  username: cookie.getUsername() || ''
}
const getters = {
  getCollapseStatus(state) {
    return state.collapse
  },
  getUsername(state) {
    return state.username
  },
  getToken(state) {
    return state.token
  }
}
const mutations = {
  SET_COLLAPSE(state) {
    state.collapse = !state.collapse
    storge.setSession('collapse', state.collapse)
  },
  SET_TOKEN(state, val) {
    state.token = val
    val && cookie.setToken(val)
  },
  SET_USERNAME(state, val) {
    state.username = val
    val && cookie.setUsername(val)
  }
}
const actions = {
  loginAction(ctx, val) {
    return new Promise((resolve, reject) => {
      login(val)
        .then(res => {
          const { token, username } = res.data
          ctx.commit('SET_TOKEN', token)
          ctx.commit('SET_USERNAME', username)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  logoutAction(ctx) {
    return new Promise((resolve, reject) => {
      logout()
        .then(res => {
          cookie.removeToken()
          cookie.removeUsername()
          ctx.commit('SET_TOKEN', '')
          ctx.commit('SET_USERNAME', '')
          resolve(res)
        })
        .catch(err => reject(err))
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
