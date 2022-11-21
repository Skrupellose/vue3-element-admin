<template lang="">
  <div class="header-wrap">
    <div class="wrap">
      <span class="menu-btn" @click="changeCollapse">
        <svg-icon v-if="isCollapse" svgName="menu-on" svgClass="icon-menu-svg"></svg-icon>
        <svg-icon v-else svgName="menu-off" svgClass="icon-menu-svg"></svg-icon>
      </span>
    </div>

    <div class="wrap">
      <div class="user-info">
        <div class="face-info">
          <img src="@/assets/my-logo.png" alt="" />
          <span class="account">{{ username }}</span>
        </div>
        <div class="setting">
          <span class="logout" @click="logout">
            <svg-icon svgName="logout" svgClass="icon-menu-svg"></svg-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const { replace } = useRouter()
const { commit, getters, dispatch } = useStore()
const isCollapse = computed(() => getters['app/getCollapseStatus'])
const username = computed(() => getters['app/getUsername'])
const changeCollapse = () => {
  commit('app/SET_COLLAPSE')
}
const logout = () => {
  ElMessageBox.confirm('确认退出？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      dispatch('app/logoutAction')
        .then(res => {
          ElMessage({
            message: res.message,
            type: 'success'
          })
          replace({ name: 'Login' })
        })
        .catch(err => {
          ElMessage({
            message: err.response.data.message || err.message,
            type: 'warning'
          })
        })
    })
    .catch(() => {
      console.log('取消')
    })
}
</script>
<style lang="scss" scoped>
.header-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-btn {
  cursor: pointer;
  display: block;
}

.icon-menu-svg {
  width: 2rem;
  height: 2rem;
  fill: currentColor;
}

.user-info {
  display: flex;
  align-items: center;
  .face-info {
    display: flex;
    align-items: center;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-right: 10px;
    }
    span {
      font-size: 1rem;
      margin-right: 10px;
    }
  }
  .setting {
    display: flex;
    align-items: center;
    .logout {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2rem;
      width: 2rem;
      cursor: pointer;
    }
  }
}
</style>
