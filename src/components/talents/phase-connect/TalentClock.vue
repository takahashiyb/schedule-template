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
          props.talentData?.color2 ? props.talentData?.color2 : '0, 0%, 0%',
        ),
      },
    ]"
  >
    <span class="talent-detail">{{ props.talentData?.name }}</span>
    <span class="talent-detail">{{ props.talentData?.genName }}</span>
    <div style="display: grid">
      <span
        class="now date"
        :style="props.talentData?.color1 ? `--color: ${props.talentData?.color1}` : ''"
        >{{ date }}</span
      >
      <span class="now day">{{ day }}</span>
      <span class="now time">{{ time }}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container__details {
  grid-column: 1;
  grid-row: 2;
  align-self: end;
  justify-self: end;

  display: grid;
  align-items: start;
  text-align: end;
  gap: 8px;
  z-index: 2;

  padding-bottom: 0px;
}

.page.large .container__details {
  --text-color: 0, 0%, 100%;
  align-self: end;
  justify-self: start;
  text-align: start;
  gap: 24px;

  padding-bottom: 48px;
}

.container__details .talent-detail {
  color: hsl(var(--text-color));
  background-color: hsl(var(--bg-color));

  corner-shape: bevel;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 0;
  padding-right: 24px;
  padding-left: 48px;
}

.page.large .container__details .talent-detail {
  background-color: hsl(var(--bg-color));

  corner-shape: bevel;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 0;
  padding-left: 24px;
  padding-right: 48px;
}

.container__details .now {
  display: none;
  color: white;
  padding-inline: 24px;
}

.page.medium .container__details .now {
  display: inline-block;
}

.page .container__details .date {
  --color: 0, 0%, 100%;

  color: hsl(var(--color));
}

.page.medium .container__details .date {
  font-size: 32px;
}

.page.large .container__details .date {
  font-size: 48px;
}
</style>
