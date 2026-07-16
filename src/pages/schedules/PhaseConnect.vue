<script setup lang="ts">
import type { Component } from 'vue'
import type { Talent } from '@/types/talent-data-supabase'
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { breakpointsVuetifyV3, useBreakpoints, useDateFormat, useNow } from '@vueuse/core'
import { supabase } from '@/lib/supabase'
import { setBg } from '@/utils/background'

import TalentDropdown from '@/components/talents/phase-connect/TalentDropdown.vue'
import { pickTextColor } from '@/utils/color'

// Talent Specific Components

import PhaseConnectDays from '@/components/talents/phase-connect/DaysContainer.vue'
import PipkinPippaDays from '@/components/talents/pipkin-pippa/DaysContainer.vue'

import PhaseConnectFeaturedArt from '@/components/talents/phase-connect/FeaturedArt.vue'
import PipkinPippaFeaturedArt from '@/components/talents/pipkin-pippa/FeaturedArt.vue'

type Theme = 'phase-connect' | 'pipkin-pippa'

interface ThemeComponents {
  code: string
  name: string
  days: Component
  featuredArt: Component
}

const themes: Record<Theme, ThemeComponents> = {
  'phase-connect': {
    code: 'phase-connect',
    name: 'Phase Connect',
    days: PhaseConnectDays,
    featuredArt: PhaseConnectFeaturedArt,
  },
  'pipkin-pippa': {
    code: 'pipkin-pippa',
    name: 'Pipkin Pippa',
    days: PipkinPippaDays,
    featuredArt: PipkinPippaFeaturedArt,
  },
}

const theme = ref<Theme>('pipkin-pippa')

const customTheme = ref<boolean>(false)

const fixedTheme = ref<boolean>(false)

// #region Breakpoints
const breakpoints = useBreakpoints(breakpointsVuetifyV3)

const medium = breakpoints.greater('sm')
const large = breakpoints.greater('md')
//#endregion

// #region Time and its Formats
const now = useNow()

const timeFormat = shallowRef('HH:mm:ss')
const dateFormat = shallowRef('MM-DD')
const dayFormat = shallowRef('dddd')
const timezoneFormat = shallowRef('zzzz')

const lang = shallowRef('en-US')
const time = useDateFormat(now, timeFormat, { locales: lang })
const date = useDateFormat(now, dateFormat, { locales: lang })
const day = useDateFormat(now, dayFormat, { locales: lang })
const timezoneDisplay = useDateFormat(now, timezoneFormat, { locales: lang })

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
// #endregion

const background = 'hsl(0, 0%, 4%)'

const talents = ref<Talent[]>([])

const talent = ref<string>()

const talentData = computed(() => {
  return talents.value.find((item) => item.id === talent.value)
})

const isSidebarOpen = ref<boolean>()

function turnSidebarOn() {
  isSidebarOpen.value = true
}

function turnSidebarOff() {
  if (isSidebarOpen.value) isSidebarOpen.value = false
}

function changeTheme() {
  if (customTheme.value === false) {
    theme.value = 'phase-connect'
    return
  }

  if (
    customTheme.value === true &&
    fixedTheme.value === false &&
    !Object.keys(themes).find((item) => item === talent.value)
  ) {
    console.log('hello')
    theme.value = 'phase-connect'
    return
  }

  if (
    customTheme.value === true &&
    fixedTheme.value === false &&
    Object.keys(themes).find((item) => item === theme.value)
  ) {
    console.log('hi')
    theme.value = talent.value as Theme
    return
  }
}

