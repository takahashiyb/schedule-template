<script setup lang="ts">
import { getDate, getDayWeek, getShortTime } from '@/utils/dates'
import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'
import { computed, ref } from 'vue'

type PropBreakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'auto'

const props = defineProps<{
  schedule: {
    dayoff: boolean
    time: string
    timezone: string
    title?: string
  }
  size: PropBreakpoints
}>()

const breakpoints = useBreakpoints(breakpointsVuetifyV3)

const breakpointslarger = computed(() => {
  return props.size === 'auto'
    ? breakpoints.greater('lg').value
    : breakpointsVuetifyV3[props.size] >= breakpointsVuetifyV3.lg
})

// If you also want runtime validation:

const dayoff = ref(props.schedule.dayoff)

const dayoffMessage = 'BEAR BUSINESS'

const time = computed(() => {
  return getShortTime(props.schedule.time, props.schedule.timezone).toUpperCase()
})

const day = computed(() => {
  return getDate(props.schedule.time, props.schedule.timezone)
})

const dayWeek = computed(() => {
  return getDayWeek(props.schedule.time, props.schedule.timezone).toUpperCase()
})
</script>
<template>
  <div
    class="container"
    :class="[
      { dayoff: dayoff },
      {
        large: breakpointslarger,
      },
    ]"
  >
    <svg
      class="border--event"
      :class="{ dayoff: dayoff }"
      width="100%"
      height="100%"
      viewBox="0 0 100 10"
    >
      <defs>
        <linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="hsl(186, 64%, 52%)" />
          <stop offset="100%" stop-color="hsl(61, 34%, 72%)" />
        </linearGradient>
        <linearGradient id="gradFill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="hsl(78, 20%, 17%)" />
          <stop offset="100%" stop-color="hsl(196, 62%, 15%)" />
        </linearGradient>
      </defs>
      <path
        d="M 10 0.5, H95, A4 4 0 1 1 95 9.5, H5,  A4 4 0 1 1 5 0.5, Z"
        stroke="url(#gradStroke)"
        stroke-linecap="round"
        stroke-width="0.5"
      />
    </svg>
    <svg
      class="border--day"
      width="100%"
      height="70%"
      viewBox="0 -0.5 108 56"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="hsl(186, 64%, 52%)" />
          <stop offset="100%" stop-color="hsl(61, 34%, 72%)" />
        </linearGradient>
        <linearGradient id="gradFill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="hsl(78, 20%, 17%)" />
          <stop offset="100%" stop-color="hsl(196, 62%, 15%)" />
        </linearGradient>
      </defs>
      <path
        d="M78.0053 0.500009L27.5053 0.500009C-7.49481 0.500007 -9.49481 54 27.5053 54H78.0053C118.005 54 114.005 0.500031 78.0053 0.500009Z"
        stroke="url(#gradStroke)"
        fill="url(#gradFill)"
        stroke-width="3"
      />
    </svg>
    <div class="day">
      <p class="date">{{ day }}</p>
      <p class="cap-color">{{ dayWeek }}.</p>
    </div>
    <div class="container__title">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserve-aspect-ratio="xMidYMid meet"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
      <p>
        {{ !dayoff ? props.schedule.title : dayoffMessage }}
      </p>
    </div>
    <div class="container__fan-logo">
      <img class="logo" src="/src/assets/icons/fujikura-uruka/fan-logo.svg" alt="" />
      <svg
        class="logo-deco-1"
        viewBox="0 0 17 17"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        preserve-aspect-ratio="xMidYMid meet"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <title>115</title>
          <defs></defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path
              d="M7.942,0.751 L6.035,0.042 L6.035,11.139 C5.433,11.089 4.75,11.176 4.111,11.438 C2.517,12.089 1.689,13.655 2.146,14.75 C2.604,15.848 4.175,16.354 5.767,15.703 C6.991,15.203 7.84,14.252 7.951,13.341 L7.943,3.524 C10.57,4.322 12.463,5.197 12.463,7.808 C12.463,8.735 13.983,9.631 13.983,5.996 C13.982,2.904 11.33,1.034 7.942,0.751 L7.942,0.751 Z"
              class="si-glyph-fill"
            ></path>
          </g>
        </g>
      </svg>
      <svg
        class="logo-deco-2"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserve-aspect-ratio="xMidYMid meet"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
      <svg
        class="logo-deco-3"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserve-aspect-ratio="xMidYMid meet"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
      <svg
        class="logo-deco-4"
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
    </div>
    <p class="time">{{ time }}</p>
    <div class="border-deco">
      <svg
        class="border-deco-1"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserve-aspect-ratio="xMidYMid meet"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
      <svg class="border-deco-2" viewBox="0 0 12 12" height="30px">
        <circle r="5" cx="6" cy="6"></circle>
      </svg>
      <svg class="border-deco-3" viewBox="0 0 12 12" height="30px">
        <circle r="5" cx="6" cy="6"></circle>
      </svg>
    </div>
    <div class="end">
      <svg
        class="end-1"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserve-aspect-ratio="xMidYMid meet"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>

      <svg
        class="end-2"
        viewBox="0 0 154 154"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserve-aspect-ratio="xMidYMid meet"
      >
        <path
          d="M41.541 77.3553C60.8502 70.2171 68.5184 62.3869 76.8964 42C82.3647 64.6228 90.5543 71.8898 112.252 77.3553C89.1318 83.927 81.316 91.6096 76.8964 112.711C68.2113 92.6418 60.6456 84.6862 41.541 77.3553Z"
        />
        <path d="M76.541 117V152.083H75.541V116.987C75.8734 116.995 76.2067 117 76.541 117Z" />
        <path d="M76.541 37C76.2067 37 75.8734 37.0036 75.541 37.0117V1H76.541V37Z" />
        <path
          d="M36.5703 75.541C36.5584 75.8734 36.5506 76.2067 36.5469 76.541H1V75.541H36.5703Z"
        />
        <path
          d="M152.083 76.541H116.535C116.531 76.2067 116.524 75.8734 116.512 75.541H152.083V76.541Z"
        />
        <path
          d="M129.957 129.957L129.25 130.664L104.342 105.756C104.581 105.524 104.818 105.289 105.052 105.052L129.957 129.957Z"
        />
        <path
          d="M48.4883 48.4883C48.2507 48.7221 48.0159 48.9586 47.7842 49.1982L22.418 23.832L23.125 23.125L48.4883 48.4883Z"
        />
        <path
          d="M47.3369 104.33C47.5648 104.573 47.7955 104.814 48.0293 105.052L23.125 129.957L22.418 129.25L47.3369 104.33Z"
        />
        <path
          d="M129.957 23.125L104.593 48.4883C104.355 48.2545 104.114 48.0238 103.871 47.7959L129.25 22.418L129.957 23.125Z"
        />
        <path
          d="M41.541 77.3553C60.8502 70.2171 68.5184 62.3869 76.8964 42C82.3647 64.6228 90.5543 71.8898 112.252 77.3553C89.1318 83.927 81.316 91.6096 76.8964 112.711C68.2113 92.6418 60.6456 84.6862 41.541 77.3553Z"
          stroke-width="2"
        />
        <path
          d="M76.541 117V152.083H75.541V116.987C75.8734 116.995 76.2067 117 76.541 117Z"
          stroke-width="2"
        />
        <path
          d="M76.541 37C76.2067 37 75.8734 37.0036 75.541 37.0117V1H76.541V37Z"
          stroke-width="2"
        />
        <path
          d="M36.5703 75.541C36.5584 75.8734 36.5506 76.2067 36.5469 76.541H1V75.541H36.5703Z"
          stroke-width="2"
        />
        <path
          d="M152.083 76.541H116.535C116.531 76.2067 116.524 75.8734 116.512 75.541H152.083V76.541Z"
          stroke-width="2"
        />
        <path
          d="M129.957 129.957L129.25 130.664L104.342 105.756C104.581 105.524 104.818 105.289 105.052 105.052L129.957 129.957Z"
          stroke-width="2"
        />
        <path
          d="M48.4883 48.4883C48.2507 48.7221 48.0159 48.9586 47.7842 49.1982L22.418 23.832L23.125 23.125L48.4883 48.4883Z"
          stroke-width="2"
        />
        <path
          d="M47.3369 104.33C47.5648 104.573 47.7955 104.814 48.0293 105.052L23.125 129.957L22.418 129.25L47.3369 104.33Z"
          stroke-width="2"
        />
        <path
          d="M129.957 23.125L104.593 48.4883C104.355 48.2545 104.114 48.0238 103.871 47.7959L129.25 22.418L129.957 23.125Z"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/styles/talents/fujikura-uruka.scss' as s;

