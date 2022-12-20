import { reactive } from 'vue'
import { tableData } from '@a/common.js'
import ApiUrl from '@a/requestUrl'
export function requestHook() {
  let requestConfig = {
    has: true,
    url: '',
    method: 'POST',
    data: {}
  }
  const requestData = reactive({
    data: [],
    total: 0,
    tableLoading: false,
    select: []
  })
  const requestFn = (data = {}) => {
    requestConfig = { ...requestConfig, ...data }
    if (!requestConfig.url) return
    if (!requestConfig.has) return
    const url = ApiUrl[requestConfig.url]?.list?.url
    const method = ApiUrl[requestConfig.url]?.list?.method || 'POST'
    return tableData({
      url,
      method,
      data: requestConfig.data
    })
  }

  const delFn = (data = {}) => {
    requestConfig = { ...requestConfig, ...data }
    if (!requestConfig.url) return
    if (!requestConfig.has) return
    const url = ApiUrl[requestConfig.url]?.delete?.url
    const method = ApiUrl[requestConfig.url]?.delete?.method || 'POST'
    return tableData({
      url,
      method,
      data: requestConfig.data
    })
  }

  return { requestFn, requestData, delFn }
}
