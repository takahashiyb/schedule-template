<script setup lang="ts"></script>

<template>
  <div class="rest">
    <img class="ribbon" src="/assets/icons/pipkin-pippa/Ribbon Collection1.svg" alt="" />
    <img class="bunny" src="/assets/icons/pipkin-pippa/bunny logo.png" alt="" />
    <p>
      <slot> </slot>
    </p>
    <img class="bunny" src="/assets/icons/pipkin-pippa/bunny logo.png" alt="" />
    <img class="ribbon" src="/assets/icons/pipkin-pippa/Ribbon Collection1.svg" alt="" />
  </div>
</template>
<style scoped lang="scss">
@use '/src/assets/styles/talents/pipkin-pippa.scss' as s;

.rest {
  --border-color: hsl(#{s.$hot-pink});

  grid-column: 2/4;
  grid-row: 1;
  justify-self: stretch;

  background-color: hsl(s.$white);

  border: 4px var(--border-color) solid;

  border-radius: 1em;

  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(16, 1fr);
}

p {
  grid-column: 2/16;
  color: hsl(s.$hot-pink);
  min-height: 100%;
  text-align: center;

  padding-inline: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.days.medium .rest p {
  grid-column: 4/14;
}

.days.medium .rest {
  border-radius: 9em;
}

.bunny {
  display: none;
  max-height: 3rem;
  scale: 1.5;
}

.days.medium .bunny {
  display: inline-block;
}

.bunny:nth-child(1) {
  grid-column: 3;
}

.ribbon {
  display: none;
  max-height: 2rem;
}

.days.medium .ribbon {
  display: inline-block;
}

.ribbon:nth-child(1) {
  grid-column: 2;
}
</style>
