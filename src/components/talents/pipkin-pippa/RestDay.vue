<script setup lang="ts"></script>

<template>
  <div class="rest">
    <p>
      <slot> </slot>
    </p>
  </div>
</template>
<style scoped lang="scss">
@use '/src/assets/styles/talents/pipkin-pippa.scss' as s;

.rest {
  grid-column: 2/4;
  grid-row: 1;
  justify-self: stretch;

  display: grid;
  grid-template-columns: repeat(16, 1fr);
}

p {
  grid-column: 2/17;

  --border-color: hsl(#{s.$hot-pink});

  background-color: hsl(s.$white);
  color: hsl(s.$hot-pink);
  min-height: 100%;
  text-align: center;

  padding-inline: 12px;
  padding-top: 8px;
  padding-bottom: 8px;

  border: 4px var(--border-color) solid;

  border-radius: 1em;
}

.days.medium .rest p {
  border-radius: 9em;
}
</style>
