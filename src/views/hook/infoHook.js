import { reactive } from 'vue'
import { getCategoryAll } from '@a/info'

export function categoryHook() {
  const categoryOpt = reactive({
    list: []
  })
  const handleGetCategoryAll = () => {
    getCategoryAll()
      .then(res => {
        categoryOpt.list = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
  return {
    categoryOpt,
    handleGetCategoryAll
  }
}
