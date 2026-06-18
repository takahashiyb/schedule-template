<script setup lang="ts">
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
</script>
<template>
  <div class="time" :class="{ medium: medium, large: large }">
    <p class="time-display">
      {{ getShortTime(props.event.items[0]!.liveStreamingDetails.scheduledStartTime, timezone) }}
    </p>
    <p class="title">{{ props.event.items[0]!.snippet.title }}</p>
  </div>
</template>
<style scoped lang="scss">
.time {
  --title-bevel: 12px;
  --time-bevel: 3em;
}

.time.medium {
  --title-bevel: 32px;
  --time-bevel: 4em;
}

.time-display {
  justify-self: start;
  text-align: start;

  background-color: hsl(206, 8%, 100%);

  padding-inline: var(--time-bevel);
  padding-top: 8px;
  padding-bottom: 8px;

  border-top-left-radius: var(--time-bevel);
  border-bottom-right-radius: var(--time-bevel);

  corner-shape: bevel;

  margin-bottom: 4px;

  box-shadow: 0 -2px 16px 8px hsla(206, 8%, 100%, 0.1);
}

.time.medium .time-display {
  aspect-ratio: 12/1;
}

.time.large .time-display {
  aspect-ratio: 16/1;
}

.title {
  background-color: hsl(206, 8%, 17%);
  color: hsl(206, 8%, 100%);

  padding-inline: var(--title-bevel);
  padding-top: 8px;
  padding-bottom: 8px;

  border-bottom-left-radius: var(--title-bevel);
  border-top-right-radius: var(--title-bevel);
  corner-shape: bevel;

  border: hsla(var(--talent-color-2), 0.6) 2px solid;

  box-shadow: 0 0px 12px 8px hsla(var(--talent-color-1), 0.4);
}

.time:nth-child(odd):last-child .title {
  text-align: center;
}
</style>
