<script setup lang="ts">
import { getDayWeek, getMonthShortDate, getTime, isToday, isWithinSevenDays } from '@/utils/dates'
import { useElementBounding } from '@vueuse/core'
import { useTemplateRef } from 'vue'

interface StreamItem {
  id: string
  liveStreamingDetails: {
    scheduledStartTime: string
  }

  snippet: {
    title: string
    liveBroadcastContent: string
  }
}

const ref = useTemplateRef('card')
const { y } = useElementBounding(ref)

const props = defineProps<{
  data: StreamItem
  timezone: string
  containerTop: number
  containerBottom: number
}>()
</script>

<template>
  <div
    class="card"
    ref="card"
    :style="{
      transform: y
        ? `translateX(${Math.max(
            ((y - containerTop) / ((containerBottom - containerTop) / 2) - 1) * 80,
            0,
          )}%)`
        : '',
    }"
  >
    <img
      class="upNext"
      src="/src/assets/icons/pipkin-pippa/Up Next.svg"
      v-if="props.data.snippet.liveBroadcastContent === 'upcoming'"
    />
    <img
      class="upNext"
      src="/src/assets/icons/pipkin-pippa/Up Next Live.svg"
      v-else-if="props.data.snippet.liveBroadcastContent === 'live'"
    />
    <a :href="`https://www.youtube.com/watch?v=${props.data.id}`" target="_blank" class="title">{{
      props.data.snippet.title
    }}</a>
    <span
      class="pill day"
      v-if="isWithinSevenDays(props.data.liveStreamingDetails.scheduledStartTime)"
      >{{
        isToday(props.data.liveStreamingDetails.scheduledStartTime)
          ? 'Today'
          : getDayWeek(props.data.liveStreamingDetails.scheduledStartTime, timezone)
      }}</span
    >
    <span class="pill date">{{
      getMonthShortDate(props.data.liveStreamingDetails.scheduledStartTime, timezone)
    }}</span>
    <span class="pill time">{{
      getTime(props.data.liveStreamingDetails.scheduledStartTime, timezone)
    }}</span>
  </div>
</template>

<style scooped lang="scss">
@use '@/assets/styles/talents/pipkin-pippa.scss' as s;
.card {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 60% 5% 35%;
  align-items: center;

  width: 65%;
  aspect-ratio: 4/1;

  transition: transform 0.3s ease-out;
}

.card:first-child {
  aspect-ratio: 2/1;
}

.card:first-child {
  grid-row: 1/3;

  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 50% 15% 15% 2.5% 17.5%;

  align-items: center;

  margin-top: 55px;
}

.card .upNext {
  display: none;
}

.card:first-child .upNext {
  display: block;
  grid-column: 1/4;
  grid-row: 1/3;
  justify-self: center;

  height: 100%;
  padding-inline: 16px;
}

.card:first-child .title {
  grid-row: 2/5;
}

.card:first-child .pill {
  grid-row: 4/6;
}

.card .title {
  --color: hsl(#{s.$hot-brown});
  --bg-color: hsl(#{s.$white});
  --border-color: hsl(#{s.$black});

  grid-column: 2/-2;
  grid-row: 1/3;

  background-color: var(--bg-color);
  color: var(--color);
  width: 100%;
  height: 100%;
  text-align: center;
  text-decoration: none;
  @include f.responsive-type(s.$font-6-eb, s.$font-4-eb, s.$font-4-eb);

  display: grid;
  align-items: center;

  padding-inline: 16px;

  border: 4px var(--border-color) solid;
  border-radius: 9em;
}

.card .pill {
  --color: hsl(#{s.$white});
  --bg-color: hsl(#{s.$violet});
  --border-color: hsl(#{s.$white});

  grid-row: 2/4;

  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  color: var(--color);
  text-align: center;
  @include f.responsive-type(s.$font-6-eb, s.$font-4-eb, s.$font-4-eb);

  display: grid;
  align-items: center;

  border: 4px var(--border-color) solid;
  border-radius: 9em;
}

.card .day {
  --color: hsl(#{s.$white});
  --bg-color: hsl(#{s.$hot-pink});
  --border-color: hsl(#{s.$white});
  grid-column: 1/3;
}

.card .time {
  --color: hsl(#{s.$white});
  --bg-color: hsl(#{s.$violet});
  --border-color: hsl(#{s.$white});
  grid-column: 7/-1;
}

.card .date {
  --color: hsl(#{s.$hot-brown});
  --bg-color: hsl(#{s.$base-pink});
  --border-color: hsl(#{s.$white});
  grid-column: 4/6;
}
</style>
