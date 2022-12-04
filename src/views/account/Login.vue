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
          <el-form label-position="top" :model="loginForm" :rules="validRules" ref="login">
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
                  <el-button
                    class="el-block valid-btn"
                    @click="handleGetCode('login')"
                    :disabled="loginForm.codeBtnDisable"
                    :loading="loginForm.codeBtnLoading"
                  >
                    {{ loginForm.codeBtnText }}
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div class="form-button">
            <el-button
              @click="submitForm('login')"
              class="el-block"
              :disabled="loginForm.submitBtnDisable"
            >
              点击登录
            </el-button>
          </div>
        </div>
        <div v-else-if="formMode === 'register'" class="form">
          <el-form label-position="top" :model="registerForm" :rules="validRules" ref="register">
            <el-form-item label="用户名(邮箱)" prop="username">
              <el-input v-model="registerForm.username" clearable />
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
                  <el-button
                    class="el-block valid-btn"
                    @click="handleGetCode('register')"
                    :disabled="registerForm.codeBtnDisable"
                    :loading="registerForm.codeBtnLoading"
                  >
                    {{ registerForm.codeBtnText }}
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div class="form-button">
            <el-button
              class="el-block"
              @click="submitForm('register')"
              :disabled="registerForm.submitBtnDisable"
            >
              点击注册
            </el-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onBeforeUnmount, getCurrentInstance } from 'vue'
import { validCode, validEmail, validPwd } from '@/utils/validate.js'
import { getCode, login, register } from '@/api/common.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
const { dispatch } = useStore()
const { proxy } = getCurrentInstance()
const loginForm = reactive({
  username: 'hel@qq.com',
  passwd: '123456',
  code: '',
  codeBtnDisable: false,
  codeBtnText: '获取验证码',
  codeBtnLoading: false,
  codeBtnTimer: null,
  submitBtnDisable: true
})
const registerForm = reactive({
  username: 'hel@qq.com',
  passwd: '',
  confirmPwd: '',
  code: '',
  codeBtnDisable: false,
  codeBtnText: '获取验证码',
  codeBtnLoading: false,
  codeBtnTimer: null,
  submitBtnDisable: true
})
let formMode = ref('login')

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

const submitForm = type => {
  proxy.$refs[type].validate(valid => {
    if (valid) {
      if (type === 'register') {
        toRegiter()
      } else {
        toLogin()
      }
    } else {
      ElMessage('校验失败')
    }
  })
}

const handleGetCode = async type => {
  let form
  if (type === 'register') {
    form = registerForm
  } else if (type === 'login') {
    form = loginForm
  }
  const { username } = form
  if (!validEmail(username)) {
    ElMessage({
      message: '用户名校验失败'
    })
    return
  }
  form.codeBtnText = '发送中'
  form.codeBtnLoading = true
  const res = await getCode({
    username,
    module: type
  }).catch(err => {
    console.log(err)
    form.codeBtnText = '获取验证码'
    form.codeBtnLoading = false
  })
  const { message, resCode, data } = res
  form.code = data
  form.submitBtnDisable = false
  ElMessage({
    message: message,
    type: resCode === 0 ? 'success' : 'warning'
  })
  countDown(30, form)
}

const countDown = (time, form) => {
  let coolDownTime = time || 60
  form.codeBtnLoading = false
  form.codeBtnDisable = true
  form.codeBtnText = `倒计时：${coolDownTime}秒`
  if (form.codeBtnTimer) {
    clearInterval(form.codeBtnTimer)
  }
  form.codeBtnTimer = setInterval(() => {
    coolDownTime--
    form.codeBtnText = `倒计时：${coolDownTime}秒`
    if (coolDownTime <= 0) {
      form.codeBtnDisable = false
      form.codeBtnText = '重新获取'
      clearInterval(form.codeBtnTimer)
    }
  }, 1000)
}

const toLogin = () => {
  const data = {
    username: loginForm.username,
    password: loginForm.passwd,
    code: loginForm.code
  }
  dispatch('app/loginAction', data)
    .then(res => {
      ElMessage({
        message: res.message,
        type: 'success'
      })
      resetForm('login')
      router.push({ path: '/console' })
    })
    .catch(err => {
      ElMessage({
        message: err.message,
        type: 'warning'
      })
    })
}

const toRegiter = () => {
  register({
    username: registerForm.username,
    password: registerForm.passwd,
    code: registerForm.code
  })
    .then(res => {
      console.log(res)
      ElMessage({
        message: '注册成功',
        type: 'success'
      })
      resetForm('register')
    })
    .catch(err => {
      console.log(err)
    })
}

const resetForm = type => {
  if (type === 'register') {
    proxy.$refs.register.resetFields()
    formMode.value = 'login'
    registerForm.codeBtnText = '获取验证码'
    registerForm.codeBtnTimer && clearInterval(registerForm.codeBtnTimer)
    registerForm.codeBtnDisable = true
    registerForm.codeBtnLoading = false
  } else if (type === 'login') {
    proxy.$refs.login.resetFields()
    loginForm.codeBtnText = '获取验证码'
    loginForm.codeBtnTimer && clearInterval(registerForm.codeBtnTimer)
    loginForm.codeBtnDisable = true
    loginForm.codeBtnLoading = false
  }
}
onBeforeUnmount(() => {
  clearInterval(registerForm.codeBtnTimer)
  clearInterval(loginForm.codeBtnTimer)
})
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  @include flex(column);

  background-color: #3ab4da;
  background-image: radial-gradient(closest-side, rgba(235, 105, 78, 1), rgba(235, 105, 78, 0)),
    radial-gradient(closest-side, rgb(12, 70, 109), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side, rgba(254, 234, 131, 1), rgba(254, 234, 131, 0)),
    radial-gradient(closest-side, rgba(170, 142, 245, 1), rgba(170, 142, 245, 0)),
    radial-gradient(closest-side, rgba(248, 192, 147, 1), rgba(248, 192, 147, 0));
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax, 110vmax 110vmax, 90vmax 90vmax;
  background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax, -30vmax -10vmax,
    50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 10s movement linear infinite;
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
.valid-btn {
  margin-top: 1px;
}

@keyframes movement {
  0%,
  100% {
    background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax, 110vmax 110vmax, 90vmax 90vmax;
    background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax, -30vmax -10vmax,
      50vmax 50vmax;
  }
  25% {
    background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax, 90vmax 90vmax, 60vmax 60vmax;
    background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax, -40vmax -20vmax,
      40vmax 60vmax;
  }
  50% {
    background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax, 60vmax 60vmax, 80vmax 80vmax;
    background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax, 20vmax 10vmax, 30vmax 70vmax;
  }
  75% {
    background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax, 90vmax 90vmax, 70vmax 70vmax;
    background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax, -10vmax 10vmax,
      40vmax 60vmax;
  }
}
</style>
