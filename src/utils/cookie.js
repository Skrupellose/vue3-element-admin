import Cookies from 'js-cookie'

const TOKEN_KEY = 'adminToken'
const USERNAME_KEY = 'username'

const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

const setToken = val => {
  Cookies.set(TOKEN_KEY, val)
}

const removeToken = () => {
  Cookies.remove(TOKEN_KEY)
}

const getUsername = () => {
  return Cookies.get(USERNAME_KEY)
}

const setUsername = val => {
  Cookies.set(USERNAME_KEY, val)
}

const removeUsername = () => {
  Cookies.remove(USERNAME_KEY)
}

export default {
  getToken,
  setToken,
  removeToken,
  getUsername,
  setUsername,
  removeUsername
}
