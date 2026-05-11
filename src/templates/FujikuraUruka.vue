<script setup lang="ts">
import { ref } from 'vue'

const days = ref<number>(8)
</script>
<template>
  <section class="display">
    <div class="header"><p>SCHEDULE</p></div>
    <div class="days" :style="`--days: ${days}`">
      <div v-for="day in days" :key="`day-${day}`">{{ day }}</div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.display {
  aspect-ratio: 16/10;
}

.days {
  --days: 0;

  height: 100%;

  display: grid;
  grid-template-rows: repeat(var(--days), 1fr);
}

.days > :nth-child(even) {
}
</style>
