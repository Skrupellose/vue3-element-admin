import http from '@/utils/request.js'

export function getCode(data) {
  return http.request({
    method: 'POST',
    url: '/getCode/',
    data
  })
}

export function register(data) {
  return http.request({
    method: 'POST',
    url: '/register/',
    data
  })
}

export function login(data) {
  return http.request({
    method: 'POST',
    url: '/login/',
    data
  })
}

export function logout(data) {
  return http.request({
    method: 'POST',
    url: '/logout/',
    data
  })
}
