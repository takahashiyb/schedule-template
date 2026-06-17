<script setup lang="ts">
import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'
import DaysContainer from '@/components/talents/phase-connect/DaysContainer.vue'
import { setBg } from '@/utils/background'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { youtubeUpcomingStreamList } from '@/utils/youtube-api'
import { dataYoutube } from '@/assets/data/samples/youtube-videos'
import type { StreamWrapper } from '@/types/youtube-streaming-list'

interface Talent {
  id: string
  name: string
  channelId: string
  gen: number
  genName: string
  color1: string
  color2: string
  color3: string
}

const breakpoints = useBreakpoints(breakpointsVuetifyV3)

const medium = breakpoints.greater('sm')
const large = breakpoints.greater('md')

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

const background = 'hsl(206, 8%, 17%)'

const talents: Talent[] = [
  {
    id: 'rinkou-ashelia',
    name: 'Rinkou Ashelia',
    channelId: 'UCg7sW-h1PUowdiR5K4HlBew',
    gen: 1,
    genName: 'origins',
    color1: '324, 61%, 54%',
    color2: '258, 42%, 94%',
    color3: '40, 99%, 67%',
  },
  {
    id: 'utatane-nasa',
    name: 'Utatane Nasa',
    channelId: 'UCB7sSUNwh_dXE7ZL3DsGDpw',
    gen: 1,
    genName: 'origins',
    color1: '262, 42%, 43%',
    color2: '41, 87%, 75%',
    color3: '333, 47%, 56%',
  },
  {
    id: 'pipkin-pippa',
    name: 'Pipkin Pippa',
    channelId: 'UCJ46YTYBQVXsfsp8-HryoUA',
    gen: 1,
    genName: 'origins',
    color1: '20, 77%, 92%',
    color2: '350, 100%, 85%',
    color3: '235, 59%, 92%',
  },
  {
    id: 'maemi-tenma',
    name: 'Maemi Tenma',
    channelId: 'UC3K7pmiHsNSx1y0tdx2bbCw',
    gen: 1,
    genName: 'origins',
    color1: '313, 10%, 47%',
    color3: '276, 14%, 86%',
    color2: '328, 76%, 79%',
  },
  {
    id: 'hakushika-iori',
    name: 'Hakushika Iori',
    channelId: 'UCN5bD1YYapThOeadG7YkBOA',
    gen: 1,
    genName: 'origins',
    color1: '198, 100%, 73%',
    color2: '185, 93%, 95%',
    color3: '45, 63%, 72%',
  },
  {
    id: 'fujikura-uruka',
    name: 'Fujikura Uruka',
    channelId: 'UCjXJYPsKxoJyc-1RPB6dSyw',
    gen: 1,
    genName: 'origins',
    color1: '189, 57%, 65%',
    color2: '36, 89%, 62%',
    color3: '217, 25%, 52%',
  },
  {
    id: 'shisui-michiru',
    name: 'Shisui Michiru',
    channelId: 'UC1cExET9xoWSO9iSnRsW_1Q',
    gen: 1,
    genName: 'origins',
    color1: '307, 38%, 30%',
    color2: '63, 44%, 38%',
    color3: '191, 58%, 96%',
  },
]

const talent = ref<Talent>()

const data = ref<StreamWrapper[]>([])

onMounted(async () => {
  setBg(background)

  // data.value = await youtubeUpcomingStreamList(talent.value!.channelId)
  data.value = dataYoutube
})

watch(talent, async () => {
  // data.value = await youtubeUpcomingStreamList(talent.value!.channelId)
  data.value = dataYoutube
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
    </header>
    <section class="featured-art"></section>
    <p class="days empty" v-if="!talent">Select a talent below</p>
    <DaysContainer
      class="days"
      :dataYoutube="data"
      :timezone="timezone"
      :talent="talent"
      v-else
    ></DaysContainer>
    <select v-model="talent">
      <option v-for="talent in talents" :key="talent.channelId" :value="talent">
        {{ talent.name }}
      </option>
    </select>
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
  // background-color: red;
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
  display: grid;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
