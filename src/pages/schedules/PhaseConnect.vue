<script setup lang="ts">
import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'
import DaysContainer from '@/components/talents/phase-connect/DaysContainer.vue'
import { setBg } from '@/utils/background'
import { onMounted, onUnmounted, ref } from 'vue'
import type { StreamWrapper } from '@/types/youtube-streaming-list'
import { supabase } from '@/lib/supabase'

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

const background = 'hsl(206, 8%, 17%)'

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
    <section class="featured-art"></section>
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
      <p>Select a talent</p>
      <select v-model="talent">
        <option v-for="talent in talents" :key="talent.id" :value="talent">
          {{ talent.name }}
        </option>
      </select>
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

  overflow: hidden;
}

.page.large {
  grid-template-columns: 3fr 1fr 4fr;
  grid-template-rows: 120px auto;

  aspect-ratio: 16/9;
  height: 100svh;
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
  order: 2;
  grid-column: 2/4;
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

.days.empty {
  justify-self: center;

  display: grid;
  align-items: center;
  align-content: center;
  color: white;

  max-width: 500px;
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
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background-color: hsl(206, 8%, 17%);
  color: white;
  transform: translateX(100%);

  transition: 300ms transform;

  padding: 16px;

  box-shadow:
    2px 0 0 white inset,
    4px 0 0 hsl(206, 8%, 17%) inset,
    6px 0 0 white inset,
    8px 0 0 hsl(206, 8%, 17%) inset,
    10px 0 0 white inset;
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
</style>
