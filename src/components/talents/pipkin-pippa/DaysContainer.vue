<script setup lang="ts">
import type { Talent } from '@/types/talent-data-supabase'
import { computed, ref, useTemplateRef, watch } from 'vue'
import {
  breakpointsVuetifyV3,
  useBreakpoints,
  useScroll,
  useDebounceFn,
  useTimeout,
} from '@vueuse/core'
import Daydisplay from '@/components/talents/pipkin-pippa/DayDisplay.vue'
import { getDayWeek, getMonthShortDate, getYMD, isWithinSevenDays } from '@/utils/dates'
import type { StreamWrapper } from '@/types/youtube-streaming-list'
import ScrollMore from '@/components/talents/pipkin-pippa/ScrollMore.vue'
import RestDay from '@/components/talents/pipkin-pippa/RestDay.vue'

const props = defineProps<{
  timezone: string
  talent?: Talent
}>()

const breakpoints = useBreakpoints(breakpointsVuetifyV3)

const medium = breakpoints.greater('sm')

const large = breakpoints.greater('md')

const xLarge = breakpoints.greater('lg')

const days = useTemplateRef('days')
const { y, arrivedState, isScrolling } = useScroll(days, { behavior: 'smooth' })
const { start, ready, stop } = useTimeout(1500, { controls: true })
const showMore = ref(false)

const handleScroll = useDebounceFn(() => {
  showMore.value = false
  stop()
  start()
}, 100)

watch(isScrolling, () => {
  handleScroll()
})

watch(ready, (done) => {
  if (done) showMore.value = true
})

const groupedByDate = computed(() => {
  return groupDataByDate(props.talent?.data, props.timezone)
})

function groupDataByDate(data: StreamWrapper[] | undefined, timezone: string) {
  // Step 1: Pre-seed 8 days starting today
  const groups: Record<string, StreamWrapper[]> = {}
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  })

  const today = new Date()
  for (let i = 0; i < 8; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const key = formatter.format(d)
    groups[key] = []
  }

  // Step 2: Filling Events in dates

  if (!data || data.length === 0) {
    return {}
  }

  for (const item of data) {
    const start = new Date(item.items[0]!.liveStreamingDetails.scheduledStartTime)
    const key = formatter.format(start)

    if (!(key in groups)) {
      groups[key] = []
    }
    groups[key]!.push(item)
  }

  // Step 3: Sort groups chronologically (without changing structure)
  const sortedEntries = Object.entries(groups).sort(([keyA], [keyB]) => {
    const [monthA, dayA, yearA] = keyA.split('/')
    const [monthB, dayB, yearB] = keyB.split('/')
    const dateA = new Date(2000 + Number(yearA), Number(monthA) - 1, Number(dayA))
    const dateB = new Date(2000 + Number(yearB), Number(monthB) - 1, Number(dayB))
    return dateA.getTime() - dateB.getTime()
  })

  return Object.fromEntries(sortedEntries)
}
</script>
<template>
  <section
    class="days"
    ref="days"
    :class="{ medium: medium, large: large, xLarge: xLarge }"
    :style="[
      `--talent-color-1: ${props.talent?.color1}`,
      `--talent-color-2: ${props.talent?.color2}`,
    ]"
  >
    <div class="day" v-for="(time, date, index) in groupedByDate" :key="`date-${index}`">
      <div class="date" v-if="date === getYMD(new Date(), timezone)">Today</div>
      <p class="date" v-else>
        {{
          isWithinSevenDays(date) ? getDayWeek(date, timezone) : getMonthShortDate(date, timezone)
        }}
      </p>
      <RestDay v-if="!time.length">
        {{ talent?.restMessage ? talent.restMessage : 'REST DAY' }}</RestDay
      >
      <div class="time-container" v-else>
        <Daydisplay
          class="time"
          v-for="(value, index) in time.sort(
            (acc, curr) =>
              new Date(acc.items[0]!.liveStreamingDetails.scheduledStartTime).getTime() -
              new Date(curr.items[0]!.liveStreamingDetails.scheduledStartTime).getTime(),
          )"
          :key="`time-${index}`"
          :event="value"
          :timezone="props.timezone"
          :talent="props.talent"
        ></Daydisplay>
      </div>
    </div>
    <button
      v-if="Object.keys(groupedByDate).length > 0"
      class="return"
      type="button"
      @click="y = 0"
    >
      Back to Top
    </button>

    <div class="no-schedule" v-else>
      <p>There are no scheduled streams.</p>
      <p>Go to the sidebar to select another talent.</p>
    </div>

    <div
      class="scroll-more"
      :class="{ appear: showMore && !arrivedState.bottom && Object.keys(groupedByDate).length > 0 }"
      :style="`--bg-color: ${talent?.color3}`"
    >
      <ScrollMore />
    </div>
  </section>
</template>
<style scoped lang="scss">
@use '/src/assets/styles/talents/pipkin-pippa.scss' as s;

.days {
  --extra-bevel: 12px;
  --talent-color-1: '0, 0%, 0%';
  --talent-color-2: '0, 0%, 0%';

  display: flex;
  flex-direction: column;
  gap: 40px;

  overflow-y: scroll;
  scrollbar-width: none;

  padding-inline: 24px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.days.medium {
  --extra-bevel: 9em;
}

.day {
  display: grid;
  grid-template-columns: 100px auto;
  gap: 8px;
  justify-items: center;
  align-items: center;
}

.days.medium .day {
  grid-template-columns: 124px 5fr 5fr;
  gap: 16px;
}

.days.large .day {
  grid-template-columns: 124px 1fr;
}

.days.xLarge .day {
  grid-template-columns: 124px 5fr 5fr;
}

.date {
  --border-color: hsl(#{s.$white});

  background-color: hsl(s.$hot-pink);
  color: hsl(s.$white);
  text-align: center;

  padding-inline: 12px;
  padding-top: 8px;
  padding-bottom: 8px;

  border: 4px var(--border-color) solid;
  border-radius: 1em;

  grid-row: 1;
  justify-self: stretch;
  align-self: start;
}

.days.medium .date {
  padding-inline: 1em;
  border-radius: 9em;
}

.return {
  --border-color: hsl(#{s.$white});

  background-color: hsl(s.$violet);
  color: hsl(s.$white);

  grid-column: 2/4;
  text-align: center;

  width: 100%;

  padding-inline: var(--extra-bevel);
  padding-top: 8px;
  padding-bottom: 8px;

  border: 4px var(--border-color) solid;
  border-radius: 1em;

  margin-top: 10%;
  margin-bottom: 10%;
}

.days.medium .return {
  border-radius: 9em;
}

.return:hover {
  cursor: pointer;

  box-shadow: 0 0px 8px 4px hsla(0, 7%, 11%, 0.7);
}

.time-container {
  grid-column: 2;

  display: grid;
  grid-template-columns: subgrid;

  height: 100%;

  gap: 16px;
}

.days.medium .time-container {
  grid-column: 2/4;
}

.days.large .time-container {
  grid-column: 2;
}

.days.xLarge .time-container {
  grid-column: 2/4;
}

.time:nth-child(odd):last-child {
  grid-column: span 2;
}

.scroll-more {
  --bg-color: white;

  position: absolute;
  bottom: 48px;
  right: 32px;
  z-index: 0;

  color: hsl(var(--bg-color));

  font-weight: 900;
  font-size: 2rem;

  opacity: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.scroll-more.appear {
  opacity: 1;

  transition: opacity 700ms;
}

.no-schedule {
  display: grid;
  align-content: center;
  align-items: center;
  text-align: end;

  height: 100%;
  color: white;
}
</style>
