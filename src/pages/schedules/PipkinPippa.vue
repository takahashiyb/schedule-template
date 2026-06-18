<script setup lang="ts">
import TwitchIcon from '@/components/svg/TwitchIcon.vue'
import YoutubeIcon from '@/components/svg/YoutubeIcon.vue'
import DayDisplay from '@/components/talents/pipkin-pippa/DayDisplay.vue'
import DetailBackground from '@/components/talents/pipkin-pippa/DetailBackground.vue'
import { setBg } from '@/utils/background'
import { youtubeUpcomingStreamList } from '@/utils/youtube-api'
import { useElementBounding } from '@vueuse/core'
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

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

interface StreamWrapper {
  items: StreamItem[]
}

const daysContainer = useTemplateRef<HTMLDivElement>('daysContainer')

const { top: containerTop, bottom: containerBottom } = useElementBounding(daysContainer)

const refComingSoon = useTemplateRef<HTMLDivElement>('comingSoon')

const { top: ribbonY } = useElementBounding(refComingSoon)

const background = 'hsl(5, 92%, 95%)'

const timezone = 'America/Los_Angeles'

const data = ref<StreamWrapper[]>([])

const channelId = 'UCJ46YTYBQVXsfsp8-HryoUA'

onMounted(async () => {
  setBg(background)

  data.value = await youtubeUpcomingStreamList(channelId)
})

onUnmounted(() => {
  setBg('hsl(0, 0%, 100%)')
})
</script>

<template>
  <section class="display">
    <div class="featured-art">
      <img src="@/assets/icons/fujikura-uruka/fan-logo.svg" alt="" />
    </div>

    <DetailBackground class="background"></DetailBackground>

    <div class="days" ref="daysContainer">
      <DayDisplay
        v-for="(value, index) in data.sort(
          (acc, curr) =>
            new Date(acc.items[0]!.liveStreamingDetails.scheduledStartTime).getTime() -
            new Date(curr.items[0]!.liveStreamingDetails.scheduledStartTime).getTime(),
        )"
        :key="`day-${index}`"
        :data="value.items[0]!"
        :timezone="timezone"
        :container-top="containerTop"
        :container-bottom="containerBottom"
      ></DayDisplay>
      <div
        class="coming-soon"
        ref="comingSoon"
        :style="{
          transform: ribbonY
            ? `translateX(${Math.max(
                ((ribbonY - containerTop) / ((containerBottom - containerTop) / 2) - 1) * 80,
                0,
              )}%)`
            : '',
        }"
      >
        <img class="tail-ribbon" src="/assets/icons/pipkin-pippa/Tail Ribbon.svg" alt="" />
        <span>New schedules coming soon...</span>
      </div>
    </div>

    <div class="artist-details">
      <span>Art by: </span>
      <span>#MMOARTPG </span>
    </div>

    <svg class="title" viewBox="0 0 131 20" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="16" font-size="20">Pipkin Pippa's</text>
    </svg>
    <svg class="subtext" viewBox="0 0 177 20" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="16" font-size="20">Upcoming Streams</text>
    </svg>
    <div class="socials">
      <span>@PipkinPippa</span>
      <YoutubeIcon class="social-icon" />
      <TwitchIcon class="social-icon" />
    </div>
    <img class="arm-ribbon" src="/assets/icons/pipkin-pippa/Arm Ribbon.svg" alt="" />
    <img
      class="ribbon-collection-horizontal"
      src="/assets/icons/pipkin-pippa/Ribbon Collection.svg"
      alt=""
    />
    <img
      class="ribbon-collection-vertical"
      src="/assets/icons/pipkin-pippa/Ribbon Collection1.svg"
      alt=""
    />
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/talents/pipkin-pippa.scss' as s;

.display {
  width: 100%;
  max-width: 100svh;
  aspect-ratio: 1/1;
  margin: auto;

  display: grid;
  grid-template-columns: repeat(8, 1fr);
  column-gap: 20px;
  grid-template-rows: repeat(8, 1fr);
}

.display * {
  font-family: 'Nunito', serif;
}

.background {
  grid-column: 1/-1;
  grid-row: 1/-1;
}

.title {
  fill: hsl(s.$white);
  stroke: hsl(s.$hot-pink);
  @include f.flat-type(s.$font-2);
  stroke-width: 0.7;
  stroke-linejoin: round;
  height: 60%;

  grid-column: 1/6;
  grid-row: 6;
  align-self: end;
  justify-self: center;
}

.subtext {
  fill: hsl(s.$white);
  stroke: hsl(s.$hot-pink);
  @include f.flat-type(s.$font-1);
  stroke-width: 0.7;
  stroke-linejoin: round;
  height: 100%;

  grid-column: 2/-2;
  grid-row: 7;
  justify-self: center;
}

.socials {
  color: hsl(s.$white);
  @include f.flat-type(s.$font-5-b);

  grid-column: 5/-1;
  grid-row: 8;
  justify-self: end;
  align-self: center;

  display: flex;
  align-items: center;
  gap: 8px;

  padding-inline: 24px;
}

.socials .social-icon {
  height: 24px;
  fill: hsl(s.$white);
}

.days {
  grid-column: 1/9;
  grid-row: 1/7;
  justify-self: center;
  align-self: center;

  height: 100%;

  display: grid;
  row-gap: 20px;

  width: 100%;

  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;

  mask-image: linear-gradient(to bottom, transparent 0%, black 10% 65%, transparent 85%);
  padding-left: 24px;

  padding-bottom: 220px;

  scroll-behavior: smooth;
}

.coming-soon {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;

  width: 65%;
  @include f.responsive-type(s.$font-6-eb, s.$font-4-eb, s.$font-4-eb);

  padding-top: 110px;
  padding-bottom: 110px;
}

.coming-soon span {
  --color: hsl(#{s.$white});
  --bg-color: hsl(#{s.$hot-pink});
  --border-color: hsl(#{s.$white});

  color: var(--color);
  background-color: var(--bg-color);
  width: 100%;
  height: 100%;
  text-align: center;

  border: 4px var(--border-color) solid;
  border-radius: 9em;

  display: grid;
  align-items: center;

  padding-inline: 16px;
}

.tail-ribbon {
  height: 50%;
  transform: rotateZ(-90deg);
}

.artist-details {
  grid-row: 4;
  grid-column: 6/9;

  justify-self: end;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.artist-details span {
  background-color: hsl(s.$violet);
  color: hsl(s.$white);
  @include f.responsive-type(s.$font-6-eb, s.$font-5-eb, s.$font-5-eb);

  padding-top: 8px;
  padding-bottom: 8px;
  padding-inline: 16px;
}

.arm-ribbon {
  grid-row: 6/8;
  grid-column: 8;
}

.ribbon-collection-horizontal {
  grid-row: 8;
  grid-column: 2/4;

  align-self: center;
  justify-self: start;
}

.ribbon-collection-vertical {
  grid-row: 5;
  grid-column: 8;

  align-self: center;
  justify-self: center;

  width: 50%;
}

.featured-art {
  grid-row: 1/-2;
  grid-column: 5/-1;

  height: 100%;
  width: 100%;
}

.featured-art img {
  height: 100%;
  width: 100%;

  object-fit: contain;
  object-position: middle;
}
</style>
