<template lang="">
  <el-container id="layout-container">
    <el-aside id="layout-aside" ref="aside" :width="asideWidth">
      <LayoutAside />
    </el-aside>
    <el-container>
      <el-header id="layout-header" height="75px">
        <LayoutHeader />
      </el-header>
      <el-main id="layout-main">
        <LayoutMain />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import LayoutAside from './components/Aside.vue'
import LayoutMain from './components/Main.vue'
import LayoutHeader from './components/Header.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const { getters } = useStore()
const isCollapse = computed(() => getters['app/getCollapseStatus'])
const asideWidth = computed(() => {
  return isCollapse.value ? '64px' : '200px'
})
</script>
<style lang="scss">
#layout-container {
  height: 100vh;
}
#layout-aside {
  @include prefix(transition, width 0.35s ease 0s);
}
#layout-header {
  position: relative;
  z-index: 10;
  background-color: #fff;
  @include prefix(box-shadow, 0 0 10px 0 rgba(0, 0, 0, 0.5));
}
#layout-main {
  background-color: #ecf5ff;
}
</style>
