<script setup lang="ts">
import { useAnimate } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const scroll1 = useTemplateRef('scroll-text-1')
const scroll2 = useTemplateRef('scroll-text-2')
const scroll3 = useTemplateRef('scroll-text-3')

const scrollIndicatorAnimation = [
  { transform: 'translateY(-50%)', opacity: 0 },
  { transform: 'translateY(0%)', opacity: 1 },
  { transform: 'translateY(0%)', opacity: 0 },
  { transform: 'translateY(-50%)', opacity: 0 },
]

const {} = useAnimate(scroll1, scrollIndicatorAnimation, {
  duration: 1200,
  iterations: Infinity,
})
const {} = useAnimate(scroll2, scrollIndicatorAnimation, {
  duration: 1200,
  iterations: Infinity,
  delay: 80,
})
const {} = useAnimate(scroll3, scrollIndicatorAnimation, {
  duration: 1200,
  iterations: Infinity,
  delay: 240,
})
</script>

<template>
  <span ref="scroll-text-1">V</span>
  <span ref="scroll-text-2">V</span>
  <span ref="scroll-text-3">V</span>
</template>
