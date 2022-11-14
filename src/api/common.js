import http from '@/utils/request.js'

export function getCode(data) {
  return http.request({
    method: 'POST',
    url: '/getCode/',
    data
  })
}
