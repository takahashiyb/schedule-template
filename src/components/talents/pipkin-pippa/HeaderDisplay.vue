<script setup lang="ts">
const emit = defineEmits(['openSidebar'])

function openSidebar() {
  emit('openSidebar')
}
</script>
<template>
  <header>
    <img src="/public/assets/icons/pipkin-pippa/logo/png/logo.png" alt="" />
    <h1>Schedule</h1>
    <button class="side-button" @click="openSidebar">|||</button>
  </header>
</template>
<style scoped lang="scss">
@use '/src/assets/styles/talents/pipkin-pippa.scss' as s;

header {
  align-self: center;

  display: flex;
  align-items: center;

  border: 4px solid hsl(s.$hot-pink);
  background-color: hsl(s.$white);
  color: hsl(s.$hot-pink);
  border-radius: 9em;

  margin-right: 16px;

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

.page.medium h1 {
  font-size: 3rem;
}

header img {
  max-height: 2rem;

  object-fit: contain;
  margin-right: auto;
}

.page.medium header img {
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
