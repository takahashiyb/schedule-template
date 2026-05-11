<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div>
    <li
      v-for="path in route.matched[0]?.children.filter((item) => item.name !== 'template')"
      :key="path.name"
    >
      <RouterLink :to="{ name: path.name }">{{
        path.name?.toString().toLocaleUpperCase().replaceAll('-', ' ')
      }}</RouterLink>
    </li>
  </div>
</template>
<style scoped lang="scss"></style>
