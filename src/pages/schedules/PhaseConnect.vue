<script setup lang="ts">
import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'
import DaysContainer from '@/components/talents/phase-connect/DaysContainer.vue'
import { setBg } from '@/utils/background'
import { onMounted, onUnmounted, ref } from 'vue'
import type { StreamWrapper } from '@/types/youtube-streaming-list'
import { supabase } from '@/lib/supabase'
import FeaturedArt from '@/components/talents/phase-connect/FeaturedArt.vue'

interface Talent {
  id: string
  name: string
  channelId: string
  gen: number
  genName: string
  color1: string
  color2: string
  color3: string
  type: string
  data?: StreamWrapper[]
}

const breakpoints = useBreakpoints(breakpointsVuetifyV3)

const medium = breakpoints.greater('sm')
const large = breakpoints.greater('md')

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

const background = 'hsl(0, 0%, 4%)'

const talents = ref<Talent[]>()

const talent = ref<Talent>()

const isSidebarOpen = ref<boolean>()

function turnSidebarOn() {
  isSidebarOpen.value = true
}

function turnSidebarOff() {
  isSidebarOpen.value = false
}

onMounted(async () => {
  setBg(background)

  const { data, error } = await supabase.from('phase-connect-schedules').select('*')

  if (error) {
    console.error(error)
  } else {
    talents.value = data as Talent[]
  }
})

onUnmounted(() => {
  setBg('hsl(0, 0%, 100%)')
})
</script>
<template>
  <div class="page" :class="{ medium: medium, large: large }">
    <header>
      <img src="/src/assets/icons/PhaseConnect_Header_Logo.png" alt="" />
      <h1>Schedule</h1>
      <button class="side-button" @click="turnSidebarOn">|||</button>
    </header>
    <FeaturedArt :path="`/assets/icons/${talent?.id}/fullbody/resized.png`"></FeaturedArt>
    <div class="days empty" v-if="!talent">
      <p>Select a talent</p>
      <select v-model="talent">
        <option v-for="talent in talents" :key="talent.id" :value="talent">
          {{ talent.name }}
        </option>
      </select>
    </div>
    <DaysContainer
      class="days"
      :dataYoutube="talent.data"
      :timezone="timezone"
      :talent="talent"
      v-else
    />
    <div class="sidebar" :class="{ open: isSidebarOpen }">
      <button class="close-button" @click="turnSidebarOff">X</button>
      <img src="/src/assets/icons/PhaseConnect_Header_Logo.png" alt="" />
      <p>Select a talent</p>
      <select v-model="talent">
        <option v-for="talent in talents" :key="talent.id" :value="talent">
          {{ talent.name }}
        </option>
      </select>
    </div>
    <div class="border" :style="`--border: ${talent?.color3}`">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '/src/assets/styles/talents/phase-connect.scss' as s;

.page {
  position: relative;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 256px 64px 1fr;

  height: 100svh;
  text-transform: uppercase;
  font-family: 'Orbitron';
  font-weight: 700;
  font-size: 1rem;
  hyphens: auto;

  padding-top: 16px;
  padding-bottom: 32px;

  overflow: hidden;
}

.page.large {
  grid-template-columns: 2fr 1fr 1fr 1fr 3fr;

  grid-template-rows: 120px auto;

  aspect-ratio: 16/9;
  height: 100svh;
  width: 100%;
  max-width: 1600px;
  font-size: 1em;

  margin-inline: auto;
}

header {
  align-self: center;

  display: flex;
  align-items: center;

  padding-inline: 16px;
}

.page.large header {
  order: 3;
  grid-column: 3/6;
  grid-row: 1;
}

h1 {
  font-size: 1.5rem;
  color: white;
}

.page.medium h1 {
  font-size: 3rem;
}

header img {
  max-height: 2rem;

  object-fit: contain;
  margin-right: auto;
}

.page.medium header img {
  max-height: 3rem;
}

.page .featured-art {
  grid-column: 1;
  grid-row: 2/4;

  aspect-ratio: 1/1;
  height: 100%;
  width: 100%;
  max-width: 320px;
  margin-inline: auto;

  z-index: 0;
}

.page.large .featured-art {
  order: 1;
  grid-column: 1/4;
  grid-row: 1/3;
  align-self: center;

  aspect-ratio: auto;
  max-width: none;
}

.days {
  grid-column: 1;
  grid-row: 3/5;
}

.page.large .days {
  order: 2;
  grid-column: 3/6;
  grid-row: 2;
}

.days.empty {
  justify-self: end;

  display: grid;
  align-items: center;
  align-content: start;
  color: white;

  padding-right: 16px;
}

.side-button {
  background-color: white;
  height: 40px;
  width: 40px;
  border: none;
  color: black;
  font-size: 2rem;

  margin-left: 10px;

  cursor: pointer;
}

.sidebar {
  display: grid;
  align-items: start;
  align-content: start;
  gap: 20px;

  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;

  height: 100%;
  width: 250px;
  background-color: hsl(206, 8%, 17%);
  color: white;
  transform: translateX(100%);

  transition: 300ms transform;

  padding: 20px;

  box-shadow:
    4px 0 0 white inset,
    6px 0 0 hsl(206, 8%, 17%) inset,
    10px 0 0 white inset,
    12px 0 0 hsl(206, 8%, 17%) inset,
    16px 0 0 white inset;
}

.page.medium .sidebar {
  width: 400px;

  padding-inline: 56px;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar .close-button {
  justify-self: end;
  background-color: white;
  height: 40px;
  width: 40px;

  border: none;
  color: black;
  font-weight: 900;

  cursor: pointer;
}

.border {
  --skew: 35deg;
  --border: 0, 0%, 100%;

  display: grid;
  grid-column: 2/5;
  grid-row: 2/3;

  z-index: -1;
  opacity: 0;
}

.page.large .border {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);

  opacity: 1;
}

.border div {
  width: 70%;
  background-color: hsl(206, 8%, 15%);
  border-style: solid;
  border-color: hsl(var(--border));
}

.border div:nth-child(1) {
  grid-column: 2;
  grid-row: 1;

  transform: skewX(var(--skew));
  transform-origin: top left; /* pivot point */

  border-width: 4px 4px 0 4px;
}

.border div:nth-child(2) {
  grid-column: 2;
  grid-row: 2;

  transform: skewX(calc(var(--skew) * -1));
  transform-origin: bottom left; /* pivot point */

  border-width: 0 4px 4px 4px;
}

.border div:nth-child(3) {
  grid-column: 1;
  grid-row: 3;
  justify-self: end;
  transform: skewX(calc(var(--skew) * -1));

  transform-origin: top right; /* pivot point */

  border-width: 4px 4px 4px 4px;
}
</style>
