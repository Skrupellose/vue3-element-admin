<template lang="">
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
</template>
<script setup>
import { defineProps, reactive } from 'vue'
const props = defineProps({
  paginationData: {
    type: Object,
    default: () => {}
  }
})
const emits = defineEmits(['sizeChange', 'currentChange'])
const paginationData = reactive(props.paginationData)
const handleSizeChange = val => {
  console.log(`${val} items per page`)
  emits('sizeChange', val)
}

const handleCurrentChange = val => {
  console.log(`current page: ${val}`)
  emits('currentChange', val)
}
</script>
<style lang=""></style>
