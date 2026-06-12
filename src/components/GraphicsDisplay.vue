<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ group: string; talent: string }>()

const horizontalSvg = ref()
const verticalSvg = ref()

const horizontalPng = ref()
const verticalPng = ref()

onMounted(() => {
  horizontalSvg.value = `/src/assets/icons/${props.talent}/${props.group}/svg/horizontal.svg`
  verticalSvg.value = `/src/assets/icons/${props.talent}/${props.group}/svg/vertical.svg`

  horizontalPng.value = `/src/assets/icons/${props.talent}/${props.group}/png/horizontal.png`
  verticalPng.value = `/src/assets/icons/${props.talent}/${props.group}/png/vertical.png`
})
</script>
<template>
  <div class="graphics">
    <h1>Inconspicuous Wallpapers</h1>
    <h2>{{ props.talent.replace('-', ' ') }}</h2>
    <section class="display">
      <div>
        <h3>1920 x 1080 SVG</h3>
        <img :src="horizontalSvg" alt="" />
      </div>
      <div>
        <h3>1200 x 1500 SVG</h3>
        <img :src="verticalSvg" alt="" />
      </div>
      <div>
        <h3>1920 x 1080 PNG</h3>
        <img :src="horizontalPng" alt="" />
      </div>
      <div>
        <h3>1200 x 1500 PNG</h3>
        <img :src="verticalPng" alt="" />
      </div>
    </section>
  </div>
</template>
<style scoped lang="scss">
h2 {
  text-transform: capitalize;
}

img {
  width: 100%;
  object-fit: contain;
}

.display {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10%;
}
</style>
