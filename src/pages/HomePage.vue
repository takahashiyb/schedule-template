<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <div>
    <li
      v-for="path in router.getRoutes().find((path) => path.name === 'template')?.children"
      :key="path.name"
    >
      <RouterLink :to="{ path: path.path }"
        >{{ path.name?.toString().toLocaleUpperCase().replaceAll('-', ' ') }}
      </RouterLink>
    </li>
  </div>
</template>
<style scoped lang="scss"></style>
