<template lang="">
  <el-switch
    v-model="initData.value"
    :loading="initData.loading"
    :before-change="handleChangeStatus"
  ></el-switch>
</template>
<script setup>
import { reactive, defineProps } from 'vue'
import { tableData } from '@a/common.js'
import ApiUrl from '@a/requestUrl'
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  config: {
    type: Object,
    default: () => {}
  }
})
const data = reactive(props.data)
const config = reactive(props.config)
const initData = reactive({
  value: data[config.prop],
  loading: false
})
const handleChangeStatus = () => {
  if (!data.id) return
  initData.loading = true
  const url = ApiUrl[config.url]?.status?.url
  const method = ApiUrl[config.url]?.status?.method || 'POST'
  return new Promise((resolve, reject) => {
    tableData({
      url,
      method,
      data: {
        id: data.id,
        status: !initData.value
      }
    })
      .then(res => {
        ElMessage.success(res.message)
        data.status = !data.status
        initData.loading = false
        resolve(true)
      })
      .catch(err => {
        console.log(err)
        initData.loading = false
        reject(false)
      })
  })
}
</script>
<style lang=""></style>
