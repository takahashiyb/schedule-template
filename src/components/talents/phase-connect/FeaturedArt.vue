<script setup lang="ts">
import { useAnimate } from '@vueuse/core'
import { ref, useTemplateRef, watch } from 'vue'

const props = defineProps<{ path?: string }>()

const imgSrc = ref(props.path)

watch(
  () => props.path,
  (newVal) => {
    imgSrc.value = newVal
  },
)

function handleError() {
  imgSrc.value = '/assets/icons/PhaseConnect_Header_Logo.png'
}

// animation
const img = useTemplateRef('img')
const { play } = useAnimate(
  img,
  { transform: 'rotate(360deg)' },
  { duration: 1000, immediate: false, commitStyles: true },
)
</script>
<template>
  <section class="featured-art">
    <img class="" ref="img" :src="imgSrc" alt="" @error="handleError" @click="play()" />
  </section>
</template>
<style scoped lang="scss">
.featured-art {
  overflow: hidden;
}

.featured-art img {
  object-fit: contain;
  object-position: center center;
  height: 100%;
  max-height: 600px;
  width: 100%;
  transition: transform 1s;
}

.featured-art img.move {
  transform: scale(250%) translateY(23%);
  transition: transform 1s;
}
</style>
