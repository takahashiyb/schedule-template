<script setup lang="ts">
import { useSlots, Comment, Fragment } from 'vue'
import type { VNode } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  type?: 'spiral' | 'cascade' | 'spiralcut' | 'spiralslash'
  direction?: 'clockwise' | 'counterclockwise' | 'c' | 'cc'
  start?: 'top' | 'right' | 'bottom' | 'left'
}>()

const slots = useSlots()
const children = (slots.default?.() ?? []) as VNode[]

// Flatten fragments and filter out comments
const elementChildren = children
  .flatMap((vnode) => (vnode.type === Fragment ? (vnode.children as VNode[]) : [vnode]))
  .filter((vnode) => vnode.type !== Comment)

const gridSize = 16

const placements = computed(() => {
  if (props.type === 'spiral') {
    const result: { gridColumn: string; gridRow: string }[] = []
    let x = 1,
      y = 1,
      w = gridSize,
      h = gridSize

    // map start to initial direction index
    const startMap: Record<string, number> = { top: 0, right: 1, bottom: 2, left: 3 }
    let direction = startMap[props.start ?? 'top']
    for (let i = 0; i < elementChildren.length; i++) {
      if (i === elementChildren.length - 1) {
        // ✅ Last child: take the whole remaining area
        result.push({
          gridColumn: `${x} / span ${w}`,
          gridRow: `${y} / span ${h}`,
        })
        break
      }

      // normal spiral subdivision
      const halfW = Math.floor(w / 2)
      const halfH = Math.floor(h / 2)

      if (direction === 0) {
        // top
        result.push({ gridColumn: `${x} / span ${w}`, gridRow: `${y} / span ${halfH}` })
        y += halfH
        h = halfH
      } else if (direction === 1) {
        // right
        result.push({ gridColumn: `${x + halfW} / span ${halfW}`, gridRow: `${y} / span ${h}` })
        w = halfW
      } else if (direction === 2) {
        // bottom
        result.push({ gridColumn: `${x} / span ${w}`, gridRow: `${y + halfH} / span ${halfH}` })
        h = halfH
      } else if (direction === 3) {
        // left
        result.push({ gridColumn: `${x} / span ${halfW}`, gridRow: `${y} / span ${h}` })
        x += halfW
        w = halfW
      }

      // cycle direction
      if (props.direction === 'counterclockwise' || props.direction === 'cc') {
        direction = (direction! + 3) % 4
      } else {
        direction = (direction! + 1) % 4
      }
    }

    return result
  }

  if (props.type === 'spiralcut') {
    const result: { gridColumn: string; gridRow: string; borderRadius?: string }[] = []
    let x = 1,
      y = 1,
      w = gridSize,
      h = gridSize

    const startMap: Record<string, number> = { top: 0, right: 1, bottom: 2, left: 3 }
    let direction = startMap[props.start ?? 'top']

    for (let i = 0; i < elementChildren.length; i++) {
      if (i === elementChildren.length - 1) {
        result.push({
          gridColumn: `${x} / span ${w}`,
          gridRow: `${y} / span ${h}`,
        })
        break
      }

      const halfW = Math.floor(w / 2)
      const halfH = Math.floor(h / 2)

      // choose border radius based on direction + spiral rotation
      let borderRadius = ''
      if (props.direction === 'counterclockwise' || props.direction === 'cc') {
        if (direction === 0) borderRadius = '50% 0 0 0' // top
        if (direction === 1) borderRadius = '0 50% 0 0' // right
        if (direction === 2) borderRadius = '0 0 50% 0' // bottom
        if (direction === 3) borderRadius = '0 0 0 50%' // left
      } else {
        if (direction === 0) borderRadius = '0 50% 0 0' // top
        if (direction === 1) borderRadius = '0 0 50% 0' // right
        if (direction === 2) borderRadius = '0 0 0 50%' // bottom
        if (direction === 3) borderRadius = '50% 0 0 0' // left
      }

      if (direction === 0) {
        result.push({
          gridColumn: `${x} / span ${w}`,
          gridRow: `${y} / span ${halfH}`,
          borderRadius,
        })
        y += halfH
        h = halfH
      } else if (direction === 1) {
        result.push({
          gridColumn: `${x + halfW} / span ${halfW}`,
          gridRow: `${y} / span ${h}`,
          borderRadius,
        })
        w = halfW
      } else if (direction === 2) {
        result.push({
          gridColumn: `${x} / span ${w}`,
          gridRow: `${y + halfH} / span ${halfH}`,
          borderRadius,
        })
        h = halfH
      } else if (direction === 3) {
        result.push({
          gridColumn: `${x} / span ${halfW}`,
          gridRow: `${y} / span ${h}`,
          borderRadius,
        })
        x += halfW
        w = halfW
      }

      // cycle direction
      if (props.direction === 'counterclockwise' || props.direction === 'cc') {
        direction = (direction + 3) % 4
      } else {
        direction = (direction + 1) % 4
      }
    }

    return result
  }

  if (props.type === 'spiralslash') {
    const result: { gridColumn: string; gridRow: string; borderRadius?: string }[] = []
    let x = 1,
      y = 1,
      w = gridSize,
      h = gridSize

    const startMap: Record<string, number> = { top: 0, right: 1, bottom: 2, left: 3 }
    let direction = startMap[props.start ?? 'top']

    for (let i = 0; i < elementChildren.length; i++) {
      if (i === elementChildren.length - 1) {
        result.push({
          gridColumn: `${x} / span ${w}`,
          gridRow: `${y} / span ${h}`,
        })
        break
      }

      const halfW = Math.floor(w / 2)
      const halfH = Math.floor(h / 2)

      // choose border radius based on direction + spiral rotation
      let borderRadius = ''
      if (props.direction === 'counterclockwise' || props.direction === 'cc') {
        if (direction === 0) borderRadius = '0 50% 0 0' // top
        if (direction === 1) borderRadius = '0 0 50% 0' // right
        if (direction === 2) borderRadius = '0 0 0 50%' // bottom
        if (direction === 3) borderRadius = '50% 0 0 0' // left
      } else {
        if (direction === 0) borderRadius = '50% 0 0 0' // top
        if (direction === 1) borderRadius = '0 50% 0 0 ' // right
        if (direction === 2) borderRadius = '0 0 50% 0 ' // bottom
        if (direction === 3) borderRadius = '0 0 0 50% ' // left
      }

      if (direction === 0) {
        result.push({
          gridColumn: `${x} / span ${w}`,
          gridRow: `${y} / span ${halfH}`,
          borderRadius,
        })
        y += halfH
        h = halfH
      } else if (direction === 1) {
        result.push({
          gridColumn: `${x + halfW} / span ${halfW}`,
          gridRow: `${y} / span ${h}`,
          borderRadius,
        })
        w = halfW
      } else if (direction === 2) {
        result.push({
          gridColumn: `${x} / span ${w}`,
          gridRow: `${y + halfH} / span ${halfH}`,
          borderRadius,
        })
        h = halfH
      } else if (direction === 3) {
        result.push({
          gridColumn: `${x} / span ${halfW}`,
          gridRow: `${y} / span ${h}`,
          borderRadius,
        })
        x += halfW
        w = halfW
      }

      // cycle direction
      if (props.direction === 'counterclockwise' || props.direction === 'cc') {
        direction = (direction + 3) % 4
      } else {
        direction = (direction + 1) % 4
      }
    }

    return result
  }

  if (props.type === 'cascade') {
    const result: { gridColumn: string; gridRow: string }[] = []
    let x = 1,
      y = 1
    let w = gridSize,
      h = gridSize

    const clockwisePairs: Record<string, [string, string]> = {
      top: ['top', 'right'],
      right: ['right', 'bottom'],
      bottom: ['bottom', 'left'],
      left: ['left', 'top'],
    }

    const counterclockwisePairs: Record<string, [string, string]> = {
      top: ['top', 'left'],
      left: ['left', 'bottom'],
      bottom: ['bottom', 'right'],
      right: ['right', 'top'],
    }

    const pairs =
      props.direction === 'counterclockwise' || props.direction === 'cc'
        ? counterclockwisePairs
        : clockwisePairs

    const sequence = pairs[props.start ?? 'top']

    for (let i = 0; i < elementChildren.length; i++) {
      if (i === elementChildren.length - 1) {
        // ✅ Last child: fill remainder
        result.push({ gridColumn: `${x} / span ${w}`, gridRow: `${y} / span ${h}` })
        break
      }

      const side = sequence![i % 2]

      if (side === 'top') {
        const half = Math.floor(h / 2)
        result.push({ gridColumn: `${x} / span ${w}`, gridRow: `${y} / span ${half}` })
        y = y + half
        h = h - half
      } else if (side === 'right') {
        const half = Math.floor(w / 2)
        result.push({ gridColumn: `${x + half} / span ${w - half}`, gridRow: `${y} / span ${h}` })
        w = half
      } else if (side === 'bottom') {
        const half = Math.floor(h / 2)
        result.push({ gridColumn: `${x} / span ${w}`, gridRow: `${y + half} / span ${h - half}` })
        h = half
      } else if (side === 'left') {
        const half = Math.floor(w / 2)
        result.push({ gridColumn: `${x} / span ${half}`, gridRow: `${y} / span ${h}` })
        x = x + half
        w = w - half
      }
    }

    return result
  }

  return ''
})

const grid = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
  gridTemplateRows: `repeat(${gridSize}, 1fr)`,
}))
</script>

<template>
  <div :style="grid">
    <template v-for="(child, i) in elementChildren" :key="i">
      <component :is="child" :style="placements[i]" />
    </template>
  </div>
</template>

<style scoped lang="scss">
// Sample Styles :
// Grid :
.grid {
  aspect-ratio: 16/ 10;
  background-color: black;
  gap: 5px;
  padding: 10px;
}

// Color Patterns:
// Rainbow:
.grid > :nth-child(7n + 1) {
  background-color: red;
}
.grid > :nth-child(7n + 2) {
  background-color: orange;
}
.grid > :nth-child(7n + 3) {
  background-color: yellow;
}
.grid > :nth-child(7n + 4) {
  background-color: green;
}
.grid > :nth-child(7n + 5) {
  background-color: blue;
}
.grid > :nth-child(7n + 6) {
  background-color: indigo;
}
.grid > :nth-child(7n) {
  background-color: violet;
}

// RGB
// .grid > :nth-child(3n) {
//   background-color: red;
// }
// .grid > :nth-child(3n + 1) {
//   background-color: blue;
// }
// .grid > :nth-child(3n + 2) {
//   background-color: yellow;
// }
</style>
