<script setup lang="ts">
import { computed } from 'vue'
import BannerTextbox from './BannerTextbox.vue'
import { getDayWeek, getTime } from '@/utils/dates.ts'

interface Schedule {
  special: boolean
  dayoff: boolean
  time: string
  timezone: string
  title: string
}

const props = defineProps<{
  schedule: Schedule
}>()

const dayWeek = computed(() => {
  return getDayWeek(props.schedule.time, props.schedule.timezone).toUpperCase()
})

const time = computed(() => {
  return getTime(props.schedule.time, props.schedule.timezone).toUpperCase()
})
</script>
<template>
  <div class="container">
    <div class="decorations" v-if="props.schedule.dayoff">
      <img class="card" src="@/assets/icons/marimari-en/card-banner-dayoff.svg" alt="" />
      <img class="emblem" src="@/assets/icons/marimari-en/emblem.svg" alt="" />
    </div>

    <div class="decorations" v-else-if="props.schedule.special">
      <img class="card" src="@/assets/icons/marimari-en/card-banner-special.svg" alt="" />
      <img class="emblem" src="@/assets/icons/marimari-en/emblem.svg" alt="" />
    </div>
    <div class="decorations" v-else>
      <img class="card" src="@/assets/icons/marimari-en/card-banner.svg" alt="" />
      <img class="emblem" src="@/assets/icons/marimari-en/emblem.svg" alt="" />
    </div>

    <span class="title" :class="{ special: props.schedule.special }">
      {{ props.schedule.title }}
    </span>

    <span class="week-day" :class="{ special: props.schedule.special }">
      {{ dayWeek }}
    </span>

    <BannerTextbox class="time right center blue" v-if="!props.schedule.dayoff">{{
      time
    }}</BannerTextbox>

    <span class="offline" v-if="props.schedule.dayoff">OFFLINE</span>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/styles/talents/marimari-en.scss' as s;

.container {
  --font-color: hsl(#{s.$dark-blue});
  --gold: hsl(#{s.$gold});

  display: grid;
  grid-template-columns: repeat(8, 1fr);

  align-content: stretch;
  color: var(--font-color);

  max-width: 700px;
}

.decorations {
  grid-column: 1/-1;
  grid-row: 1;

  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;

  align-items: center;
}

.card {
  grid-column: 1/-1;
  grid-row: 1;

  height: 100%;
  width: 100%;
}

.emblem {
  grid-column: 1;
  grid-row: 1;

  justify-self: end;

  height: 50%;
}

.title {
  grid-column: 3/7;
  grid-row: 1;

  align-self: center;
  text-align: center;

  @include f.responsive-type(s.$font-7, s.$font-5, s.$font-4);

  padding-bottom: 5%;
}

.title.special {
  --font-color: hsl(#{s.$white});
  --shadow-color: hsl(#{s.$dark-gold});
  color: var(--font-color);
  filter: drop-shadow(0px 2px 4px var(--shadow-color));
  letter-spacing: 0.2em;
}

.week-day {
  grid-column: 2;
  grid-row: 1;

  justify-self: center;
  align-self: center;

  @include f.responsive-type(s.$font-7, s.$font-6, s.$font-4);
  padding-bottom: 5%;

  border-radius: 4px;

  box-shadow: 8px 4px 0 var(--gold);
}

.week-day.special {
  box-shadow: none;
}

.time {
  grid-column: -3/-1;
  grid-row: 1;

  align-self: center;

  padding-right: 16%;

  height: 32px;
  width: 100%;
}

.offline {
  grid-column: 5/7;
  grid-row: 1;

  @include f.responsive-type(s.$font-6, s.$font-6, s.$font-4);

  align-self: center;
  justify-self: center;
  padding-bottom: 10%;
}
</style>
