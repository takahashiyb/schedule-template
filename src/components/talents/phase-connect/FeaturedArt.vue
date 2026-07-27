<script setup lang="ts">
import { useAnimate } from '@vueuse/core'
import { ref, useTemplateRef, watch } from 'vue'

const props = defineProps<{ path?: string }>()

const imgSrc = ref(props.path)

const imgError = ref<boolean>(true)

function handleError() {
  imgSrc.value = '/assets/icons/PhaseConnect_Header_Logo.png'
  imgError.value = true
}

// animation
const img = useTemplateRef('img')

watch(
  () => props.path,
  (newVal) => {
    imgSrc.value = newVal
    imgError.value = false
    cancel()
    play()
  },
)

const keyframes = ref([
  {
    transform: 'scale(100%) translateY(0%) translateX(0%)',
    opacity: 1,
    offset: 0,
  },
  {
    transform: 'scale(100%) translateY(0%) translateX(0%)',
    opacity: 0,
    offset: 0.001,
  },
  {
    transform: 'scale(150%) translateY(12.5%) translateX(-100%) ',
    offset: 0.002,
  },
  {
    transform: 'scale(150%) translateY(12.5%) translateX(0%)',
    opacity: 1,
    offset: 0.3,
  },
  {
    transform: 'scale(150%) translateY(12.5%) translateX(20%)',
    opacity: 0,
    offset: 0.4,
  },
  {
    transform: 'scale(250%) translateY(-100%) translateX(0%)',
    opacity: 0,
    offset: 0.41,
  },
  {
    transform: 'scale(250%) translateY(-100%) translateX(0%)',
    opacity: 1,
    offset: 0.42,
  },

  {
    transform: 'scale(250%) translateY(15%) translateX(0%)',
    opacity: 1,
    offset: 0.8,
  },

  {
    transform: 'scale(250%) translateY(15%) translateX(0%)',
    opacity: 1,
    offset: 0.803,
  },
  {
    transform: 'scale(250%) translateY(50%) translateX(0%)',
    opacity: 0,
    offset: 0.9,
  },
  {
    transform: 'scale(100%) translateY(0%) translateX(0%)',
    opacity: 0,
    offset: 0.91,
  },
  {
    opacity: 1,
  },
])

const { play, cancel } = useAnimate(img, keyframes, {
  duration: 6000,
})
</script>

<template>
  <section class="featured-art">
    <img :class="{ error: imgError }" ref="img" :src="imgSrc" alt="" @error="handleError" />
  </section>
</template>

<style scoped lang="scss">
.featured-art {
  overflow: hidden;
  height: 100%;
}

.featured-art img {
  object-fit: contain;
  object-position: center center;
  height: 100%;
  width: 100%;

  z-index: 0;
}

.featured-art img.error {
  width: 80%;
}
</style>
