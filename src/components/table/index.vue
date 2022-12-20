<template lang="">
  <div>
    <el-table
      :data="requestData.data"
      :border="border"
      style="width: 100%"
      v-loading="requestData.tableLoading"
      element-loading-text="加载中，请稍后"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" v-if="config.selected" />
      <template v-for="item in tableHeader" :key="item.prop">
        <el-table-column
          v-if="item.type === 'switch'"
          :prop="item.prop"
          :label="item.label"
          :[item.widthType]="item.width"
        >
          <template #default="scope">
            <MySwitch :data="scope.row" :config="item"></MySwitch>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'function'"
          :prop="item.prop"
          :label="item.label"
          :[item.widthType]="item.width"
        >
          <template #default="scope">
            <div>{{ item.callback && item.callback(scope.row) }}</div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'slot'"
          :label="item.label"
          :[item.widthType]="item.width"
        >
          <template #default="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
            <el-button
              v-if="item.delete"
              type="danger"
              size="small"
              @click="handleDelInfo(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :[item.widthType]="item.width"
        />
      </template>
    </el-table>
    <el-row class="mt-30">
      <el-col :span="6">
        <el-button
          type="danger"
          v-if="config.batch_del"
          :disabled="!requestData.select.length"
          @click="handleDelInfo(requestData.select.join())"
        >
          批量删除
        </el-button>
      </el-col>
      <el-col :span="18">
        <MyPagination
          :paginationData="paginationData"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        ></MyPagination>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { reactive, ref, onBeforeMount, getCurrentInstance } from 'vue'
import { configHook } from './configHook'
import { requestHook } from './requestHook'
import MyPagination from '@/components/pagination'
import MySwitch from '@/components/switch'
const { proxy } = getCurrentInstance()
const { config, configInit } = configHook()
const { requestFn, requestData, delFn } = requestHook()
const props = defineProps({
  tableHeader: {
    type: Array,
    default: () => []
  },
  border: {
    type: Boolean,
    default: false
  },
  pageData: {
    type: Object,
    default: () => {}
  },
  config: {
    type: Object,
    default: () => {}
  },
  request: {
    type: Object,
    default: () => {}
  },
  delete: {
    type: Object,
    default: () => {}
  }
})
const emits = defineEmits(['onLoad'])

const tableHeader = reactive(props.tableHeader)
const border = ref(props.border)
const paginationData = reactive(props.pageData)
const request = reactive(props.request)
const del = reactive(props.delete)
const handleCurrentChange = val => {
  console.log('currentChange', val)
  request.data.pageNumber = val
  handleRequestData()
}
const handleSizeChange = val => {
  console.log('sizeChange', val)
  request.data.pageSize = val
  request.data.pageNumber = 1
  paginationData.pageSize = val
  handleRequestData()
}
const handleRequestData = (data = {}) => {
  request.data = { ...request.data, ...data }
  requestData.tableLoading = true
  console.log(request.data)
  requestFn(request)
    .then(res => {
      emits('onLoad', res.data)
      requestData.data = res.data.data
      requestData.total = res.data.total
      paginationData.total = res.data.total
      paginationData.currentPage = res.data.current_page
      requestData.tableLoading = false
    })
    .catch(err => {
      console.log(err)
      requestData.tableLoading = false
    })
}
const handleSelectionChange = val => {
  const listIDs = val.map(item => item.id)
  requestData.select = listIDs
}
const handleDelInfo = id => {
  console.log(del.url)
  proxy.delConfirm({
    fn() {
      return new Promise((resolve, reject) => {
        delFn({
          url: del.url,
          data: {
            id
          }
        })
          .then(res => {
            resolve(res)
            ElMessage.success(res.message)
            handleRequestData()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  })
}

defineExpose({
  handleRequestData
})
onBeforeMount(() => {
  configInit(props.config)
  handleRequestData()
})
</script>
<style lang=""></style>
