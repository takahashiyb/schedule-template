<script setup lang="ts">
import { ref, toRefs } from 'vue'

const props = defineProps<{ talents: string[]; current?: string }>()

const { talents } = toRefs(props)

const emit = defineEmits(['update:current', 'closeSidebar'])

const talent = ref<string>()

function update() {
  emit('update:current', talent.value)
  emit('closeSidebar')
}
</script>

<template>
  <div>
    <p>Select a talent</p>
    <select v-model="talent" @change="update">
      <option v-for="talent in talents" :key="talent" :value="talent">
        {{ talent }}
      </option>
    </select>
  </div>
</template>