.container {
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  align-content: stretch;
}

.container > * {
  grid-row: 1;
}

.border--event {
  grid-column: 2/19;
  stroke-dasharray: 240 7;
  stroke-dashoffset: -78.75;
}

.border--event.dayoff {
  fill: url(#gradFill);
}

.day,
.border--day {
  grid-column: 1/4;
  align-self: center;
  justify-self: center;
}

.day {
  text-align: center;
}

.date {
  color: hsl(s.$yellow);
  letter-spacing: 0.1em;
  @include f.responsive-type(s.$font-7-bold, s.$font-4, s.$font-4);
}

.cap-color {
  color: hsl(s.$white);
  @include f.responsive-type(s.$font-8-bold, s.$font-5-bold, s.$font-5-bold);
}

.cap-color::first-letter {
  color: hsl(s.$yellow);
}

.container__fan-logo {
  display: none;
}

.container.large .container__fan-logo {
  --deco: 0.38fr;

  grid-column: 12/14;

  height: 100%;

  display: grid;
  grid-template-columns: var(--deco) 1fr var(--deco);
  grid-template-rows: 1fr 1fr;
  align-items: center;
  align-content: center;

  padding: 5%;
}

.container.dayoff .container__fan-logo {
  display: none;
}

.logo {
  grid-column: 2;
  grid-row: 1/3;
}

.logo-deco-1 {
  grid-column: 1;
  grid-row: 1;

  height: 100%;
}

.logo-deco-1 path {
  fill: hsl(s.$blue);
}

.logo-deco-2 {
  grid-column: 1;
  grid-row: 2;

  height: 30%;
}

.logo-deco-2 path {
  stroke: hsl(s.$white);
  fill: hsl(s.$white);
}

.logo-deco-3 {
  grid-column: 3;
  grid-row: 1;

  height: 30%;
}

.logo-deco-3 path {
  stroke: hsl(s.$white);
  fill: hsl(s.$white);
}

.logo-deco-4 {
  grid-column: 3;
  grid-row: 2;

  height: 100%;
  rotate: 20deg;
}

.logo-deco-4 path {
  fill: hsl(s.$yellow);
}

.container__title {
  grid-column: 4/15;
  color: hsl(s.$yellow);

  display: grid;
  grid-template-columns: 5% auto;
  justify-content: stretch;
  align-items: center;
}

.container.large .container__title {
  grid-column: 4/12;
}

.container.dayoff .container__title {
  grid-column: 6/-1;
}

.container.dayoff .container__title p {
  letter-spacing: f.em(16);
}

.container.dayoff .container__title svg {
  display: none;
}

.container__title svg {
  grid-column: 1;
  fill: hsl(s.$grey-blue);
}

.container__title p {
  grid-column: 2;
  @include f.responsive-type(s.$font-7-bold, s.$font-5-bold, s.$font-5-bold);
  letter-spacing: f.em(2);
}

.time {
  grid-column: 15/19;

  @include f.responsive-type(s.$font-7-bold, s.$font-5-bold, s.$font-5-bold);
  color: hsl(s.$white);
  align-self: center;
  justify-self: center;
}

.container.large .time {
  grid-column: 15/17;
}

.container.dayoff .time {
  display: none;
}

.border-deco {
  grid-column: 16;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: min-content;
  align-items: center;
  justify-content: space-around;
  justify-items: center;

  translate: 0 -5%;
}

.border-deco-1 {
  fill: hsl(s.$grey-blue);
}

.border-deco-2 {
  fill: hsl(s.$yellow);
  height: 30%;
}

.border-deco-3 {
  fill: hsl(s.$blue);
  height: 30%;
}

.end {
  display: none;
}

.container.large .end {
  grid-column: 17/19;

  height: 100%;

  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  align-content: center;

  padding: 5%;
  padding-right: 25%;
}

.container.dayoff .end {
  display: none;
}

.end-1 {
  grid-column: 1;
  grid-row: 2;
  align-self: center;
  justify-self: end;
}

.end-1 path {
  fill: hsl(0, 0%, 100%);
}

.end-2 {
  grid-column: 2;
  grid-row: 2/4;
  align-self: center;
  justify-self: center;
}

.end-2 path {
  fill: hsl(s.$yellow);
  stroke: hsl(s.$yellow);
}
</style>
