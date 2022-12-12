<template lang="">
  <el-row>
    <el-col :span="22">
      <el-form :inline="true" label-width="auto">
        <el-form-item label="类别">
          <el-select placeholder="请选择" class="w-100"></el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-select placeholder="请选择" class="w-100"></el-select>
        </el-form-item>
        <el-form-item label="输入关键字">
          <el-input class="w-180" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="2">
      <router-link to="/infoDetails">
        <el-button type="danger" class="float-r">添加</el-button>
      </router-link>
    </el-col>
  </el-row>

  <el-table
    :border="true"
    ref="table"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" min-width="55" />
    <el-table-column property="title" label="标题" min-width="120" />
    <el-table-column property="category_name" label="类别" min-width="300" />
    <el-table-column property="createDate" label="日期" min-width="160" :formatter="toFormat" />
    <el-table-column property="status" label="状态" min-width="100">
      <template #default="scope">
        <el-switch
          v-model="scope.row.status"
          @change="handleChangeInfoStatus($event, scope.row)"
          :loading="scope.row.loading"
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column property="handle" label="操作" min-width="120">
      <template #default="scope">
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small" @click="handleDelInfo(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-row class="mt-30">
    <el-col :span="6">
      <el-button
        type="danger"
        :disabled="selectData ? false : true"
        @click="handleDelInfo(selectData)"
      >
        批量删除
      </el-button>
    </el-col>
    <el-col :span="18">
      <el-pagination
        class="float-r"
        :current-page="paginationData.currentPage"
        :page-size="paginationData.pageSize"
        :page-sizes="paginationData.pageSizes"
        :small="paginationData.small"
        :disabled="paginationData.disabled"
        :background="paginationData.background"
        layout="total, sizes, prev, pager, next,jumper"
        :total="paginationData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-col>
  </el-row>
</template>
<script setup>
import { reactive, onBeforeMount, ref, getCurrentInstance } from 'vue'
import { getInfoList, changeInfoStatus, delInfo } from '@a/info.js'
import { formatDate } from '@u/date.js'
const { proxy } = getCurrentInstance()
// const topMenu = reactive({
//   infoCategory: ''
// })
const paginationData = reactive({
  currentPage: 1,
  small: false,
  disabled: false,
  background: false,
  pageSize: 10,
  pageSizes: [1, 5, 10],
  total: 0
})
const tableData = reactive([])
const selectData = ref('')
const handleSelectionChange = val => {
  // console.log(val)
  const listIDs = val.map(item => item.id).join()
  selectData.value = listIDs
  console.log(listIDs)
}

const handleSizeChange = val => {
  console.log(`${val} items per page`)
  paginationData.pageSize = val
  paginationData.currentPage = 1
  handleGetInfoList()
}

const handleCurrentChange = val => {
  console.log(`current page: ${val}`)
  paginationData.currentPage = val
  handleGetInfoList()
}

const handleGetInfoList = () => {
  getInfoList({
    pageNumber: paginationData.currentPage,
    pageSize: paginationData.pageSize
  })
    .then(res => {
      console.log(res)
      const { current_page, data, total } = res.data
      paginationData.currentPage = current_page
      paginationData.total = total
      tableData.splice(0)
      data.forEach(item => {
        tableData.push(item)
      })
    })
    .catch(err => {
      console.log(err)
    })
}

const handleChangeInfoStatus = (val, row) => {
  row.loading = true
  row.status = !row.status
  changeInfoStatus({
    id: row.id,
    status: val
  })
    .then(res => {
      ElMessage.success(res.message)
      row.status = val
      row.loading = !row.loading
    })
    .catch(err => {
      console.log(err)
      row.loading = !row.loading
    })
}

const handleDelInfo = id => {
  proxy.delConfirm({
    fn() {
      return new Promise((resolve, reject) => {
        delInfo({
          id
        })
          .then(res => {
            resolve(res)
            ElMessage.success(res.message)
            handleGetInfoList()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  })
}

const toFormat = row => formatDate({ value: row.createDate * 1000 })
onBeforeMount(() => {
  handleGetInfoList()
})
</script>
<style lang="scss"></style>
