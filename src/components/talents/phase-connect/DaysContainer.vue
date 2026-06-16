<script setup lang="ts">
import { computed } from 'vue'
import type { DataYoutube } from '@/types/youtube-streaming-list'
import { getDayWeek, getMonthShortDate, getYMD, isWithinSevenDays } from '@/utils/dates'
import EventCard from './EventCard.vue'

const props = defineProps<{ timezone: string; dataYoutube: DataYoutube[] }>()

const groupedByDate = computed(() => {
  return groupDataByDate(props.dataYoutube, props.timezone)
})

function groupDataByDate(data: DataYoutube[], timezone: string) {
  // Step 1: Pre-seed 8 days starting today
  const groups: Record<string, DataYoutube[]> = {}
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
  <section class="days">
    <div class="day" v-for="(time, date, index) in groupedByDate" :key="`date-${index}`">
      <div class="date" v-if="date === getYMD(new Date(), timezone)">Today</div>
      <div class="date" v-else>
        {{
          isWithinSevenDays(date) ? getDayWeek(date, timezone) : getMonthShortDate(date, timezone)
        }}
      </div>
      <div class="rest" v-if="!time.length">Talent Slumbers</div>
      <div class="time-container" v-else>
        <EventCard
          class="time"
          v-for="(value, index) in time.sort(
            (acc, curr) =>
              new Date(acc.items[0]!.liveStreamingDetails.scheduledStartTime).getTime() -
              new Date(curr.items[0]!.liveStreamingDetails.scheduledStartTime).getTime(),
          )"
          :key="`time-${index}`"
          :event="value"
          :timezone="props.timezone"
        ></EventCard>
      </div>
    </div>
    <div class="return"><p>Back to Top</p></div>
  </section>
</template>
<style scoped lang="scss">
.days {
  display: flex;
  flex-direction: column;
  gap: 40px;

  overflow: scroll;
  scrollbar-width: none;

  padding-inline: 80px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.day {
  display: grid;
  grid-template-columns: 2fr 5fr 5fr;
  gap: 32px;
  justify-items: center;
  align-items: center;
}

.date {
  grid-column: 1;
  grid-row: 1/-1;
  align-self: start;
  text-align: center;

  font-size: 24px;
  background-color: hsl(206, 8%, 17%);
  color: hsl(206, 8%, 100%);

  padding-inline: 32px;
  padding-top: 8px;
  padding-bottom: 8px;

  border-bottom-left-radius: 32px;
  border-top-right-radius: 32px;
  corner-shape: bevel;
  border: grey 4px solid;

  width: 100%;
}

.rest,
.return {
  grid-column: 2/4;
  text-align: center;
  width: 100%;

  font-size: 24px;
  min-height: 64px;
  background-color: hsl(206, 8%, 17%);
  color: hsl(206, 8%, 100%);

  padding-inline: 32px;
  padding-top: 8px;
  padding-bottom: 8px;

  border-bottom-left-radius: 32px;
  border-top-right-radius: 32px;
  corner-shape: bevel;
  border: grey 4px solid;

  box-shadow: 0 0px 8px 4px hsla(206, 8%, 100%, 0.1);
}

.return {
  margin-top: 10%;
  margin-bottom: 10%;
}

.time-container {
  grid-column: 2/4;

  display: grid;
  grid-template-columns: subgrid;

  gap: 16px;
}

.time:nth-child(odd):last-child {
  grid-column: span 2;
}
</style>
