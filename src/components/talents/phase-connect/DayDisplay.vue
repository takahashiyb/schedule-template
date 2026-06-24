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
  <div
    class="time"
    :class="{
      medium: medium,
      large: large,
      live: props.event.items[0]!.snippet.liveBroadcastContent === 'live',
    }"
  >
    <p class="time-display">
      {{
        props.event.items[0]!.snippet.liveBroadcastContent === 'live'
          ? 'LIVE'
          : getShortTime(props.event.items[0]!.liveStreamingDetails.scheduledStartTime, timezone)
      }}
    </p>
    <p class="title">{{ props.event.items[0]!.snippet.title }}</p>
  </div>
</template>
<style scoped lang="scss">
$lower-left: 10px 10px;
$left: 20px 0px;
$upper-left: 30px -10px;
$upper: 10px -10px;
$upper-right: -10px -10px;
$right: -20px 0px;
$lower-right: -30px 10px;
$lower: 10px 10px;
$blur: 25px;

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

.time.live .time-display {
  animation: spinColors 3s linear infinite;

  clip-path: polygon(
    calc(-12px + var(--time-bevel)) 0,
    -4px 100%,
    calc(300% - var(--time-bevel) + 4px) 100%,
    calc(300% + 4px) 0
  );
}

.time.medium.live .time-display {
  clip-path: polygon(
    calc(-28px + var(--time-bevel)) 0,
    -4px 100%,
    calc(300% - var(--time-bevel) + 4px) 100%,
    calc(300% + 4px) 0
  );
}

.time.live .title {
  animation: spinColors 3s linear infinite;

  clip-path: polygon(
    -4px -4px,
    -4px calc(100% + 4px - var(--title-bevel)),
    calc(-4px + var(--title-bevel)) calc(100% + 4px),
    calc(100% + 4px) calc(100% + 4px),
    calc(100% + 4px) calc(var(--title-bevel) + -4px),
    calc(100% - var(--title-bevel) + 4px) -4px
  );
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

@keyframes spinColors {
  0% {
    box-shadow:
      $lower-left $blur red,
      $left $blur orange,
      $upper-left $blur yellow,
      $upper $blur green,
      $upper-right $blur blue,
      $right $blur violet,
      $lower-right $blur indigo,
      $lower $blur white;
  }
  12.5% {
    box-shadow:
      $left $blur red,
      $upper-left $blur orange,
      $upper $blur yellow,
      $upper-right $blur green,
      $right $blur blue,
      $lower-right $blur violet,
      $lower $blur indigo,
      $lower-left $blur white;
  } /* 360/6 */
  25% {
    box-shadow:
      $upper-left $blur red,
      $upper $blur orange,
      $upper-right $blur yellow,
      $right $blur green,
      $lower-right $blur blue,
      $lower $blur violet,
      $lower-left $blur indigo,
      $left $blur white;
  }
  37.5% {
    box-shadow:
      $upper $blur red,
      $upper-right $blur orange,
      $right $blur yellow,
      $lower-right $blur green,
      $lower $blur blue,
      $lower-left $blur violet,
      $left $blur indigo,
      $upper-left $blur white;
  }
  50% {
    box-shadow:
      $upper-right $blur red,
      $right $blur orange,
      $lower-right $blur yellow,
      $lower $blur green,
      $lower-left $blur blue,
      $left $blur violet,
      $upper-left $blur indigo,
      $upper $blur white;
  }
  62.5% {
    box-shadow:
      $right $blur red,
      $lower-right $blur orange,
      $lower $blur yellow,
      $lower-left $blur green,
      $left $blur blue,
      $upper-left $blur violet,
      $upper $blur indigo,
      $upper-right $blur white;
  }

  75% {
    box-shadow:
      $lower-right $blur red,
      $lower $blur orange,
      $lower-left $blur yellow,
      $left $blur green,
      $upper-left $blur blue,
      $upper $blur violet,
      $upper-right $blur indigo,
      $right $blur white;
  }

  87.5% {
    box-shadow:
      $lower $blur red,
      $lower-left $blur orange,
      $left $blur yellow,
      $upper-left $blur green,
      $upper $blur blue,
      $upper-right $blur violet,
      $right $blur indigo,
      $lower-right $blur white;
  }

  100% {
    box-shadow:
      $lower-left $blur red,
      $left $blur orange,
      $upper-left $blur yellow,
      $upper $blur green,
      $upper-right $blur blue,
      $right $blur violet,
      $lower-right $blur indigo,
      $lower $blur white;
  }
}
</style>
