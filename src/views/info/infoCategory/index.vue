<template lang="">
  <el-button type="danger" @click="handleForm('parentNodeAdd')">添加一级分类</el-button>
  <hr />
  <el-row :gutter="20">
    <el-col :span="8">
      <div class="info-category-list">
        <el-tree
          ref="cateGoryTree"
          :data="infoData.data"
          :props="infoData.props"
          :expand-on-click-node="false"
        >
          <template #default="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="danger" round size="small" @click="handleForm('childNodeAdd', node)">
                添加子级
              </el-button>
              <el-button
                type="primary"
                round
                size="small"
                @click="handleForm(node.level === 1 ? 'parentNodeEdit' : 'childNodeEdit', node)"
              >
                编辑
              </el-button>
              <el-button round size="small" @click="handleCategoryDel(data)">删除</el-button>
            </span>
          </template>
        </el-tree>
      </div>
    </el-col>
    <el-col :span="16">
      <h4 class="column">{{ formConfig[formConfig.type].title }}</h4>
      <el-form label-width="100px">
        <el-form-item label="父级分类">
          <el-input
            class="w-180"
            v-model.trim="formData.parentCategory"
            :disabled="formConfig[formConfig.type].parentDisabled"
          />
        </el-form-item>
        <el-form-item label="子级分类" v-if="formConfig[formConfig.type].subShow">
          <el-input
            class="w-180"
            v-model.trim="formData.childCategory"
            :disabled="formConfig[formConfig.type].subDisabled"
          />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :loading="formData.buttonIsLoading" @click="submitForm">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script setup>
import { reactive, getCurrentInstance, onBeforeMount, ref } from 'vue'
import {
  firstCategoryAdd,
  getCategoryAll,
  childCategoryAdd,
  categoryEdit,
  categoryDel
} from '@a/info.js'
console.log(getCurrentInstance())
const { proxy } = getCurrentInstance()
const cateGoryTree = ref(null)
const infoData = reactive({
  data: [],
  props: {
    children: 'children',
    label: 'category_name'
  }
})
const formConfig = reactive({
  type: 'parentNodeAdd',
  parentNodeAdd: {
    title: '添加父级分类',
    parentDisabled: false,
    subDisabled: true,
    subShow: false,
    clear: ['parentCategory', 'childCategory']
  },
  childNodeAdd: {
    title: '添加子级分类',
    parentDisabled: true,
    subDisabled: false,
    subShow: true,
    clear: ['parentCategory', 'childCategory'],
    create: ['parentCategory']
  },
  parentNodeEdit: {
    title: '编辑父级分类',
    parentDisabled: false,
    subDisabled: true,
    subShow: false,
    clear: ['parentCategory', 'childCategory'],
    create: ['parentCategory']
  },
  childNodeEdit: {
    title: '编辑子级分类',
    parentDisabled: true,
    subDisabled: false,
    subShow: true,
    clear: ['parentCategory', 'childCategory'],
    create: ['parentCategory', 'childCategory']
  }
})
const formData = reactive({
  parentCategoryData: null,
  childCategoryData: null,
  parentCategory: '',
  childCategory: '',
  buttonIsLoading: false
})
const handleForm = (type, val) => {
  console.log(type, val)
  formConfig.type = type
  if (type === 'childNodeEdit') {
    formData.parentCategoryData = val.parent || null
    formData.childCategoryData = val || null
  } else {
    formData.parentCategoryData = val || null
  }
  handleInputValue(val)
}
const handleInputValue = () => {
  const clearQueue = formConfig[formConfig.type].clear
  const createQueue = formConfig[formConfig.type].create
  if (clearQueue && clearQueue.length > 0) {
    clearQueue.forEach(item => {
      formData[item] = ''
    })
  }
  if (createQueue && createQueue.length > 0) {
    createQueue.forEach(item => {
      formData[item] = formData[`${item}Data`].data.category_name
    })
  }
}
const submitForm = () => {
  if (formConfig.type === 'parentNodeAdd') {
    handleFirstCategoryAdd()
  } else if (formConfig.type === 'childNodeAdd') {
    handleChildCategoryAdd()
  } else if (formConfig.type === 'parentNodeEdit') {
    handleCategoryEdit('parentNodeEdit')
  } else if (formConfig.type === 'childNodeEdit') {
    handleCategoryEdit('childNodeEdit')
  }
}
const handleFirstCategoryAdd = () => {
  if (!formData.parentCategory) {
    ElMessage('内容为空')
    return
  }
  formData.buttonIsLoading = true
  firstCategoryAdd({
    categoryName: formData.parentCategory
  })
    .then(res => {
      cateGoryTree.value.append(res.data, formData.parentCategoryData)
      ElMessage({
        type: 'success',
        message: res.message
      })
      formData.buttonIsLoading = false
    })
    .catch(() => {
      formData.buttonIsLoading = false
    })
}
const handleGetAllCategory = () => {
  getCategoryAll()
    .then(res => {
      infoData.data = res.data || []
    })
    .catch(err => {
      console.log(err)
    })
}
const handleChildCategoryAdd = () => {
  const { id } = formData.parentCategoryData.data
  if (!formData.childCategory) {
    ElMessage('内容为空')
    return
  }
  formData.buttonIsLoading = true
  childCategoryAdd({
    categoryName: formData.childCategory,
    parentId: id
  })
    .then(res => {
      ElMessage({
        type: 'success',
        message: res.message
      })
      formData.buttonIsLoading = false
      handleInputValue()
      // handleGetAllCategory()
      cateGoryTree.value.append(res.data, formData.parentCategoryData)
    })
    .catch(() => {
      formData.buttonIsLoading = false
    })
}
const handleCategoryDel = data => {
  const { id } = data
  proxy.delConfirm({
    fn() {
      return new Promise((resolve, reject) => {
        categoryDel({
          categoryId: id
        })
          .then(res => {
            resolve(res)
            ElMessage.success(res.message)
            cateGoryTree.value.remove(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  })
}
const handleCategoryEdit = val => {
  let categoryName, id, parentNode, childNode
  if (val === 'parentNodeEdit') {
    categoryName = formData.parentCategory
    parentNode = formData.parentCategoryData.data
    id = parentNode.id
  } else {
    categoryName = formData.childCategory
    childNode = formData.childCategoryData.data
    id = childNode.id
  }
  if (!categoryName) {
    ElMessage('内容为空')
    return
  }
  formData.buttonIsLoading = true
  categoryEdit({
    categoryName,
    id
  })
    .then(res => {
      ElMessage({
        type: 'success',
        message: res.message
      })
      if (val === 'parentNodeEdit') {
        parentNode.category_name = categoryName
      } else {
        childNode.category_name = categoryName
      }
      formData.buttonIsLoading = false
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      formData.buttonIsLoading = false
    })
}
onBeforeMount(() => {
  handleGetAllCategory()
})
</script>
<style lang="scss" scoped>
hr {
  margin: 30px 0;
}
.custom-tree-node {
  // flex: 1;
  @include flex(row, center, space-around);
  font-size: 14px;
  padding: 8px;
}
:deep(.el-tree-node__content) {
  height: auto;
  button {
    padding: 6px 12px;
    margin: 8px 3px;
    font-size: 12px;
    height: auto;
  }
}
:deep(.el-tree-node__label) {
  @include flex(row, center, space-between);
  font-size: 12px;
  padding-right: 8px;
  flex: 1;
}

.column {
  height: 40px;
  padding: 0 20px 0 34px;
  margin-bottom: 30px;
  line-height: 40px;
  border-radius: 5px;
  background-color: #f3f3f3;
}
</style>
