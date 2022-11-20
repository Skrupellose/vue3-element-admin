<template lang="">
  <svg class="svg-class" :class="style">
    <use :href="svgIcon"></use>
  </svg>
</template>
<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  svgName: {
    type: String,
    default: ''
  },
  svgClass: {
    type: String,
    default: ''
  }
})

const name = ref(props.svgName)
const style = ref(props.svgClass)
const svgIcon = computed(() => {
  return `#icon-${name.value}`
})
</script>
<style lang="scss">
svg path {
  fill: inherit;
}
.svg-class {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}
</style>
