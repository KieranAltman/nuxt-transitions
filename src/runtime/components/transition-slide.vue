<template>
  <component :is="group ? TransitionGroup : Transition" @enter="onEnter" @leave="onLeave">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { Transition, TransitionGroup } from 'vue-demi'
import { getMatrix } from '../utils'
import { useBaseTransition } from '../composables'
import type { NuxtTransitionEvents } from '../types'

const props = withDefaults(
  defineProps<{
    group?: boolean
    offset?: (number | string)[] | Record<NuxtTransitionEvents, (number | string)[]>
  }>(),
  {
    group: false,
    offset: () => [0, 10]
  }
)
const { setupTransition, resetProperty } = useBaseTransition()

const onEnter = (el: HTMLElement) => {
  slideElement(el)
  el.offsetTop // emit repaint

  setupTransition(el)
  resetProperty(el, ['opacity', 'transform'])
}
const onLeave = (el: HTMLElement) => {
  setupTransition(el)
  slideElement(el, 'leave')
}

const formatOffset = (offset: string, base: string) =>
  offset.endsWith('%') ? (parseFloat(base) * (parseFloat(offset.slice(0, -1)) || 0)) / 100 : parseFloat(offset)

const slideElement = (el: HTMLElement, event: NuxtTransitionEvents = 'enter') => {
  // computed offset
  const { width, height, transform } = getComputedStyle(el)
  let [offsetX, offsetY] = Array.isArray(props.offset) ? props.offset : props.offset[event]
  if (typeof offsetX === 'string') {
    offsetX = formatOffset(offsetX, width)
  }
  if (typeof offsetY === 'string') {
    offsetY = formatOffset(offsetY, height)
  }

  // computed end position
  const { matrix, matrixType } = getMatrix(transform)
  switch (matrixType) {
    case 'matrix3d':
      matrix[12] += offsetX
      matrix[13] += offsetY
      break
    case 'matrix':
      matrix[4] += offsetX
      matrix[5] += offsetY
      break
    default:
      matrix[4] = offsetX
      matrix[5] = offsetY
  }

  // set translate & opacity
  el.style.setProperty('transform', `${matrixType}(${matrix})`)
  el.style.setProperty('opacity', '0')
}
</script>
