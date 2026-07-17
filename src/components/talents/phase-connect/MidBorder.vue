<script setup lang="ts"></script>

<template>
  <div class="border">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped lang="scss">
.border {
  --skew: 35deg;
  --border: 0, 0%, 100%;

  display: none;

  grid-column: 2/5;
  grid-row: 2/3;

  z-index: -1;
  opacity: 0;
}

.page.large .border {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);

  opacity: 1;
}

.border div {
  width: 70%;
  background-color: hsl(206, 8%, 15%);
  border-style: solid;
  border-color: hsl(var(--border));
}

.border div:nth-child(1) {
  grid-column: 2;
  grid-row: 1;

  transform: skewX(var(--skew));
  transform-origin: top left; /* pivot point */

  border-width: 4px 4px 0 4px;
}

.border div:nth-child(2) {
  grid-column: 2;
  grid-row: 2;

  transform: skewX(calc(var(--skew) * -1));
  transform-origin: bottom left; /* pivot point */

  border-width: 0 4px 4px 4px;
}

.border div:nth-child(3) {
  grid-column: 1;
  grid-row: 3;
  justify-self: end;
  transform: skewX(calc(var(--skew) * -1));

  transform-origin: top right; /* pivot point */

  border-width: 4px 4px 4px 4px;
}
</style>
