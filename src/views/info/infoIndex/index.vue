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
    border
    ref="table"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" min-width="55" />
    <el-table-column property="name" label="名字" min-width="120" />
    <el-table-column property="address" label="地址" min-width="500" />
    <el-table-column property="date" label="日期" min-width="120" />
    <el-table-column property="handle" label="操作" min-width="120">
      <template #default="scope">
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-row class="mt-30">
    <el-col :span="6">
      <el-button type="danger">批量删除</el-button>
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
import { reactive } from 'vue'
const topMenu = reactive({
  infoCategory: ''
})
const paginationData = reactive({
  currentPage: 1,
  small: false,
  disabled: false,
  background: false,
  pageSize: 100,
  pageSizes: [10, 20, 100],
  total: 2000
})
const tableData = reactive([
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-08',
    name: 'Mike',
    address: 'No. 189, Grove St, Los Angeles'
  }
])

const handleSelectionChange = val => {
  console.log(val)
}
const handleSizeChange = val => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = val => {
  console.log(`current page: ${val}`)
}
</script>
<style lang="scss"></style>
