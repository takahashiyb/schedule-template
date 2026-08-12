<script setup lang="ts"></script>
<template>
  <div class="days empty">
    <p>Select a talent</p>
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
@use '/src/assets/styles/talents/pipkin-pippa.scss' as s;

.days.empty {
  justify-self: end;

  display: grid;
  align-items: center;
  align-content: start;

  padding-right: 16px;
  color: hsl(s.$hot-pink);
}
</style>
