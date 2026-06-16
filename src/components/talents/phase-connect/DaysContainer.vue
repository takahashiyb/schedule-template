<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { breakpointsVuetifyV3, useBreakpoints, useScroll } from '@vueuse/core'
import DayDisplay from '@/components/talents/phase-connect/DayDisplay.vue'
import { getDayWeek, getMonthShortDate, getYMD, isWithinSevenDays } from '@/utils/dates'
import type { StreamWrapper } from '@/types/youtube-streaming-list'

const props = defineProps<{ timezone: string; dataYoutube: StreamWrapper[] }>()

const breakpoints = useBreakpoints(breakpointsVuetifyV3)

const medium = breakpoints.greater('sm')

const large = breakpoints.greater('md')

const days = useTemplateRef('days')
const { y } = useScroll(days, { behavior: 'smooth' })

const groupedByDate = computed(() => {
  return groupDataByDate(props.dataYoutube, props.timezone)
})

function groupDataByDate(data: StreamWrapper[], timezone: string) {
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
  <section class="days" ref="days" :class="{ medium: medium, large: large }">
    <div class="day" v-for="(time, date, index) in groupedByDate" :key="`date-${index}`">
      <div class="date" v-if="date === getYMD(new Date(), timezone)">Today</div>
      <p class="date" v-else>
        {{
          isWithinSevenDays(date) ? getDayWeek(date, timezone) : getMonthShortDate(date, timezone)
        }}
      </p>
      <div class="rest" v-if="!time.length">Talent Slumbers</div>
      <div class="time-container" v-else>
        <DayDisplay
          class="time"
          v-for="(value, index) in time.sort(
            (acc, curr) =>
              new Date(acc.items[0]!.liveStreamingDetails.scheduledStartTime).getTime() -
              new Date(curr.items[0]!.liveStreamingDetails.scheduledStartTime).getTime(),
          )"
          :key="`time-${index}`"
          :event="value"
          :timezone="props.timezone"
        ></DayDisplay>
      </div>
    </div>
    <button class="return" type="button" @click="y = 0">Back to Top</button>
  </section>
</template>
<style scoped lang="scss">
.days {
  --extra-bevel: 12px;

  display: flex;
  flex-direction: column;
  gap: 40px;

  overflow: scroll;
  scrollbar-width: none;

  padding-inline: 24px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.days.medium {
  --extra-bevel: 32px;
}

.day {
  display: grid;
  grid-template-columns: 120px auto;
  gap: 8px;
  justify-items: center;
  align-items: center;
}

.days.medium .day {
  grid-template-columns: 160px 5fr 5fr;
  gap: 16px;
}

.days.large .day {
  grid-template-columns: 200px 5fr 5fr;
}

.date {
  --date-bevel: 24px;

  grid-column: 1;
  grid-row: 1/-1;
  align-self: start;
  text-align: center;

  background-color: hsl(206, 8%, 17%);
  color: hsl(206, 8%, 100%);
  width: 100%;

  padding-inline: var(--date-bevel);
  padding-top: 8px;
  padding-bottom: 8px;

  border-bottom-left-radius: var(--date-bevel);
  border-top-right-radius: var(--date-bevel);
  corner-shape: bevel;
  border: grey 2px solid;

  box-shadow: 0 0px 8px 4px hsla(206, 8%, 100%, 0.1);
}

.days.medium .date {
  --date-bevel: 32px;
}

.rest,
.return {
  grid-column: 2/4;
  text-align: center;

  width: 100%;
  min-height: 64px;
  background-color: hsl(206, 8%, 17%);
  color: hsl(206, 8%, 100%);

  padding-inline: var(--extra-bevel);
  padding-top: 8px;
  padding-bottom: 8px;

  border-bottom-left-radius: var(--extra-bevel);
  border-top-right-radius: var(--extra-bevel);
  corner-shape: bevel;
  border: grey 2px solid;

  box-shadow: 0 0px 8px 4px hsla(206, 8%, 100%, 0.1);
}

.return {
  margin-top: 10%;
  margin-bottom: 10%;
}

.return:hover {
  cursor: pointer;

  box-shadow: 0 0px 8px 4px hsla(206, 8%, 100%, 0.7);
}

.time-container {
  grid-column: 2;

  display: grid;
  grid-template-columns: subgrid;

  gap: 16px;
}

.days.medium .time-container {
  grid-column: 2/4;
}

.time:nth-child(odd):last-child {
  grid-column: span 2;
}
</style>