//#region vue mounts
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
//#endregion
</script>
<template>
  <div class="page" :class="{ medium: medium, large: large }">
    <header>
      <img src="/src/assets/icons/PhaseConnect_Header_Logo.png" alt="" />
      <h1>Schedule</h1>
      <button class="side-button" @click="turnSidebarOn">|||</button>
    </header>

    <Component
      :is="themes[theme].featuredArt"
      class="featured-art"
      :path="`/assets/icons/${talentData?.id}/fullbody/resized.png`"
    ></Component>

    <div class="days empty" v-if="!talent">
      <TalentDropdown
        :talents="talents"
        v-model:current="talent"
        @closeSidebar="turnSidebarOff"
        @change="changeTheme"
      />
    </div>

    <Component
      :is="themes[theme].days"
      class="days"
      :timezone="timezone"
      :talent="talentData"
      v-else
    />

    <div class="sidebar" :class="{ open: isSidebarOpen }">
      <button class="close-button" @click="turnSidebarOff">X</button>

      <img src="/src/assets/icons/PhaseConnect_Header_Logo.png" alt="" />

      <TalentDropdown
        :talents="talents"
        v-model:current="talent"
        @closeSidebar="turnSidebarOff"
        @change="changeTheme"
      />

      <label
        ><input type="checkbox" v-model="customTheme" @change="changeTheme" />use special
        themes</label
      >

      <label v-if="customTheme"
        ><input type="checkbox" v-model="fixedTheme" @change="changeTheme" />use fixed themes</label
      >

      <select v-model="theme" v-if="customTheme && fixedTheme">
        <option v-for="value in themes" :value="value.code" :key="value.code" @change="changeTheme">
          {{ value.name }}
        </option>
      </select>

      <div></div>

      <span class="timezone">{{ timezoneDisplay }} - {{ timezone }}</span>
    </div>

    <div class="sidebar-overlay" :class="{ open: isSidebarOpen }" @click="turnSidebarOff"></div>

    <div class="border" :style="`--border: ${talentData?.color3}`">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div
      class="container__crawling-banner"
      :style="[
        { '--bg-color': talentData?.color2 },
        { '--border-color': talentData?.color1 },
        {
          '--text-color': pickTextColor(talentData?.color2 ? talentData?.color2 : '0, 0%, 0%'),
        },
      ]"
    >
      <div class="crawling-banner">
        <span>phase connect</span>
        <span>phase connect</span>
      </div>
    </div>

    <div
      class="container__details"
      :style="[
        { '--bg-color': talentData?.color2 },
        { '--border-color': talentData?.color1 },
        {
          '--text-color': pickTextColor(talentData?.color2 ? talentData?.color2 : '0, 0%, 0%'),
        },
      ]"
    >
      <span class="talent-detail">{{ talentData?.name }}</span>
      <span class="talent-detail">{{ talentData?.genName }}</span>
      <div style="display: grid">
        <span
          class="now date"
          :style="talentData?.color1 ? `--color: ${talentData?.color1}` : ''"
          >{{ date }}</span
        >
        <span class="now day">{{ day }}</span>
        <span class="now time">{{ time }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '/src/assets/styles/talents/phase-connect.scss' as s;

.page {
  --bg-color: 0, 0%, 100%;
  --border-color: 206, 8%, 15%;

  position: relative;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 256px 64px 1fr;

  height: 100svh;
  max-height: 1000px;
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
  order: 1;
}

.page.large .featured-art {
  grid-column: 1/4;
  grid-row: 1/3;
  align-self: center;

  aspect-ratio: auto;
  max-width: none;
}

.days {
  grid-column: 1;
  grid-row: 3/5;

  z-index: 1;
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
  display: flex;
  flex-direction: column;
  gap: 20px;

  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 3;

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
  align-self: end;
  background-color: white;
  height: 40px;
  width: 40px;

  border: none;
  color: black;
  font-weight: 900;

  cursor: pointer;
}

.sidebar select:hover,
.sidebar option:hover {
  cursor: pointer;
}

.sidebar :nth-last-child(2) {
  flex: 1;
}

.sidebar .timezone {
  align-self: end;
}

.sidebar-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-color: black;
  opacity: 0.5;

  display: none;
}

.sidebar-overlay.open {
  display: inline-block;
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

.container__crawling-banner {
  --text-color: '0, 0%, 0%';

  grid-column: 1;
  grid-row: 2;
  align-self: start;
  justify-self: start;

  color: hsl(var(--text-color));
  height: 184px;
  aspect-ratio: 1/1;

  overflow: hidden;
}

.page.large .container__crawling-banner {
  grid-row: 1/3;
}

.crawling-banner {
  white-space: nowrap;

  width: 300px;

  translate: -21% 100%;
  rotate: -45deg;

  font-size: 1.5rem;

  display: grid;
  grid-template-columns: 300px 300px;

  animation: crawl 5s linear infinite;
}

.crawling-banner span {
  background-color: hsl(var(--bg-color));
  border: hsl(var(--border-color)) solid;
  border-width: 4px 0px;
}

.container__details {
  grid-column: 1;
  grid-row: 2;
  align-self: end;
  justify-self: end;

  display: grid;
  align-items: start;
  text-align: end;
  gap: 8px;
  z-index: 2;

  padding-bottom: 0px;
}

.page.large .container__details {
  --text-color: 0, 0%, 100%;
  align-self: end;
  justify-self: start;
  text-align: start;
  gap: 24px;

  padding-bottom: 48px;
}

.container__details .talent-detail {
  color: hsl(var(--text-color));
  background-color: hsl(var(--bg-color));

  corner-shape: bevel;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 0;
  padding-right: 24px;
  padding-left: 48px;
}

.page.large .container__details .talent-detail {
  background-color: hsl(var(--bg-color));

  corner-shape: bevel;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 0;
  padding-left: 24px;
  padding-right: 48px;
}

.container__details .now {
  display: none;
  color: white;
  padding-inline: 24px;
}

.page.medium .container__details .now {
  display: inline-block;
}

.page .container__details .date {
  --color: 0, 0%, 100%;

  color: hsl(var(--color));
}

.page.medium .container__details .date {
  font-size: 32px;
}

.page.large .container__details .date {
  font-size: 48px;
}

@keyframes crawl {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
