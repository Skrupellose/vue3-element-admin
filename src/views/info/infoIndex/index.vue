<template lang="">
  <el-row>
    <el-col :span="22">
      <el-form :inline="true" label-width="auto">
        <el-form-item label="类别">
          <el-cascader
            v-model="filterData.category"
            :options="categoryOpt.list"
            :props="filterData.cascaderProps"
          />
        </el-form-item>
        <el-form-item label="关键字">
          <el-select placeholder="请选择" class="w-100" v-model="filterData.keywords">
            <el-option
              v-for="item in filterData.keywordsOpt"
              :key="item.val"
              :value="item.val"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输入关键字">
          <el-input class="w-180" v-model="filterData.searchText" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleGetInfoList">搜索</el-button>
          <el-button type="danger" @click="handleGetInfoList('reset')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="2">
      <router-link to="/infoDetails">
        <el-button type="danger" class="float-r">添加</el-button>
      </router-link>
    </el-col>
  </el-row>
  <MyTable
    ref="table"
    :tableHeader="tableProps.tableHeader"
    :border="true"
    :pageData="tableProps.pageData"
    :config="tableProps.config"
    :request="tableProps.request"
    :delete="tableProps.delete"
    @onLoad="handleOnLoad"
  >
    <template #operation="slotData">
      <el-button type="primary" size="small" @click="handleEditInfo(slotData.data.id)">
        编辑
      </el-button>
    </template>
  </MyTable>
</template>
<script setup>
import { reactive, onBeforeMount, ref } from 'vue'
import { formatDate } from '@u/date.js'
import { categoryHook } from '@/views/hook/infoHook'
import { useRouter } from 'vue-router'
import MyTable from '@/components/table'
const table = ref()
const { push } = useRouter()
const { categoryOpt, handleGetCategoryAll } = categoryHook()
const filterData = reactive({
  cascaderProps: {
    label: 'category_name',
    value: 'id'
  },
  category: [],
  keywordsOpt: [
    { label: 'ID', val: 'id' },
    { label: '标题', val: 'title' }
  ],
  keywords: '',
  searchText: ''
})

const tableProps = reactive({
  tableHeader: [
    {
      prop: 'title',
      label: '标题',
      widthType: 'min-width',
      width: 120
    },
    {
      prop: 'category_name',
      label: '分类',
      widthType: 'min-width',
      width: 300
    },
    {
      prop: 'createDate',
      label: '日期',
      type: 'function',
      widthType: 'min-width',
      width: 160,
      callback: row => formatDate({ value: row.createDate * 1000 })
    },
    {
      prop: 'status',
      label: '状态',
      type: 'switch',
      url: 'info',
      widthType: 'min-width',
      width: 100
    },
    {
      label: '操作',
      type: 'slot',
      slotName: 'operation',
      widthType: 'min-width',
      delete: true,
      width: 150,
      url: 'info'
    }
  ],
  pageData: {
    currentPage: 1,
    small: false,
    disabled: false,
    background: false,
    pageSize: 5,
    pageSizes: [1, 2, 3, 4, 5],
    total: 0
  },
  config: {
    selected: true,
    batch_del: true,
    pagination: true
  },
  request: {
    url: 'info',
    data: {
      pageNumber: 1,
      pageSize: 5
    }
  },
  delete: {
    url: 'info'
  }
})
const handleOnLoad = res => {
  console.log('onload', res)
}

const handleEditInfo = id => {
  push({
    path: '/infoDetails',
    query: { id }
  })
}

const handleGetInfoList = val => {
  if (val === 'reset') {
    initFilter()
  }
  table.value.handleRequestData({
    title: filterData.searchText && filterData.keywords === 'title' ? filterData.searchText : '',
    id: filterData.searchText && filterData.keywords === 'id' ? filterData.searchText : '',
    category_id:
      filterData.category.length > 0 ? filterData.category[filterData.category.length - 1] : ''
  })
}

const initFilter = () => {
  filterData.category = []
  filterData.keywords = ''
  filterData.searchText = ''
}
onBeforeMount(() => {
  handleGetCategoryAll()
})
</script>
<style lang="scss"></style>
