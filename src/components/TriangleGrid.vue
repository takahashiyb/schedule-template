<script setup lang="ts"></script>
<template>
  <div class="triangle-grid">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped lang="scss">
.triangle-grid {
  aspect-ratio: 16/ 10;
  position: relative;
}

.triangle-grid > div {
  position: absolute;
  inset: 0;
}

.triangle-grid > :nth-child(4n + 1) {
  background-color: red;

  clip-path: polygon(0% 0%, 100% 0%, 25% 75%, 0% 50%);
}

.triangle-grid > :nth-child(4n + 2) {
  background-color: blue;

  clip-path: polygon(0% 50%, 25% 75%, 0% 100%);
}
.triangle-grid > :nth-child(4n + 3) {
  background-color: yellow;

  clip-path: polygon(75% 25%, 100% 0%, 100% 50%);
}

.triangle-grid > :nth-child(4n) {
  background-color: green;

  clip-path: polygon(0% 100%, 75% 25%, 100% 50%, 100% 100%);
}
</style>