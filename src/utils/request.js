import axios from 'axios'
import cookie from '@/utils/cookie'
import router from '@/router'
const { getToken, getUsername, removeToken, removeUsername } = cookie
const http = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000
})

http.interceptors.request.use(
  config => {
    const token = getToken()
    const username = getUsername()
    token ? (config.headers['Token'] = token) : ''
    username ? (config.headers['Username'] = username) : ''
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  res => {
    const data = res.data
    console.log(data)
    if (data.resCode === 0) {
      return data
    } else {
      ElMessage({
        type: 'error',
        message: data.message
      })
      return Promise.reject(data)
    }
  },
  err => {
    console.log(err)
    if (err.response.data.resCode === 1010) {
      router.replace({ name: 'Login' })
      removeToken()
      removeUsername()
    }
    return Promise.reject(err)
  }
)

export default http
