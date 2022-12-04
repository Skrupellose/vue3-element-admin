<template lang="">
  <el-form label-width="150px">
    <el-form-item label="信息类别">
      <el-cascader :options="categoryOpt.list" :props="infoData.cascaderProps" />
    </el-form-item>
    <el-form-item label="信息标题">
      <el-input v-model="infoData.title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图">
      <el-upload
        class="img-uploader"
        action="#"
        :http-request="handleUpload"
        :show-file-list="false"
        :on-success="handleOnSuccess"
        :before-upload="handleBeforeUpload"
      >
        <img v-if="infoData.imageUrl" :src="infoData.imageUrl" class="img-preview" />
        <span v-else class="icon-plus">+</span>
      </el-upload>
    </el-form-item>
    <el-form-item label="发布日期">
      <el-date-picker
        v-model="infoData.date"
        type="datetime"
        placeholder="选择日期"
        popper-class="date-select"
      />
    </el-form-item>
    <el-form-item label="内容">
      <div ref="editor"></div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { uploadFile } from '@a/info.js'
import { reactive, ref, onMounted, onBeforeMount } from 'vue'
import { categoryHook } from '@/views/hook/infoHook'
import WangEditer from 'wangeditor'
const { categoryOpt, handleGetCategoryAll } = categoryHook()
const infoData = reactive({
  cascaderProps: {
    label: 'category_name',
    value: 'id'
  },
  title: '',
  date: '',
  imageUrl: ''
})
const editor = ref()
let editorInstance = null
const handleBeforeUpload = file => {
  console.log(file)
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isJPG) {
    ElMessage.warning('图片类型只能为jpg')
  }
  if (!isLt2M) {
    ElMessage.warning('图片大小不能超过2M')
  }
}
const handleUpload = params => {
  console.log(params)
  const file = params.file
  const form = new FormData()
  form.append('files', file)
  uploadFile(form)
    .then(res => {
      console.log(res)
      infoData.imageUrl = res.data.files_path
    })
    .catch(err => {
      console.log(err)
    })
}
onBeforeMount(() => {
  handleGetCategoryAll()
}),
  onMounted(() => {
    editorInstance = new WangEditer(editor.value)
    Object.assign(editorInstance.config, {
      onchange() {
        console.log('change')
      }
    })
    editorInstance.create()
  })
</script>
<style lang="scss" scoped>
.img-uploader {
  border: 1px dashed #d9d9d9;
  width: 150px;
  height: 150px;
  border-radius: 5px;
  @include flex();
  &:hover {
    border: 1px dashed #2da9e2;
    cursor: pointer;
  }
  .icon-plus {
    // display: block;
    font-size: 32px;
  }
}
.img-preview {
  width: 150px;
  height: 150px;
  border-radius: 5px;
}
</style>

<style lang="scss">
.date-select {
  z-index: 20000 !important;
}
</style>
