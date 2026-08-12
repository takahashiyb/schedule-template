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
// Days
import PhaseConnectDays from '@/components/talents/phase-connect/DaysContainer.vue'
import PipkinPippaDays from '@/components/talents/pipkin-pippa/DaysContainer.vue'
// Featured Art
import PhaseConnectFeaturedArt from '@/components/talents/phase-connect/FeaturedArt.vue'
import PipkinPippaFeaturedArt from '@/components/talents/pipkin-pippa/FeaturedArt.vue'
//Middle Border
import PhaseConnectMidBorder from '@/components/talents/phase-connect/MidBorder.vue'
import PipkinPippaMidBorder from '@/components/talents/pipkin-pippa/MidBorder.vue'
// Container Detail
import PhaseConnectTalentClock from '@/components/talents/phase-connect/TalentClock.vue'
import PipkinPippaTalentClock from '@/components/talents/pipkin-pippa/TalentClock.vue'
// Header
import PhaseConnectHeaderDisplay from '@/components/talents/phase-connect/HeaderDisplay.vue'
import PipkinPippaHeaderDisplay from '@/components/talents/pipkin-pippa/HeaderDisplay.vue'
// Logo as Component
import PhaseConnectLogo from '@/components/talents/phase-connect/LogoComponent.vue'
import PipkinPippaLogo from '@/components/talents/pipkin-pippa/LogoComponent.vue'
// Sidebar
import PhaseConnectSideBar from '@/components/talents/phase-connect/SideBar.vue'
import PipkinPippaSideBar from '@/components/talents/pipkin-pippa/SideBar.vue'
// Empty
import PhaseConnectEmptySelection from '@/components/talents/phase-connect/EmptySelection.vue'
import PipkinPippaEmptySelection from '@/components/talents/pipkin-pippa/EmptySelection.vue'

type Theme = 'phase-connect' | 'pipkin-pippa'

interface ThemeComponents {
  code: string
  name: string
  color: string
  logo: Component
  days: Component
  featuredArt: Component
  midBorder: Component
  talentClock: Component
  header: Component
  sidebar: Component
  emptySelection: Component
}

const themes: Record<Theme, ThemeComponents> = {
  'phase-connect': {
    code: 'phase-connect',
    name: 'Phase Connect',
    color: 'hsl(0, 0%, 4%)',
    logo: PhaseConnectLogo,
    days: PhaseConnectDays,
    featuredArt: PhaseConnectFeaturedArt,
    midBorder: PhaseConnectMidBorder,
    talentClock: PhaseConnectTalentClock,
    header: PhaseConnectHeaderDisplay,
    sidebar: PhaseConnectSideBar,
    emptySelection: PhaseConnectEmptySelection,
  },
  'pipkin-pippa': {
    code: 'pipkin-pippa',
    name: 'Pipkin Pippa',
    color: 'hsl(25, 86%, 95%)',
    logo: PipkinPippaLogo,
    days: PipkinPippaDays,
    featuredArt: PipkinPippaFeaturedArt,
    midBorder: PipkinPippaMidBorder,
    talentClock: PipkinPippaTalentClock,
    header: PipkinPippaHeaderDisplay,
    sidebar: PipkinPippaSideBar,
    emptySelection: PipkinPippaEmptySelection,
  },
}

const theme = ref<Theme>('phase-connect')

const customTheme = ref<boolean>(false)

const fixedTheme = ref<boolean>(false)

// #region Breakpoints
const breakpoints = useBreakpoints(breakpointsVuetifyV3)

const medium = breakpoints.greater('sm')
const large = breakpoints.greater('md')
//#endregion

// #region Time and its Formats
const now = useNow()

const timezoneFormat = shallowRef('zzzz')

const lang = shallowRef('en-US')
const timezoneDisplay = useDateFormat(now, timezoneFormat, { locales: lang })

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
// #endregion

const background = ref<string>('hsl(0, 0%, 4%)')

const talents = ref<Talent[]>([])

const talent = ref<string>()

