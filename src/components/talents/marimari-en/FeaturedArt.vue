<script setup lang="ts">
import { getMonthShortDate } from '@/utils/dates.ts'
import BannerTextbox from './BannerTextbox.vue'
import KrakenPearl from './KrakenPearl.vue'

interface Image {
  image: string
  artist: string
}

interface Schedule {
  time: string
  timezone: string
}

const props = defineProps<{
  image: Image
  first: Schedule
  last?: Schedule
  designer: string
}>()
</script>
<template>
  <div class="container__featured">
    <div class="featured">
      <img :src="props.image.image" />
    </div>
    <KrakenPearl class="border left first" />
    <KrakenPearl class="border left second" />
    <KrakenPearl class="border right first" />
    <KrakenPearl class="border right second" />
    <BannerTextbox class="left blue banner banner--first"
      >{{ getMonthShortDate(props.first.time, props.first.timezone).toUpperCase()
      }}{{
        props.last!.time !== undefined
          ? ` - ${getMonthShortDate(props.last!.time, props.last!.timezone).toUpperCase()}`
          : ''
      }}</BannerTextbox
    >
    <BannerTextbox class="right blue banner banner--first">Art Tag: #MariArti</BannerTextbox>
    <BannerTextbox class="left banner banner--second">MariMari_EN</BannerTextbox>
    <BannerTextbox class="right banner banner--second">Design: {{ designer }} </BannerTextbox>
    <div class="text-shadow"></div>
    <img class="gate-top" src="@/assets/icons/marimari-en/gate-top.svg" alt="" />
    <img class="gate-bottom" src="@/assets/icons/marimari-en/gate-bottom.svg" alt="" />
    <img class="emblem border left" src="@/assets/icons/marimari-en/emblem.svg" alt="" />
    <img class="emblem border right" src="@/assets/icons/marimari-en/emblem.svg" alt="" />
    <div class="artist">
      <p>Artist:</p>
      <p>@{{ props.image.artist }}</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/styles/talents/marimari-en.scss' as s;

.container__featured {
  display: grid;
  grid-template-columns: 33% 34% 33%;
  grid-template-rows: 10fr repeat(4, 1fr);
  row-gap: 1%;
  position: relative;

  max-width: 400px;
}

.featured {
  --background-color: hsl(#{s.$white});

  background-color: var(--background-color);

  height: 100%;
  width: 100%;

  border-top-left-radius: 70px;
  border-top-right-radius: 70px;

  overflow: hidden;

  grid-column: 1/-1;
  grid-row: 1/-1;
}

.large .featured {
  border-top-left-radius: 150px;
  border-top-right-radius: 150px;
}

.featured img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: top;
}

.banner {
  z-index: 1;
}

.banner--first {
  grid-row: 3;
}

.banner--second {
  grid-row: 4;
}

.left {
  grid-column: 1;
  translate: calc(0px - var(--fold-width)) 0;
}

.right {
  grid-column: 3;
  translate: calc(var(--fold-width)) 0;
}

.text-shadow {
  --black: hsl(#{s.$black});
  --background-color: hsl(#{s.$light-blue});

  background-color: var(--background-color);

  grid-row: 2/6;
  grid-column: 2;
  border-radius: 50%;
  height: 100%;
  aspect-ratio: 1/1;
  align-self: center;
  justify-self: center;

  mask-image: radial-gradient(black, black 25%, transparent 70%);

  -webkit-mask-image: radial-gradient(black, black 15%, transparent 70%);

  z-index: 0;
}

.gate-top {
  grid-row: 2/4;
  grid-column: 2;
  align-self: center;
  z-index: 1;
}

.gate-bottom {
  grid-row: 5;
  grid-column: 2;
  align-self: start;
  justify-self: center;

  width: 70%;
  z-index: 1;
}

.border {
  /* just to reset the space it occupies in the grid */
  grid-column: 1/-1;
  grid-row: 1/-1;
}

.artist {
  grid-column: 2;
  grid-row: 3/5;

  align-self: center;
  text-align: center;

  letter-spacing: 0.15em;

  --font-color: hsl(#{s.$white});

  color: var(--font-color);
  z-index: 1;
}

.artist :first-child {
  @include f.responsive-type(s.$font-7, s.$font-4, s.$font-4);
}

.artist :nth-child(2) {
  @include f.responsive-type(s.$font-6, s.$font-4, s.$font-4);
}

.emblem {
  bottom: 0;
  position: absolute;
  height: 33px;
}

.emblem.right {
  right: 0;
  translate: 50% 50%;
}

.emblem.left {
  left: 0;
  translate: -50% 50%;
}
</style>
