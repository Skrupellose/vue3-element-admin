<template lang="">
  <div id="login">
    <div class="form-options">
      <el-button @click="formMode = 'login'" :type="formMode === 'login' ? 'primary' : ''">
        登录
      </el-button>
      <el-button @click="formMode = 'register'" :type="formMode === 'register' ? 'primary' : ''">
        注册
      </el-button>
    </div>
    <div class="form-wrap">
      <transition name="slide" mode="out-in">
        <div v-if="formMode === 'login'" class="form">
          <el-form label-position="top" :model="loginForm" :rules="validRules">
            <el-form-item label="用户名(邮箱)" prop="username">
              <el-input v-model="loginForm.username" clearable />
            </el-form-item>

            <el-form-item label="密码" prop="passwd">
              <el-input v-model="loginForm.passwd" type="password" show-password clearable />
            </el-form-item>

            <el-form-item label="验证码" class="validCode" prop="code">
              <el-row :gutter="10">
                <el-col :span="14"><el-input v-model="loginForm.code" clearable /></el-col>
                <el-col :span="10">
                  <el-button class="el-block" @click="toGetCode">{{ validBtnText }}</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div class="form-button">
            <el-button @click="toLogin" class="el-block">点击登录</el-button>
          </div>
        </div>
        <div v-else-if="formMode === 'register'" class="form">
          <el-form label-position="top" :model="registerForm" :rules="validRules">
            <el-form-item label="用户名(邮箱)" prop="username">
              <el-input v-model="registerForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="passwd">
              <el-input v-model="registerForm.passwd" type="password" show-password clearable />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPwd">
              <el-input v-model="registerForm.confirmPwd" type="password" show-password clearable />
            </el-form-item>
            <el-form-item label="验证码" class="validCode" prop="code">
              <el-row :gutter="10">
                <el-col :span="14"><el-input v-model="registerForm.code" clearable /></el-col>
                <el-col :span="10">
                  <el-button class="el-block" @click="toGetCode">{{ validBtnText }}</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div class="form-button">
            <el-button class="el-block" @click="toRegiter">点击注册</el-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue'
import { validCode, validEmail, validPwd } from '@/utils/validate.js'
import { getCode } from '@/api/common.js'
const loginForm = reactive({
  username: '',
  passwd: '',
  code: ''
})
const registerForm = reactive({
  username: '',
  passwd: '',
  confirmPwd: '',
  code: ''
})
const formMode = ref('login')
const validEmailFn = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入你的邮箱'))
  } else if (!validEmail(value)) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}
const validPwdFn = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入你的密码'))
  } else if (!validPwd(value)) {
    callback(new Error('请输入6-20位，且只包含数字与大小写字母的密码'))
  } else {
    callback()
  }
}

const validConfirmPwdFn = (rule, value, callback) => {
  let pwd = registerForm.passwd
  if (value === '') {
    callback(new Error('再次确认你的密码'))
  } else if (value !== pwd) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}

const validCodeFn = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else if (!validCode(value)) {
    callback(new Error('验证码格式错误'))
  } else {
    callback()
  }
}
const validRules = reactive({
  username: [{ validator: validEmailFn, trigger: 'blur' }],
  passwd: [
    {
      validator: validPwdFn,
      trigger: 'blur'
    }
  ],
  confirmPwd: [
    {
      validator: validConfirmPwdFn,
      trigger: 'blur'
    }
  ],
  code: [
    {
      validator: validCodeFn,
      trigger: 'blur'
    }
  ]
})

const validCodeStatus = ref(0)
const validBtnText = computed(() => {
  return validCodeStatus.value === 0 ? '获取验证码' : '再次发送'
})
async function toGetCode() {
  try {
    const res = await getCode()
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

async function toLogin() {}

const toRegiter = () => {
  console.log('register')
}
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  @include flex(column);
}
.form-wrap {
  width: 320px;
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s ease;
  }
  .slide-enter {
    transform: translateX(100%);
    opacity: 0;
  }
  .slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
}
.form {
  min-height: 400px;
  @include flex(column, none);
  &-button {
    width: 100%;
    margin: 10px auto;
  }
}
.validCode {
  :deep().el-form-item__content {
    display: block;
  }
}
</style>
