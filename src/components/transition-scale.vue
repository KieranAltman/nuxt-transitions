<template>
  <component :is="group ? TransitionGroup : Transition" @enter="onEnter" @leave="onLeave">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { Transition, TransitionGroup } from 'vue-demi'
import { getMatrix, clamp } from '../utils'
import { useBaseTransition } from '../composables'
import { NuxtTransitionEvents, NuxtTransitionAxis } from '../types'

const props = withDefaults(
  defineProps<{
    group?: boolean
    scale?: number | Record<NuxtTransitionEvents, number>
    axis?: NuxtTransitionAxis | Record<NuxtTransitionEvents, NuxtTransitionAxis>
    origin?: number[] | Record<NuxtTransitionEvents, number[]>
  }>(),
  {
    group: false,
    scale: 0,
    axis: 'both',
    origin: () => [50, 50]
  }
)
const { setupTransition, resetProperty } = useBaseTransition()

const onEnter = (el: HTMLElement) => {
  scaleElement(el)
  el.offsetTop // emit repaint

  setupTransition(el)
  resetProperty(el, ['opacity', 'transform'])
}
const onLeave = (el: HTMLElement) => {
  setupTransition(el)
  scaleElement(el, 'leave')
}

const scaleElement = (el: HTMLElement, event: NuxtTransitionEvents = 'enter') => {
  // computed state
  const { transform } = getComputedStyle(el)
  let origin = Array.isArray(props.origin) ? props.origin : props.origin[event]
  let axis = typeof props.axis === 'string' ? props.axis : props.axis[event]
  let scale = typeof props.scale === 'number' ? props.scale : props.scale[event]
  scale = clamp(0.0001, scale, 0.9999) // zero not animatable

  // computed end state
  const { matrixType, matrix } = getMatrix(transform)
  switch (matrixType) {
    case 'matrix3d':
      if (axis !== 'y') matrix[0] = scale
      if (axis !== 'x') matrix[5] = scale
      break
    case 'matrix':
      if (axis !== 'y') matrix[0] = scale
      if (axis !== 'x') matrix[3] = scale
      break
    default:
      matrix[0] = axis === 'y' ? 1 : scale
      matrix[3] = axis === 'x' ? 1 : scale
  }

  el.style.setProperty('opacity', '0')
  el.style.setProperty('transform-origin', `${origin[0]}% ${origin[1]}%`)
  el.style.setProperty('transform', `${matrixType}(${matrix})`)
}
</script>