const talentData = computed(() => {
  return talents.value.find((item) => item.id === talent.value)
})

const isSidebarOpen = ref<boolean>(false)

function turnSidebarOn() {
  isSidebarOpen.value = true
}

function turnSidebarOff() {
  if (isSidebarOpen.value) isSidebarOpen.value = false
}

function changeTheme() {
  if (customTheme.value === false) {
    theme.value = 'phase-connect'
    background.value = themes[theme.value].color
    setBg(background.value)
    return
  }

  if (
    customTheme.value === true &&
    fixedTheme.value === false &&
    !Object.keys(themes).find((item) => item === talent.value)
  ) {
    theme.value = 'phase-connect'
    background.value = themes[theme.value].color
    setBg(background.value)
    return
  }

  if (
    customTheme.value === true &&
    fixedTheme.value === false &&
    Object.keys(themes).find((item) => item === theme.value)
  ) {
    theme.value = talent.value as Theme
    background.value = themes[theme.value].color
    setBg(background.value)
    return
  }

  if (customTheme.value === true && fixedTheme.value === true) {
    background.value = themes[theme.value].color
    setBg(background.value)
    return
  }
}

//#region vue mounts
onMounted(async () => {
  setBg(background.value)

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
    <!-- Header -->
    <Component
      :is="themes[theme].header"
      :logo="themes[theme].logo"
      @openSidebar="turnSidebarOn"
    ></Component>

    <!-- Featured Art -->
    <Component
      :is="themes[theme].featuredArt"
      class="featured-art"
      :path="`/assets/icons/${talentData?.id}/fullbody/resized.png`"
    ></Component>

    <!-- Empty Selection -->
    <Component :is="themes[theme].emptySelection" v-if="!talent">
      <TalentDropdown
        :talents="talents"
        v-model:current="talent"
        @closeSidebar="turnSidebarOff"
        @change="changeTheme"
      />
    </Component>

    <!-- Days -->
    <Component
      :is="themes[theme].days"
      class="days"
      :timezone="timezone"
      :talent="talentData"
      v-else
    />

    <!-- Sidebar -->
    <Component
      :is="themes[theme].sidebar"
      :isSidebarOpen="isSidebarOpen"
      :background="background"
      :logo="themes[theme].logo"
      :talents="talents"
      :talent="talent"
      :customTheme="customTheme"
      :fixedTheme="fixedTheme"
      :theme="theme"
      :timezone="timezone"
      :timezoneDisplay="timezoneDisplay"
      @closeSidebar="turnSidebarOff"
    >
      <template v-slot:dropdown>
        <TalentDropdown
          :talents="talents"
          :talent="talent"
          v-model:current="talent"
          :background="background"
          @closeSidebar="turnSidebarOff"
          @change="changeTheme"
        />
      </template>

      <template v-slot:specialTheme>
        <input type="checkbox" v-model="customTheme" @change="changeTheme" />
      </template>

      <template v-slot:customTheme>
        <input type="checkbox" v-model="fixedTheme" @change="changeTheme" />
      </template>

      <template v-slot:fixedTheme>
        <select v-model="theme" v-if="customTheme && fixedTheme" @change="changeTheme">
          <option v-for="value in themes" :value="value.code" :key="value.code">
            {{ value.name }}
          </option>
        </select>
      </template>

      <template v-slot:timezone>
        <span class="timezone">{{ timezoneDisplay }} - {{ timezone }}</span>
      </template>
    </Component>

    <div class="sidebar-overlay" :class="{ open: isSidebarOpen }" @click="turnSidebarOff"></div>

    <!-- Background Border -->
    <Component
      :is="themes[theme].midBorder"
      class="border"
      :style="`--border: ${talentData?.color3}`"
    ></Component>

    <!-- Corner Crawler -->
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

    <!-- Clock -->
    <Component
      :is="themes[theme].talentClock"
      :talentData="talentData"
      v-if="talentData"
    ></Component>
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

@keyframes crawl {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
