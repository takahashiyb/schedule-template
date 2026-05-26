<script setup lang="ts"></script>
<template>
  <div class="banner">
    <div class="head"></div>
    <div class="content">
      <p>
        <slot></slot>
      </p>
    </div>
    <div class="tail"></div>
    <div class="fold"></div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/styles/talents/marimari-en.scss' as s;

.banner {
  --fold-width: 10%;
  --fold-color: hsl(#{s.$dark-gold});
  --stripe-padding: 4px;
  --background-color: hsl(#{s.$gold});
  --stripe-color: hsl(#{s.$yellow});
  --font-color: hsl(#{s.$dark-blue});

  display: grid;
  grid-template-columns: var(--fold-width) 1fr var(--fold-width);
  grid-template-rows: repeat(1, 1fr) fit-content;
  column-gap: -1px;

  @include f.responsive-type(s.$font-7, s.$font-6, s.$font-4);
  color: (var(--font-color));
}

.yellow {
  --background-color: hsl(#{s.$gold});
  --fold-color: hsl(#{s.$dark-gold});
}

.blue {
  --background-color: hsl(#{s.$light-blue});
  --fold-color: hsl(#{s.$blue});
}

.banner > * {
  height: 100%;
}

.content {
  background-color: var(--background-color);
  text-align: center;

  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  align-items: center;

  grid-column: 2;
  grid-row: 1;

  box-shadow:
    0 var(--stripe-padding) 0 inset var(--stripe-color),
    0 calc(0px - var(--stripe-padding)) 0 inset var(--stripe-color);

  padding-top: var(--stripe-padding);
  padding-bottom: var(--stripe-padding);
  padding-inline: 4px;
}

.tail {
  grid-column: 3;
  grid-row: 1;

  clip-path: polygon(0 0, 100% 0, 0 50%, 100% 100%, 0 100%, 0 0);
  background-color: var(--background-color);

  box-shadow:
    0 var(--stripe-padding) 0 inset var(--stripe-color),
    0 calc(0px - var(--stripe-padding)) 0 inset var(--stripe-color);
}

.head {
  grid-column: 1;
  grid-row: 1;
  background-color: var(--background-color);

  box-shadow:
    6px 0 4px -2px inset var(--fold-color),
    0 var(--stripe-padding) 0 inset var(--stripe-color),
    0 calc(0px - var(--stripe-padding)) 0 inset var(--stripe-color);
}

.fold {
  grid-column: 1;
  grid-row: 2;

  background-color: var(--fold-color);

  border-bottom-left-radius: 50%;
}

.right .content {
  margin-right: -1px;
  text-align: end;
}

.left .content {
  margin-left: -1px;
  text-align: start;
}

.right .head {
  grid-column: 3;
  transform: rotateY(180deg);
}

.right .tail {
  grid-column: 1;
  transform: rotateY(180deg);
  margin-right: -1px;
}

.left .tail {
  margin-left: -1px;
}

.center .content {
  text-align: center;
}

.right .fold {
  transform: rotateY(180deg);
  grid-column: 3;
}
</style>
