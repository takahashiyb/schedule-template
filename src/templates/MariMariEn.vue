<script setup lang="ts">
import DayDisplay from '@/components/talents/marimari-en/DayDisplay.vue'
import FeaturedArt from '@/components/talents/marimari-en/FeaturedArt.vue'
import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'
import { onMounted, onUnmounted } from 'vue'

interface Schedule {
  special: boolean
  dayoff: boolean
  time: string
  timezone: string
  title: string
}

const empty = {
  special: false,
  dayoff: true,
  time: '2024-07-08T00:00:00Z',
  timezone: 'America/Los_Angeles',
  title: '',
}

const schedule: Schedule[] = [
  {
    special: false,
    dayoff: true,
    time: '2024-07-08T00:00:00Z',
    timezone: 'America/Los_Angeles',
    title: '',
  },
  {
    special: false,
    dayoff: true,
    time: '2024-07-09T00:00:00Z',
    timezone: 'America/Los_Angeles',
    title: '',
  },
  {
    special: false,
    dayoff: false,
    time: '2024-07-10T02:30:00Z',
    timezone: 'America/Los_Angeles',
    title: 'CHILDHOOD VIOLIN PIECES - BLIND PLAYTHROUGH (OH NO)',
  },
  {
    special: false,
    dayoff: false,
    time: '2024-07-10T02:30:00Z',
    timezone: 'America/Los_Angeles',
    title: 'CHILDHOOD VIOLIN PIECES - BLIND PLAYTHROUGH (OH NO)',
  },
  {
    special: true,
    dayoff: false,
    time: '2024-07-11T06:00:00Z',
    timezone: 'America/Los_Angeles',
    title: 'VIOLIN KARAOKE - SHORTS STREAM',
  },
  {
    special: false,
    dayoff: false,
    time: '2024-07-12T02:30:00Z',
    timezone: 'America/Los_Angeles',
    title: 'SUPERMARKET SIMULATOR (CHAT)',
  },
  {
    special: false,
    dayoff: false,
    time: '2024-07-13T06:00:00Z',
    timezone: 'America/Los_Angeles',
    title: 'VIOLIN KARAOKE - SHORTS STREAM',
  },
  {
    special: false,
    dayoff: false,
    time: '2024-07-14T00:00:00Z',
    timezone: 'America/Los_Angeles',
    title: 'TRYING TACO BELL FOR THE FIRST TIME',
  },
]

const featuredArt: { image: string; artist: string } = {
  image: '/src/assets/icons/fujikura-uruka/fan-logo.svg',
  artist: 'azzypics',
}

function setBg(color: string) {
  document.body.style.backgroundColor = color
}

const breakpoints = useBreakpoints(breakpointsVuetifyV3)

// optional: set default background when component mounts
onMounted(() => {
  setBg('hsl(205, 57%, 58%)')
})

onUnmounted(() => {
  setBg('hsl(0, 0%, 100%)')
})
</script>
<template>
  <section class="display" :class="[{ large: breakpoints.greater('md').value }]">
    <!-- <img class="background-image" src="@/assets/icons/marimari-en/background-mobile.png" alt="" /> -->
    <img
      class="corner-decoration corner-decoration--top"
      src="@/assets/icons/marimari-en/page-corner.svg"
    />
    <FeaturedArt
      class="featured-art"
      :class="{ large: breakpoints.greater('md').value }"
      :image="featuredArt"
      :first="schedule[0] ? schedule[0] : empty"
      :last="schedule[schedule.length - 1] ? schedule[schedule.length - 1] : empty"
    />
    <img
      class="corner-decoration corner-decoration--top right"
      src="@/assets/icons/marimari-en/page-corner.svg"
    />
    <div class="days">
      <DayDisplay v-for="day in schedule" :key="day.title" :schedule="day" />
    </div>
    <img
      class="corner-decoration corner-decoration--bottom right"
      src="/src/assets//icons/marimari-en/page-corner-2.svg"
      alt=""
    />
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/talents/marimari-en.scss' as s;

.display {
  font-family: 'DM Serif Display', serif;
  font-weight: 800;

  background-image: url('/src/assets/icons/marimari-en/background-mobile.png');
  background-size: contain;

  @include f.responsive-grid(f.em(10), f.em(1), 8, f.em(1600));
  grid-template-rows: repeat(4, 1fr) 0.3fr repeat(3, 1fr) 0.3fr;

  row-gap: 5px;
  height: 100svh;

  max-height: 900px;
}

.background-image {
  grid-column: 1/-1;
  grid-row: 1/-1;
}

.corner-decoration--top {
  grid-column: 1/4;
  grid-row: 1/3;

  z-index: 999;
}

.corner-decoration--top.right {
  grid-column: -1/-4;
  transform: rotateY(180deg);
}

.featured-art {
  grid-column: 3/-3;
  grid-row: 1/5;
  justify-self: center;
}

.days {
  grid-column: 2/-2;
  grid-row: 6/9;

  justify-self: center;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  row-gap: 10px;

  scrollbar-width: none;
}

.corner-decoration--bottom {
  grid-column: 1/3;
  grid-row: 9;
  align-self: end;

  z-index: 0;
}

.corner-decoration--bottom.right {
  grid-column: -1/-3;
  justify-self: end;
}

.display.large {
  @include f.responsive-grid(f.em(10), f.em(1), 16, f.em(1600));
  overflow-y: hidden;
}

.display.large .featured-art {
  grid-column: 2/10;
  grid-row: 1/-1;

  max-width: 90%;
  // overflow-x: hidden;
}

.display.large .days {
  grid-column: 10/-2;
  grid-row: 2/-2;
}

.display.large .corner-decoration--top {
  grid-column: 2/4;
}

.display.large .corner-decoration--top.right {
  grid-column: -2/-4;
}

.display.large .corner-decoration--bottom {
  grid-column: 2;
}

.display.large .corner-decoration--bottom.right {
  grid-column: -3;
}
</style>
