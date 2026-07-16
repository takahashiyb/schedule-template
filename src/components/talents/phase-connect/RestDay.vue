<script setup lang="ts"></script>

<template>
  <p class="rest">
    <slot> </slot>
  </p>
</template>
<style scoped lang="scss">
.rest,
.return {
  grid-column: 2/4;
  text-align: center;

  width: 100%;
  background-color: hsl(206, 8%, 17%);
  color: hsl(206, 8%, 100%);

  padding-inline: var(--extra-bevel);
  padding-top: 8px;
  padding-bottom: 8px;

  border-bottom-left-radius: var(--extra-bevel);
  border-top-right-radius: var(--extra-bevel);
  corner-shape: bevel;

  border: hsla(var(--talent-color-2), 0.6) 2px solid;

  box-shadow: 0 0px 12px 8px hsla(var(--talent-color-1), 0.4);
}
</style>
