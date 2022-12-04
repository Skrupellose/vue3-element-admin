import http from '@/utils/request.js'

export function firstCategoryAdd(data = {}) {
  return http.request({
    method: 'POST',
    url: '/news/addFirstCategory/',
    data
  })
}

export function getCategoryAll(data = {}) {
  return http.request({
    method: 'POST',
    url: '/news/getCategoryAll/',
    data
  })
}

export function childCategoryAdd(data = {}) {
  return http.request({
    method: 'POST',
    url: '/news/addChildrenCategory/',
    data
  })
}

export function categoryEdit(data = {}) {
  return http.request({
    method: 'POST',
    url: '/news/editCategory/',
    data
  })
}

export function categoryDel(data = {}) {
  return http.request({
    method: 'POST',
    url: '/news/deleteCategory/',
    data
  })
}

export function uploadFile(data = {}) {
  return http.request({
    method: 'POST',
    url: '/upload',
    data
  })
}
