import { getCategoryAll } from '@a/info'
const actions = {
  getCategoryAction() {
    return new Promise((resolve, reject) => {
      getCategoryAll()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  actions
}
