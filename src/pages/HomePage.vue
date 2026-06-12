<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <h1>Something Something Resources</h1>
  <div>
    <h2>Schedules by channels:</h2>
    <nav>
      <ul>
        <li
          class="list"
          v-for="path in router.getRoutes().find((path) => path.name === 'template')?.children"
          :key="path.name"
        >
          <RouterLink :to="{ path: path.path }"
            >{{ path.name?.toString().replaceAll('-', ' ') }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
  <div>
    <h2>Graphics</h2>
    <h3>Inconspicuous Series</h3>
    <nav>
      <ul>
        <li
          class="list"
          v-for="path in router
            .getRoutes()
            .find((r) => r.name === 'graphics')
            ?.children.filter(
              (child) => (child.props as { group?: string })?.group === 'inconspicuous',
            )"
          :key="path.name"
        >
          <RouterLink :to="{ path: path.path }"
            >{{ (path.props as { talent?: string }).talent?.replaceAll('-', ' ') }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
  <div>
    <h2>Tools:</h2>
    <nav>
      <ul>
        <li class="list">
          <RouterLink :to="{ name: 'channel-search' }">Channel Search</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style scoped lang="scss">
.list {
  text-transform: capitalize;
}
</style>
