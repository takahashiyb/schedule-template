<script setup lang="ts">
import { ref, toRefs } from 'vue'
import type { Talent } from '@/types/talent-data-supabase'

const props = defineProps<{ talents: Talent[]; current?: string; background?: string }>()

const { talents } = toRefs(props)

const emit = defineEmits(['update:current', 'closeSidebar'])

const talent = ref<string>()

function update() {
  emit('update:current', talent.value)
  emit('closeSidebar')
}

function getGens() {
  return [
    ...new Map(
      talents.value.map((item) => [item.gen, { id: item.gen, name: item.genName }]),
    ).values(),
  ]
}
</script>

<template>
  <div>
    <select v-model="talent" @change="update">
      <optgroup v-for="gen in getGens()" :label="gen.name" :key="`optionGen-${gen.id}`">
        <option
          v-for="talent in talents.filter((items) => items.gen === gen.id)"
          :key="talent.id"
          :value="talent.id"
        >
          {{ talent.name }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<style scoped lang="scss">
optgroup {
  text-transform: uppercase;
}

div p {
  --text-color: (0, 0%, 100%);
  color: hsl(var(--text-color));
}
</style>
