<template>
  <component :is="group ? TransitionGroup : Transition" @enter="onEnter" @leave="onLeave">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { useBaseTransition } from '../composables'
import { Transition, TransitionGroup } from 'vue'

const props = withDefaults(defineProps<{ duration?: number; group?: boolean }>(), {
  duration: 150,
  group: false
})
const { setupTransition, resetProperty } = useBaseTransition(props)

const onEnter = (el: HTMLElement) => {
  fadeElement(el)
  el.offsetTop // emit repaint

  setupTransition(el)
  resetProperty(el, ['opacity'])
}
const onLeave = (el: HTMLElement) => {
  setupTransition(el)
  fadeElement(el)
}
const fadeElement = (el: HTMLElement) => {
  el.style.setProperty('opacity', '0')
}
</script>
