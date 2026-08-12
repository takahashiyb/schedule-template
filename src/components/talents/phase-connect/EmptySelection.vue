<script setup lang="ts"></script>
<template>
  <div class="days empty">
    <p>Select a talent</p>
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.days.empty {
  justify-self: end;

  display: grid;
  align-items: center;
  align-content: start;

  padding-right: 16px;
  color: white;
}
</style>
