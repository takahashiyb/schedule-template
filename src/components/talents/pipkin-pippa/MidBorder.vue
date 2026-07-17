<script setup lang="ts"></script>

<template>
  <div class="border" style="clip-path: url(#curved)">
    <div></div>
  </div>
</template>

<style scoped lang="scss">
.border {
  --skew: 35deg;
  --border: 0, 0%, 100%;

  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: repeat(3, 1fr);

  grid-column: 1;
  grid-row: 3/6;

  z-index: -1;
}

.page.large .border {
  grid-column: 2/6;
  grid-row: 2/3;
}

.border div:nth-child(1) {
  background: url('/assets/icons/pipkin-pippa/inconspicuous/png/horizontal.png');
  background-size: cover;
  background-position: center;

  grid-column: 1/5;
  grid-row: 1/4;
}

.page.large .border div:nth-child(1) {
  background: url('/assets/icons/pipkin-pippa/inconspicuous-border/png/horizontal.png');
  background-size: cover;
  background-position: left top;
}
</style>
