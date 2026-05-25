<script setup lang="ts">
import KrakenPearl from './KrakenPearl.vue'
</script>
<template>
  <div class="container__featured">
    <div class="featured">
      <slot></slot>
    </div>
    <KrakenPearl class="left first" />
    <KrakenPearl class="left second" />
    <KrakenPearl class="right first" />
    <KrakenPearl class="right second" />
  </div>
</template>
<style scoped lang="scss">
.container__featured {
  position: relative;
}

.featured {
  height: 100%;
  width: 100%;

  background-color: white;

  border-top-left-radius: 50px;
  border-top-right-radius: 50px;

  overflow: hidden;

  position: relative;
}

.featured img {
  height: 100%;
  object-fit: cover;
}
</style>
