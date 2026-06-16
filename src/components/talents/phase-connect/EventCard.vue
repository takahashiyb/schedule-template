<script setup lang="ts">
import type { DataYoutube } from '@/types/youtube-streaming-list'
import { getShortTime } from '@/utils/dates'

const props = defineProps<{ event: DataYoutube; timezone: string }>()
</script>
<template>
  <div class="time">
    <p class="time-display">
      {{ getShortTime(props.event.items[0]!.liveStreamingDetails.scheduledStartTime, timezone) }}
    </p>
    <p class="title">{{ props.event.items[0]!.snippet.title }}</p>
  </div>
</template>
<style scoped lang="scss">
.time {
  // padding-inline: 32px;
  // padding-top: 8px;
  // padding-bottom: 8px;
}

.time-display {
  justify-self: start;
  text-align: center;

  background-color: hsl(206, 8%, 100%);
  aspect-ratio: 16/1;

  padding-inline: 32px;
  padding-top: 8px;
  padding-bottom: 8px;

  border-top-left-radius: 9em;
  border-bottom-right-radius: 9em;
  corner-shape: bevel;

  box-shadow: 0 -2px 16px 8px hsla(206, 8%, 100%, 0.1);
}

.title {
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

.time:nth-child(odd):last-child .title {
  text-align: center;
}
</style>
