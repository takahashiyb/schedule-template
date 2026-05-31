<script setup lang="ts">
import { setBg } from '@/utils/background'
import { onMounted, onUnmounted } from 'vue'

// optional: set default background when component mounts

const background = 'hsl(5, 92%, 95%)'

onMounted(() => {
  setBg(background)
})

onUnmounted(() => {
  setBg('hsl(0, 0%, 100%)')
})
</script>
<template><div></div></template>
<style scoped lang="scss"></style>
