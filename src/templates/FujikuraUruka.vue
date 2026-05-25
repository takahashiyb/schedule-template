<script setup lang="ts">
import DayDisplay from '@/components/talents/fujikura-uruka/DayDisplay.vue'
import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'
import { onMounted } from 'vue'

const schedule = [
  {
    dayoff: true,
    time: '2024-07-08T00:00:00Z',
    timezone: 'America/Los_Angeles',
    title: '',
  },
  {
    dayoff: true,
    time: '2024-07-09T00:00:00Z',
    timezone: 'America/Los_Angeles',
    title: '',
  },
  {
    dayoff: false,
    time: '2024-07-10T02:30:00Z',
    timezone: 'America/Los_Angeles',
    title: 'CHILDHOOD VIOLIN PIECES - BLIND PLAYTHROUGH (OH NO)',
  },
  {
    dayoff: false,
    time: '2024-07-10T02:30:00Z',
    timezone: 'America/Los_Angeles',
    title: 'CHILDHOOD VIOLIN PIECES - BLIND PLAYTHROUGH (OH NO)',
  },
  {
    dayoff: false,
    time: '2024-07-11T06:00:00Z',
    timezone: 'America/Los_Angeles',
    title: 'VIOLIN KARAOKE - SHORTS STREAM',
  },
  {
    dayoff: false,
    time: '2024-07-12T02:30:00Z',
    timezone: 'America/Los_Angeles',
    title: 'SUPERMARKET SIMULATOR (CHAT)',
  },
  {
    dayoff: false,
    time: '2024-07-13T06:00:00Z',
    timezone: 'America/Los_Angeles',
    title: 'VIOLIN KARAOKE - SHORTS STREAM',
  },
  {
    dayoff: false,
    time: '2024-07-14T00:00:00Z',
    timezone: 'America/Los_Angeles',
    title: 'TRYING TACO BELL FOR THE FIRST TIME',
  },
]

function setBg(color: string) {
  document.body.style.backgroundColor = color
}

const artist = '1guy'

const timezone = 'PT'

const tag = 'Urukart'

const breakpoints = useBreakpoints(breakpointsVuetifyV3)

// optional: set default background when component mounts
onMounted(() => {
  setBg('hsl(231, 67%, 9%)')
})

function getDate(time: string) {
  const date = new Date(time)
  return date.toLocaleDateString('en-US', { day: '2-digit' }).toUpperCase()
}

function getMonth(time: string) {
  const date = new Date(time)
  return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}
