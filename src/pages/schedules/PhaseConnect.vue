<script setup lang="ts">
import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'
import DaysContainer from '@/components/talents/phase-connect/DaysContainer.vue'
import { dataYoutube } from '@/assets/data/samples/youtube-videos'
import { setBg } from '@/utils/background'

const breakpoints = useBreakpoints(breakpointsVuetifyV3)

const medium = breakpoints.greater('sm')
const large = breakpoints.greater('md')

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

setBg('hsl(206, 8%, 17%)')
</script>
<template>
  <div class="page" :class="{ medium: medium, large: large }">
    <header>
      <img src="/src/assets/icons/PhaseConnect_Header_Logo.png" alt="" />
      <h1>Schedule</h1>
    </header>
    <section class="featured-art"></section>
    <DaysContainer class="days" :dataYoutube="dataYoutube" :timezone="timezone"></DaysContainer>
  </div>
</template>
<style scoped lang="scss">
@use '/src/assets/styles/talents/phase-connect.scss' as s;

.page {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 256px 64px 1fr 40px;

  height: 100svh;
  text-transform: uppercase;
  font-family: 'Orbitron';
  font-weight: 700;
  font-size: 1rem;
}

.page.large {
  grid-template-columns: 3fr 1fr 4fr;
  grid-template-rows: 120px auto 60px;

  aspect-ratio: 16/9;
  height: 100svh;
  font-size: 2rem;

  margin-inline: auto;
}

header {
  align-self: center;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-inline: 16px;
}

.page.large header {
  order: 2;
  grid-column: 2/4;
  grid-row: 1;
}

h1 {
  font-size: 2rem;
  color: white;
}

.page.medium h1 {
  font-size: 3rem;
}

header img {
  max-height: 2rem;
  object-fit: contain;
}

.page.medium header img {
  max-height: 3rem;
}

.page .featured-art {
  grid-column: 1;
  grid-row: 2/4;
  background-color: red;
  aspect-ratio: 1/1;
  width: 100%;
  max-width: 320px;
  margin-inline: auto;
}

.page.large .featured-art {
  order: 0;
  grid-column: 1/3;
  grid-row: 1/-1;

  aspect-ratio: auto;
  max-width: none;
}

.days {
  grid-column: 1;
  grid-row: 3/5;
}

.page.large .days {
  order: 1;
  grid-column: 2/4;
  grid-row: 2;
}
</style>
