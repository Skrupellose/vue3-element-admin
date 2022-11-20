import axios from 'axios'
import { ElMessage } from 'element-plus'
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
    return Promise.reject(err)
  }
)

export default http
