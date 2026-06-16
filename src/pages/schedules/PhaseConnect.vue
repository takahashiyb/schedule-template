<script setup lang="ts">
import DaysContainer from '@/components/talents/phase-connect/DaysContainer.vue'
import { dataYoutube } from '@/assets/data/samples/youtube-videos'

const timezone = 'America/Los_Angeles'
</script>
<template>
  <div class="page">
    <header><h1>Schedule</h1></header>
    <section class="featured-art"></section>
    <DaysContainer class="days" :dataYoutube="dataYoutube" :timezone="timezone"></DaysContainer>
  </div>
</template>
<style scoped lang="scss">
.page {
  display: grid;
  grid-template-columns: 3fr 5fr;
  grid-template-rows: 160px auto;

  height: 100svh;
  background-color: hsl(206, 8%, 17%);
}

header {
  grid-column: 2;
  grid-row: 1;
}

.featured-art {
  grid-column: 1;
  grid-row: span 2;

  background-color: red;
}

.days {
  grid-column: 2;
  grid-row: 2;
}
</style>
