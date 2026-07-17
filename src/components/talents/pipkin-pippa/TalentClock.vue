<script setup lang="ts">
import type { Talent } from '@/types/talent-data-supabase'
import { shallowRef } from 'vue'
import { useDateFormat, useNow } from '@vueuse/core'
import { pickTextColor } from '@/utils/color'

const props = defineProps<{ talentData: Talent }>()

// #region Time and its Formats
const now = useNow()

const timeFormat = shallowRef('HH:mm:ss')
const dateFormat = shallowRef('MM-DD')
const dayFormat = shallowRef('dddd')

const lang = shallowRef('en-US')
const time = useDateFormat(now, timeFormat, { locales: lang })
const date = useDateFormat(now, dateFormat, { locales: lang })
const day = useDateFormat(now, dayFormat, { locales: lang })
// #endregion
</script>
<template>
  <div
    class="container__details"
    :style="[
      { '--bg-color': props.talentData?.color2 },
      { '--border-color': props.talentData?.color1 },
      {
        '--text-color': pickTextColor(
          props.talentData?.color1 ? props.talentData?.color1 : '0, 0%, 0%',
        ),
      },
    ]"
  >
    <span class="talent-detail">{{ props.talentData?.name }}</span>
    <span class="talent-detail">{{ props.talentData?.genName }}</span>
    <div class="container__now">
      <span class="now day">{{ day }}</span>
      <span class="now time">{{ time }}</span>
      <span
        class="now date"
        :style="props.talentData?.color1 ? `--color: ${props.talentData?.color1}` : ''"
        >{{ date }}</span
      >
    </div>
    <img class="bunny-blue" src="/public/assets/icons/pipkin-pippa/Bunny Blue.png" alt="" />
  </div>
</template>
<style scoped lang="scss">
@use '/src/assets/styles/talents/pipkin-pippa.scss' as s;

.container__details {
  grid-column: 1;
  grid-row: 2;
  align-self: end;
  justify-self: end;

  display: grid;
  align-items: end;
  justify-items: center;
  text-align: center;
  gap: 4px;
  z-index: 2;

  padding-bottom: 8px;
  padding-right: 16px;
}

.page.large .container__details {
  --text-color: 0, 0%, 100%;
  align-self: end;
  align-items: start;
  justify-self: start;
  justify-items: center;
  text-align: center;
  gap: 4px;

  padding-bottom: 24px;
  padding-left: 24px;
}

.container__details > * {
  grid-column: 1;
}

.container__details .talent-detail {
  background-color: hsl(s.$violet);
  color: hsl(s.$white);
  border: 4px hsl(s.$white) solid;
  border-radius: 9em;
  padding-inline: 12px;

  z-index: 1;

  align-self: center;
}

.container__details .talent-detail:nth-child(1) {
  grid-row: 4;
}

.container__details .talent-detail:nth-child(2) {
  grid-row: 5;
}

.page.large .container__details .talent-detail {
  padding-right: 48px;
  padding-left: 48px;
}

.container__now {
  display: grid;
  gap: 4px;

  grid-column: 1;
  grid-row: 6;

  z-index: 1;
}

.container__details .now {
  display: none;
  color: hsl(s.$hot-pink);
  padding-inline: 24px;
}

.page.medium .container__details .now {
  display: inline-block;
}

.page .container__details .date {
  --color: 0, 0%, 100%;

  background-color: hsl(s.$hot-pink);
  color: hsl(s.$white);
  border: 4px hsl(s.$white) solid;
  border-radius: 9em;
}

.page.large .container__details .date {
  font-size: 32px;
}

.bunny-blue {
  grid-column: 1;
  grid-row: 1/7;
  z-index: 0;

  display: none;
}

.page.medium .bunny-blue {
  display: inline-block;
  max-height: 250px;
}

.page.large .bunny-blue {
  max-height: 300px;
}
</style>
