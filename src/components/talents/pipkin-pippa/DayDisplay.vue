<script setup lang="ts">
// import { useElementBounding } from '@vueuse/core'
// import { useTemplateRef } from 'vue'

import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'
import { getShortTime } from '@/utils/dates'
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

const props = defineProps<{ event: StreamWrapper; timezone: string; talent?: Talent }>()

const breakpoints = useBreakpoints(breakpointsVuetifyV3)

const medium = breakpoints.greater('sm')
const large = breakpoints.greater('md')

// const { y } = useElementBounding(ref)
</script>

<template>
  <div
    class="time"
    :class="{
      medium: medium,
      large: large,
      live: props.event.items[0]!.snippet.liveBroadcastContent === 'live',
    }"
  >
    <div class="title">
      <p>
        {{ props.event.items[0]!.snippet.title }}
      </p>
    </div>
    <p class="time-display">
      {{
        props.event.items[0]!.snippet.liveBroadcastContent === 'live'
          ? 'LIVE'
          : getShortTime(props.event.items[0]!.liveStreamingDetails.scheduledStartTime, timezone)
      }}
    </p>
    <img class="arm-ribbon" src="/assets/icons/pipkin-pippa/Arm Ribbon 2.svg" alt="" />
  </div>
</template>
<style scoped lang="scss">
@use '/src/assets/styles/talents/pipkin-pippa.scss' as s;

.time {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  align-items: center;
}

.time.large {
  grid-template-rows: repeat(6, 1fr);
}

.time-display {
  --border-color: hsl(#{s.$white});

  background-color: hsl(s.$violet);
  color: hsl(s.$white);

  padding-inline: 12px;
  padding-top: 8px;
  padding-bottom: 8px;

  border: 4px var(--border-color) solid;
  border-radius: 1em;

  grid-column: 1/17;
  grid-row: 2;
  justify-self: start;
}

.time.medium .time-display {
  padding-inline: 1em;

  border-radius: 9em;
}

.time.medium .time-display {
  grid-row: 4/7;
  grid-column: 1/8;
}

.title {
  --border-color: hsl(#{s.$hot-pink});

  background-color: hsl(s.$white);
  color: hsl(s.$hot-pink);
  min-height: 100%;
  text-align: center;

  padding-inline: 12px;
  padding-top: 8px;
  padding-bottom: 8px;

  border: 4px var(--border-color) solid;

  border-radius: 1em;

  grid-column: 1/17;
  grid-row: 1;
}

.time.medium .title {
  padding-inline: 1em;
  padding-bottom: 1em;

  border-radius: 3em;

  display: grid;
  grid-template-columns: subgrid;
}

.time.medium .title p {
  grid-column: 2/14;
}

.time.medium .title {
  border-radius: 9em 3em 3em 9em;

  grid-column: 2/17;
  grid-row: 1/5;
}

.time:nth-child(odd):last-child .title {
  text-align: center;
}

.arm-ribbon {
  grid-row: 1/5;
  // grid-row: 4/7;
  grid-column: 15/17;

  aspect-ratio: 2/1;
  display: none;
}

.time.medium:nth-child(odd):last-child .arm-ribbon {
  display: inline-block;
}
</style>