</script>
<template>
  <section class="display" :class="{ large: breakpoints.greater('md').value }">
    <div class="featured">
      <img src="/src/assets/icons/fujikura-uruka/fan-logo.svg" alt="" />
    </div>
    <img
      class="background-bottom"
      src="/src/assets/icons/fujikura-uruka/background-mobile-b.svg"
      alt=""
    />
    <img class="background-large" src="/src/assets/icons/fujikura-uruka/background.svg" alt="" />
    <div class="header">
      <h1 class="sr-only">weekly schedule</h1>

      <div class="date-range">
        <svg
          class="bookmark-shape"
          viewBox="0 0 92 152"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="hsl(186, 64%, 52%)" />
              <stop offset="100%" stop-color="hsl(61, 34%, 72%)" />
            </linearGradient>
            <linearGradient id="gradDayFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="hsl(78, 20%, 17%)" />
              <stop offset="100%" stop-color="hsl(196, 62%, 15%)" />
            </linearGradient>
          </defs>
          <path
            d="
          M4.20267 136.287V15.2765H87.2086C87.2086 15.2765 87.7056 112.356 87.7056 136.287C87.7056 160.218 55.9053 134.5 47.4556 134.5C39.0059 134.5 4.20266 161 4.20267 136.287Z
          M0.5 134.5V0.5H91.4112V134.5C91.4112 169 59.4556 139 47.9556 139C36.4556 139 0.5 168.5 0.5 134.5Z"
            stroke-linejoin="round"
            fill="url(#gradStroke)"
          />
          <path
            d="
          M4.20267 136.287V15.2765H87.2086C87.2086 15.2765 87.7056 112.356 87.7056 136.287C87.7056 160.218 55.9053 134.5 47.4556 134.5C39.0059 134.5 4.20266 161 4.20267 136.287Z"
            stroke-linejoin="round"
            fill="url(#gradDayFill)"
          />
        </svg>
        <div v-for="date in schedule.filter((_, index) => index === 0)" :key="date.title">
          <p>{{ getDate(date.time) }}</p>
          <p>{{ getMonth(date.time) }}</p>
        </div>
        <hr />
        <div
          v-for="date in schedule.filter((_, index) => index === schedule.length - 1)"
          :key="date.title"
        >
          <p>{{ getDate(date.time) }}</p>
          <p>{{ getMonth(date.time) }}</p>
        </div>
      </div>
      <p class="weekly">
        <span>WEEKLY </span>
        <svg class="circle" viewBox="0 0 12 12" height="30px">
          <circle fill="none" r="5" cx="6" cy="6"></circle>
        </svg>
      </p>
      <br />
      <p class="schedule">
        <span class="cap-schedule">s</span><span class="no-cap">chedule.</span>
        <svg class="circle" viewBox="0 0 12 12" height="30px">
          <circle fill="none" r="5" cx="6" cy="6"></circle>
        </svg>
      </p>
    </div>
    <div class="days" :style="`--days: ${schedule.length}`">
      <DayDisplay v-for="current in schedule" :key="current.time" :schedule="current" size="auto" />
    </div>
    <div class="links">
      <p>
        <svg
          class="link-icon-1"
          viewBox="0 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          preserve-aspect-ratio="xMidYMid meet"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <title>music [#995]</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-260.000000, -3799.000000)"
                class="music-1--color"
              >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M211.987988,3643 L221.997998,3643 L221.997998,3641 L211.987988,3641 L211.987988,3643 Z M209.985986,3639 L209.985986,3651.535 C208.984985,3651.195 208.726727,3651 207.997998,3651 C205.785786,3651 204,3652.791 204,3655 C204,3657.209 205.782783,3659 207.993994,3659 C210.205205,3659 211.987988,3657.209 211.987988,3655 L211.987988,3645 L221.997998,3645 L221.997998,3651.535 C220.996997,3651.195 220.738739,3651 220.01001,3651 C217.797798,3651 216.012012,3652.791 216.012012,3655 C216.012012,3657.209 217.794795,3659 220.006006,3659 C222.217217,3659 224,3657.209 224,3655 L224,3639 L209.985986,3639 Z"
                    id="music-[#995]"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span>&ensp; @fujikurauruka</span>
      </p>
      <p>
        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
        <svg
          class="link-icon-2"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>twitch</title>
          <path
            d="M26.711 14.929l-4.284 4.284h-4.285l-3.749 3.749v-3.749h-4.82v-16.067h17.138zM8.502 1.004l-5.356 5.356v19.279h6.427v5.356l5.356-5.356h4.284l9.641-9.64v-14.996zM21.356 6.895h2.142v6.427h-2.142zM15.464 6.895h2.143v6.427h-2.144z"
          ></path>
        </svg>
        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
        <svg
          class="link-icon-2"
          viewBox="0 -3 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <title>youtube [#168]</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Page-1" stroke-width="1" fill-rule="evenodd">
            <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -7442.000000)">
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289"
                  id="youtube-[#168]"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        <span>&ensp;/fujikurauruka</span>
      </p>
    </div>

    <div class="artist">
      <svg
        viewBox="0 0 202 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserve-aspect-ratio="none"
      >
        <defs>
          <linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="hsl(186, 64%, 52%)" />
            <stop offset="100%" stop-color="hsl(61, 34%, 72%)" />
          </linearGradient>
          <linearGradient id="gradDayFill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="hsl(78, 20%, 17%)" />
            <stop offset="100%" stop-color="hsl(196, 62%, 15%)" />
          </linearGradient>
        </defs>
        <path
          d="M181 0.5H0V40.5H181C192.046 40.5 201 31.5457 201 20.5C201 9.45431 192.046 0.5 181 0.5Z"
          fill="url(#gradFill)"
        />
        <path
          d="M0 40.5H181C192.046 40.5 201 31.5457 201 20.5C201 9.45431 192.046 0.5 181 0.5H0"
          stroke="url(#gradStroke)"
          stroke-width="3"
        />
      </svg>
      <p>ILLUST BY @{{ artist }}</p>
    </div>
    <div class="timezone">
      <svg
        class="star"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        preserve-aspect-ratio="xMidYMid meet"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
      <p>
        <span class="dashes" :class="{ small: breakpoints.smaller('sm').value }"> - - - - - </span
        ><span>ALL TIMES IN </span><span>{{ timezone }}</span>
      </p>
    </div>
    <div class="tag">
      <img
        src="/src/assets/icons/fujikura-uruka/palette-icon.svg
      "
        alt=""
      />
      <p>#{{ tag }}</p>
    </div>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/talents/fujikura-uruka.scss' as s;

.display {
  font-family: 'Nunito', sans-serif;
  max-height: 100svh;
  overflow-y: hidden;
  @include f.responsive-grid(f.em(10), f.em(1), 8, f.em(1600));
  grid-template-rows: repeat(9, 1fr);
  row-gap: 5px;
}

.display.large {
  max-height: f.em(900);
  min-height: f.em(800);
  height: 100svh;
  grid-template-rows: repeat(11, 1fr);
  aspect-ratio: 16/9;
  margin-inline: auto;
}

.featured {
  grid-column: 1/-1;
  grid-row: 3/7;
}

.display.large .featured {
  grid-column: 2/6;
  grid-row: 1/-1;
}

.featured img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.background-bottom {
  grid-column: 1/-1;
  grid-row: 5/-1;
  justify-self: center;
}

.display.large .background-bottom {
  display: none;
}

.background-large {
  display: none;
}

.display.large .background-large {
  display: block;

  grid-column: 3/-2;
  grid-row: 1/-1;

  justify-self: end;

  height: 100%;
}

