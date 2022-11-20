const setSession = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

const getSession = key => {
  return JSON.parse(window.sessionStorage.getItem(key))
}

const setLocal = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const getLocal = key => {
  return JSON.parse(window.localStorage.getItem(key))
}

export default {
  setSession,
  setLocal,
  getSession,
  getLocal
}
