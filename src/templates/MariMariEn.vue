<script setup lang="ts">
import FeaturedArt from '@/components/talents/marimari-en/FeaturedArt.vue'
import KrakenPearl from '@/components/talents/marimari-en/KrakenPearl.vue'
import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'
import { onMounted } from 'vue'

const schedule = [
  {
    dayoff: true,
    time: '2024-07-08T00:00:00Z',
    timezone: 'America/Los_Angeles',
    title: '',
  },
  {
    dayoff: true,
    time: '2024-07-09T00:00:00Z',
    timezone: 'America/Los_Angeles',
    title: '',
  },
  {
    dayoff: false,
    time: '2024-07-10T02:30:00Z',
    timezone: 'America/Los_Angeles',
    title: 'CHILDHOOD VIOLIN PIECES - BLIND PLAYTHROUGH (OH NO)',
  },
  {
    dayoff: false,
    time: '2024-07-10T02:30:00Z',
    timezone: 'America/Los_Angeles',
    title: 'CHILDHOOD VIOLIN PIECES - BLIND PLAYTHROUGH (OH NO)',
  },
  {
    dayoff: false,
    time: '2024-07-11T06:00:00Z',
    timezone: 'America/Los_Angeles',
    title: 'VIOLIN KARAOKE - SHORTS STREAM',
  },
  {
    dayoff: false,
    time: '2024-07-12T02:30:00Z',
    timezone: 'America/Los_Angeles',
    title: 'SUPERMARKET SIMULATOR (CHAT)',
  },
  {
    dayoff: false,
    time: '2024-07-13T06:00:00Z',
    timezone: 'America/Los_Angeles',
    title: 'VIOLIN KARAOKE - SHORTS STREAM',
  },
  {
    dayoff: false,
    time: '2024-07-14T00:00:00Z',
    timezone: 'America/Los_Angeles',
    title: 'TRYING TACO BELL FOR THE FIRST TIME',
  },
]

function setBg(color: string) {
  document.body.style.backgroundColor = color
}

const breakpoints = useBreakpoints(breakpointsVuetifyV3)

// optional: set default background when component mounts
onMounted(() => {
  setBg('hsl(205, 57%, 58%)')
})
</script>
<template>
  <section class="display">
    <img class="background-image" src="@/assets/icons/marimari-en/background-mobile.png" alt="" />
    <img class="corner-decoration" src="@/assets/icons/marimari-en/page-corner.svg" />
    <FeaturedArt> <img src="/src/assets/icons/fujikura-uruka/fan-logo.svg" alt="" /></FeaturedArt>
    <img class="corner-decoration right" src="@/assets/icons/marimari-en/page-corner.svg" />
  </section>
</template>
<style scoped lang="scss">
.display {
  @include f.responsive-grid(f.em(10), f.em(1), 8, f.em(1600));
  grid-template-rows: repeat(8, 1fr);

  row-gap: 5px;
  min-height: 100%;
}

.background-image {
  grid-column: 2/-2;
  grid-row: 1/-1;
}

.corner-decoration {
  grid-column: 2/4;
  grid-row: 1;

  z-index: 999;
}

.corner-decoration.right {
  grid-column: -2/-4;
  transform: rotateY(180deg);
}

.container__featured {
  grid-column: 3/-3;
  grid-row: 1/5;
}
</style>
