<script setup lang="ts"></script>
<template>
  <div class="decoration">
    <img class="kraken" src="/src/assets/icons//marimari-en/decoration-kraken.svg" alt="" />
    <img class="pearl" src="/src/assets/icons//marimari-en/decoration-pearl.svg" alt="" />
  </div>
</template>
<style scoped lang="scss">
.decoration > * {
  position: absolute;
}

.decoration.left > * {
  --top-left: 50%;

  left: 0;
}

.decoration.left.first > * {
  top: var(--top-left);
}

.decoration.left.second > * {
  top: calc(var(--top-left) + 15%);
}

.left .kraken {
  translate: -100% -50%;
}

.left .pearl {
  translate: -50% -50%;
}

.decoration.right > * {
  --top-right: 25%;

  right: 0;
}

.decoration.right.first > * {
  top: var(--top-right);
}

.decoration.right.second > * {
  top: calc(var(--top-right) + 15%);
}

.right .kraken {
  translate: 100% -50%;
  transform: rotateY(180deg);
}

.right .pearl {
  translate: 50% -50%;
}

.kraken {
  height: 12%;
}

.pearl {
  height: 4%;
  width: 4%;
}
</style>
