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

export function createCategoryInfo(data = {}) {
  return http.request({
    method: 'POST',
    url: '/news/add/',
    data
  })
}

export function getInfoList(data = {}) {
  return http.request({
    method: 'POST',
    url: '/news/getList/',
    data
  })
}

export function changeInfoStatus(data = {}) {
  return http.request({
    method: 'POST',
    url: '/news/status/',
    data
  })
}

export function delInfo(data = {}) {
  return http.request({
    method: 'POST',
    url: '/news/delete/',
    data
  })
}

export function getInfoDetail(data = {}) {
  return http.request({
    method: 'POST',
    url: '/news/detailed/',
    data
  })
}

export function editInfoDetail(data = {}) {
  return http.request({
    method: 'POST',
    url: '/news/editInfo/',
    data
  })
}
