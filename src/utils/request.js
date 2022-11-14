import axios from 'axios'
const http = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000
})

http.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    return Promise.reject(err)
  }
)

export default http
