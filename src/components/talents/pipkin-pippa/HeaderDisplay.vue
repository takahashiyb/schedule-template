<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  logo: Component
}>()

const emit = defineEmits(['openSidebar'])

function openSidebar() {
  emit('openSidebar')
}
</script>
<template>
  <header>
    <component class="logo" :is="props.logo"></component>
    <h1>Schedule</h1>
    <button class="side-button" @click="openSidebar">|||</button>
  </header>
</template>
<style scoped lang="scss">
@use '/src/assets/styles/talents/pipkin-pippa.scss' as s;

header {
  align-self: center;

  display: flex;
  justify-content: end;
  align-items: center;

  border: 4px solid hsl(s.$hot-pink);
  background-color: hsl(s.$white);
  color: hsl(s.$hot-pink);
  border-radius: 9em 0 0 9em;

  margin-left: 16px;
}

.page.medium header {
  border-radius: 9em;
  margin-inline: 16px;
  padding-inline: 32px;
}

.page.large header {
  order: 3;
  grid-column: 3/6;
  grid-row: 1;
}

h1 {
  font-size: 1.5rem;
}

.page.large h1 {
  font-size: 2.5rem;
}

header .logo {
  display: none;
  max-height: 2rem;

  object-fit: contain;
  margin-right: auto;
}

.page.medium header .logo {
  display: inline-block;
  max-height: 3rem;
}

.side-button {
  background-color: hsl(s.$hot-pink);
  height: 40px;
  width: 40px;
  border: none;
  color: hsl(s.$white);
  font-size: 2rem;

  margin-left: 10px;

  cursor: pointer;
}
</style>
