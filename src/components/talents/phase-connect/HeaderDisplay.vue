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
header {
  align-self: center;

  color: white;

  display: flex;
  align-items: center;
  justify-content: end;

  padding-inline: 16px;
}

.page.large header {
  order: 3;
  grid-column: 3/6;
  grid-row: 1;
}

h1 {
  font-size: 1.5rem;
}

.page.medium h1 {
  font-size: 3rem;
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
  background-color: white;
  height: 40px;
  width: 40px;
  border: none;
  color: black;
  font-size: 2rem;

  margin-left: 10px;

  cursor: pointer;
}
</style>
