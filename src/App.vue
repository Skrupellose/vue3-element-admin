<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script setup>
import ZH from 'element-plus/lib/locale/lang/zh-cn'
let locale = ZH
</script>
<style lang="scss"></style>
