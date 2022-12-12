import { ElMessageBox } from 'element-plus'
const globalFn = {}
globalFn.delConfirm = params => {
  ElMessageBox.confirm(params.message || '确定删除吗？删除后不可恢复', params.title || '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    type: 'warning',
    beforeClose(action, instance, done) {
      if (action === 'confirm') {
        const isFunction =
          params.fn && Object.prototype.toString.call(params.fn) === '[object Function]'
        instance.confirmButtonLoading = isFunction
        isFunction &&
          params
            .fn()
            .then(() => {
              instance.confirmButtonLoading = false
              done()
            })
            .catch(() => {
              instance.confirmButtonLoading = false
            })
      } else {
        done()
      }
    }
  })
    .then(() => {})
    .catch(() => {})
}

export default {
  install(app) {
    app.config.globalProperties['delConfirm'] = globalFn.delConfirm
  }
}