.header {
  grid-column: 2/-2;
  grid-row: 1/3;

  color: white;

  display: grid;
  grid-template-rows: subgrid;
  grid-template-columns: subgrid;
}

.display.large .header {
  grid-column: 4/-2;
}

.header .circle {
  display: inline;

  height: 10px;
  stroke: white;
  stroke-width: 2px;
  vertical-align: top;
}

.header .schedule .circle {
  display: none;
}

.display.large .header .schedule .circle {
  display: inline;
}

.date-range {
  grid-row: 1/3;
  grid-column: 1/3;
  justify-self: center;
  align-self: center;

  display: grid;
  grid-template-rows: 1fr min-content 1fr;
  gap: 8px;
  justify-content: center;

  height: 100%;
  text-align: center;
  letter-spacing: 0.3em;
}

.display.large .date-range {
  grid-row: 1/-1;
  grid-column: 1;
  justify-self: start;
  align-self: center;
}

.bookmark-shape {
  fill-rule: evenodd;
  object-fit: contain;
  grid-row: 1/-1;
  grid-column: 1;
  height: 100%;
}

.date-range > :nth-child(2) {
  grid-row: 1;
  grid-column: 1;
  align-self: end;
}

.date-range > :nth-child(3) {
  grid-row: 2;
  grid-column: 1;
  justify-self: center;

  width: 60%;

  border: 0;
  border-top: 4px dashed hsl(s.$yellow);
}

.date-range > :nth-child(4) {
  grid-row: 3;
  grid-column: 1;
}

.date-range div > :first-child,
.date {
  @include f.flat-type(s.$font-2-5);
}

.date-range div > :nth-child(2),
.cap-color {
  @include f.flat-type(s.$font-5-bold);
}

.date-range div > :first-child,
.date-range div > :nth-child(2)::first-letter {
  color: hsl(s.$yellow);
}

.weekly,
.schedule {
  grid-column: 3/-2;
  padding-left: 16px;
}

.weekly {
  color: hsl(s.$grey-blue);
  @include f.responsive-type(s.$font-6-bold, s.$font-3, s.$font-3);
  grid-row: 1;

  align-self: end;
  letter-spacing: f.em(3);
}

.display.large .weekly {
  grid-column: 2/-1;
  padding-left: 0;
}

.schedule {
  align-self: start;
  @include f.responsive-type(s.$font-3, s.$font-1, s.$font-1);
  letter-spacing: f.em(3);
  grid-row: 2;
}

.display.large .schedule {
  grid-column: 2/-1;
  align-self: center;
  padding-left: 0;
}

.cap-schedule {
  color: hsl(s.$yellow);
}

.no-cap {
  background-image: linear-gradient(to right, s.$gradient-1);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.days {
  grid-column: 2/-2;
  grid-row: 7/9;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;

  overflow-y: scroll;
  scrollbar-width: none;
}

.display.large .days {
  padding-right: 5%;

  grid-column: 5/10;
  grid-row: 3/11;
}

.links {
  grid-column: 7/10;
  grid-row: 3;

  justify-self: center;
  align-self: center;

  @include f.flat-type(s.$font-6);
  color: hsl(s.$white);
}

.display.large .links {
  grid-column: 8/10;
  grid-row: 2;

  align-self: start;
}

.links > p {
  padding-bottom: 8px;
}

.links svg {
  display: inline;
  height: f.rem(12);
}

.link-icon-1 {
  transform: rotate(20deg);
}

.link-icon-1 path {
  fill: hsl(s.$yellow);
}

.link-icon-2 path {
  fill: hsl(s.$white);
}

.artist {
  grid-column: 1/-1;
  grid-row: 6;

  align-self: start;
  position: relative;
  justify-self: start;

  z-index: 99;
}

.display.large .artist {
  grid-column: 2/4;
  grid-row: 11;
}

.artist > svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 2rem;
  z-index: -1;
}

.artist > p {
  display: inline-block;
  padding: 12px;
  padding-inline: 12px;
  @include f.flat-type(s.$font-6-bold);
  color: hsl(s.$yellow);
}

.timezone {
  @include f.flat-type(s.$font-6-bold);
  color: hsl(s.$white);
  height: 100%;
  letter-spacing: 0.2em;

  grid-column: 1/6;
  grid-row: 9;
  justify-self: center;
  align-self: center;

  display: flex;
  align-items: center;
  width: fit-content;
}

.display.large .timezone {
  grid-column: 5/7;
  grid-row: 11;
}

.timezone p span:nth-child(2) {
  color: hsl(s.$blue);
}

.timezone .dashes {
  display: inline;
}
.timezone .dashes.small {
  display: none;
}

.star {
  height: 24px;
  fill: hsl(s.$yellow);
}

.tag {
  grid-column: 7/10;
  grid-row: 9;

  align-self: center;
  justify-self: center;

  display: flex;
  align-items: center;
}

.display.large .tag {
  grid-column: 8/10;
  grid-row: 11;
}

.tag > p {
  color: hsl(s.$white);
  @include f.flat-type(s.$font-6-bold);
}

.tag > img {
  display: inline-block;
  height: f.rem(12);
}
</style>
