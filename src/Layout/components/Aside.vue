<template lang="">
  <div :class="[isCollapse ? logoStyle : 'logo']">
    <img :src="logo" alt="vue3-element-plus-admin" />
  </div>
  <el-menu
    class="aside-menu"
    :collapse="isCollapse"
    :default-active="currentPath"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#1c799d"
    router
    @select="handleSelect"
  >
    <template v-for="item in routes" :key="item.path">
      <template v-if="getOnlyChild(item.children)">
        <el-menu-item :index="item.children[0].path">
          <svg-icon :svgName="item.children[0].meta.icon" svgClass="aside-menu-svg"></svg-icon>
          <template #title v-if="!isCollapse">
            {{ item.children[0].meta.title }}
          </template>
        </el-menu-item>
      </template>
      <template v-else>
        <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
          <template #title>
            <svg-icon :svgName="item.meta.icon" svgClass="aside-menu-svg"></svg-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <template v-for="subitem in item.children" :key="subitem.path">
            <el-menu-item v-if="!subitem.meta.hidden" :index="subitem.path">
              <svg-icon :svgName="subitem.meta.icon" svgClass="aside-menu-svg"></svg-icon>
              <template #title>
                {{ subitem.meta.title }}
              </template>
            </el-menu-item>
          </template>
        </el-sub-menu>

        <template v-if="!item.children && !item.meta.hidden">
          <el-menu-item :index="item.path">
            <svg-icon :svgName="item.meta.icon" svgClass="aside-menu-svg"></svg-icon>
            <template #title>
              {{ item.meta.title }}
            </template>
          </el-menu-item>
        </template>
      </template>
    </template>
  </el-menu>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const { getters } = useStore()
const { path } = useRoute()
const { routes } = useRouter().options
const logoStyle = ref('logo-sm')
const logo = ref(require('@/assets/my-logo.png'))
const isCollapse = computed(() => getters['app/getCollapseStatus'])
const getOnlyChild = children => {
  if (!children) {
    return false
  }
  const childList = children.filter(item => {
    return !item.meta.hidden
  })
  if (childList.length === 1) {
    return true
  }
  return false
}
const currentPath = computed(() => path)
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
<style lang="scss">
.aside-menu:not(.el-menu--collapse) {
  width: 200px;
}

aside {
  background-color: #001529;
}
.logo {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &-sm {
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
      height: 30px;
    }
  }
  img {
    width: 50px;
    height: 50px;
  }
  .logo-text {
    font-size: 22px;
    font-weight: 400;
    color: #fff;
  }
}
</style>
