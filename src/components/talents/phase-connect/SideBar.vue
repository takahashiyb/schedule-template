<script setup lang="ts">
import type { Component } from 'vue'
import type { Talent } from '@/types/talent-data-supabase'

import { toRefs } from 'vue'

type Theme = 'phase-connect' | 'pipkin-pippa'

const props = defineProps<{
  isSidebarOpen: boolean
  background: string
  logo: Component
  talents: Talent[]
  talent?: string
  customTheme: boolean
  fixedTheme: boolean
  theme: Theme
  timezone: string
  timezoneDisplay: string
}>()

const emit = defineEmits(['closeSidebar'])

function closeSidebar() {
  emit('closeSidebar')
}

const { isSidebarOpen, background, logo } = toRefs(props)
</script>
<template>
  <div
    class="sidebar"
    :class="{ open: isSidebarOpen }"
    :style="[`background-color: ${background}`]"
  >
    <button class="close-button" @click="closeSidebar">X</button>

    <Component :is="logo" />

    <p>Select a talent</p>
    <slot name="dropdown"></slot>

    <label> <slot name="specialTheme"></slot>use special themes </label>

    <label v-if="customTheme"> <slot name="customTheme"> </slot>use fixed themes </label>

    <slot name="fixedTheme"></slot>

    <div></div>

    <slot name="timezone"></slot>
  </div>
</template>

<style scoped lang="scss">
@use '/src/assets/styles/talents/phase-connect.scss' as s;

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;

  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 3;

  height: 100%;
  width: 250px;
  background-color: hsl(0, 0%, 4%);
  color: white;

  transform: translateX(100%);

  transition: 300ms transform;

  padding: 20px;

  box-shadow:
    4px 0 0 white inset,
    6px 0 0 hsl(206, 8%, 17%) inset,
    10px 0 0 white inset,
    12px 0 0 hsl(206, 8%, 17%) inset,
    16px 0 0 white inset;
}

.page.medium .sidebar {
  width: 400px;

  padding-inline: 56px;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar .close-button {
  align-self: end;
  background-color: white;
  height: 40px;
  width: 40px;

  border: none;
  color: black;
  font-weight: 900;

  cursor: pointer;
}

.sidebar select:hover,
.sidebar option:hover {
  cursor: pointer;
}

.sidebar :nth-last-child(2) {
  flex: 1;
}

.sidebar label {
  color: hsl(var(--text-color));
}

.sidebar .timezone {
  --text-color: (0, 0%, 100%) align-self: end;
  color: hsl(var(--text-color));
}

.sidebar-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-color: black;
  opacity: 0.5;

  display: none;
}

.sidebar-overlay.open {
  display: inline-block;
}
</style>
