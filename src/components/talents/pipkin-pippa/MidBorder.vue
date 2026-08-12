<script setup lang="ts"></script>

<template>
  <div class="border" style="clip-path: url(#curved)">
    <img class="small" src="/assets/icons/pipkin-pippa/inconspicuous/png/horizontal.png" alt="" />
    <img
      class="large"
      src="/assets/icons/pipkin-pippa/inconspicuous-border/png/horizontal.png"
      alt=""
    />
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

.border img {
  object-fit: cover;
  object-position: center;
  min-height: 100%;

  grid-column: 1/5;
  grid-row: 1/4;
}

.page.large .border img {
  object-fit: cover;
  object-position: left;
  min-height: none;
  min-width: 100%;
}

.page .border img.small {
  display: inline-block;
}

.page .border img.large {
  display: none;
}

.page.large .border img.small {
  display: none;
}

.page.large .border img.large {
  display: inline-block;
}
</style>
