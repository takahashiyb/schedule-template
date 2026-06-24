<script setup lang="ts">
import { ref, toRefs } from 'vue'
import type { Talent } from '@/types/talent-data-supabase'

const props = defineProps<{ talents: Talent[]; current?: string }>()

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
      <option v-for="talent in talents" :key="talent.id" :value="talent.id">
        {{ talent.name }}
      </option>
    </select>
  </div>
</template>
