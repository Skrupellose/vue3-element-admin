<template lang="">
  <el-form label-width="150px" ref="form" :model="infoData.formField">
    <el-form-item label="信息类别" prop="category">
      <el-cascader
        v-model="infoData.formField.category"
        :options="categoryOpt.list"
        :props="infoData.cascaderProps"
      />
    </el-form-item>
    <el-form-item label="信息标题" prop="title">
      <el-input v-model="infoData.formField.title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图" prop="img">
      <el-upload
        class="img-uploader"
        action="#"
        :http-request="handleUpload"
        :show-file-list="false"
        :on-success="handleOnSuccess"
        :before-upload="handleBeforeUpload"
      >
        <img
          v-if="infoData.formField.imageUrl"
          :src="infoData.formField.imageUrl"
          class="img-preview"
        />
        <span v-else class="icon-plus">+</span>
      </el-upload>
    </el-form-item>
    <el-form-item label="发布日期" prop="date">
      <el-date-picker
        v-model="infoData.formField.date"
        type="datetime"
        placeholder="选择日期"
        popper-class="date-select"
      />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <div ref="editor"></div>
    </el-form-item>
    <el-form-item label="是否发布" prop="public">
      <el-radio-group v-model="infoData.formField.public">
        <el-radio label="1" size="large">是</el-radio>
        <el-radio label="0" size="large">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmitForm">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import dayjs from 'dayjs'
import { uploadFile, createCategoryInfo } from '@a/info.js'
import { reactive, ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { categoryHook } from '@/views/hook/infoHook'
import WangEditer from 'wangeditor'
const { go } = useRouter()
const { categoryOpt, handleGetCategoryAll } = categoryHook()
const infoData = reactive({
  cascaderProps: {
    label: 'category_name',
    value: 'id'
  },
  formField: {
    category: '',
    title: '',
    date: '',
    imageUrl: '',
    content: '',
    public: '1'
  },
  formRules: {
    category: [
      {
        required: true,
        message: '分类不能为空',
        trigger: 'change'
      }
    ],
    title: [
      {
        required: true,
        message: '标题不能为空',
        trigger: 'change'
      }
    ],
    date: [
      {
        required: true,
        message: '日期不能为空',
        trigger: 'change'
      }
    ],
    img: [
      {
        required: true,
        message: '图片不能为空',
        trigger: 'change'
      }
    ],
    content: [
      {
        required: true,
        message: '内容不能为空',
        trigger: 'change'
      }
    ],
    public: [
      {
        required: true,
        message: '是否发布不能为空',
        trigger: 'change'
      }
    ]
  }
})
const editor = ref()
const form = ref()
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
      infoData.formField.imageUrl = res.data.files_path
    })
    .catch(err => {
      console.log(err)
    })
}
const handleSubmitForm = () => {
  form.value.validate(valid => {
    if (valid) {
      const formData = JSON.parse(JSON.stringify(infoData.formField))
      formData.category = formData.category[formData.category.length - 1]
      formData.date = dayjs(formData.date).format('YYYY-MM-DD HH:mm:ss')
      createCategoryInfo({
        image_url: formData.imageUrl,
        category_id: formData.category,
        title: formData.title,
        create_date: formData.date,
        content: formData.content,
        status: formData.public
      })
        .then(res => {
          console.log(res)
          ElMessage.success(res.message)
          go(-1)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      return
    }
  })
}
onBeforeMount(() => {
  handleGetCategoryAll()
})
onMounted(() => {
  editorInstance = new WangEditer(editor.value)
  Object.assign(editorInstance.config, {
    onchange(val) {
      console.log('change')
      infoData.formField.content = val
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
    @include flex();
    width: 150px;
    height: 150px;
    font-size: 32px;
  }
}

.img-preview {
  width: 150px;
  height: 150px;
  border-radius: 5px;
}
.el-radio.el-radio--large {
  height: 32px;
}
</style>

<style lang="scss">
.date-select {
  z-index: 20000 !important;
}
</style>
