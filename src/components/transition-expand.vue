<template>
  <component :is="group ? TransitionGroup : Transition" @enter="onEnter" @leave="onLeave">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { Transition, TransitionGroup, computed } from 'vue-demi'
import { useBaseTransition } from '../composables'

type Axis = 'x' | 'y'
const props = withDefaults(
  defineProps<{
    group?: boolean
    axis?: Axis
  }>(),
  {
    group: false,
    axis: 'y'
  }
)
const isVertical = computed(() => props.axis === 'y')
const start = computed(() => (isVertical.value ? 'top' : 'left'))
const end = computed(() => (isVertical.value ? 'bottom' : 'right'))

const { setupTransition } = useBaseTransition()

const elementSize = {
  size: { width: '0px', height: '0px' },
  padding: { left: '0px', top: '0px', right: '0px', bottom: '0px' },
  margin: { left: '0px', top: '0px', right: '0px', bottom: '0px' }
}
const initElementSize = (el: HTMLElement) => {
  const {
    width,
    height,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft
  } = getComputedStyle(el)

  elementSize.size.width = width
  elementSize.size.height = height
  elementSize.padding.top = paddingTop
  elementSize.padding.left = paddingLeft
  elementSize.padding.bottom = paddingBottom
  elementSize.padding.right = paddingRight
  elementSize.margin.top = marginTop
  elementSize.margin.bottom = marginBottom
  elementSize.margin.left = marginLeft
  elementSize.margin.right = marginRight
}

const onEnter = (el: HTMLElement) => {
  initElementSize(el)
  collapse(el)
  el.offsetTop

  setupTransition(el)
  expand(el)
}

const onLeave = (el: HTMLElement) => {
  expand(el)
  setupTransition(el)
  collapse(el)
}

const expand = (el: HTMLElement) => {
  const rule = isVertical.value ? 'height' : 'width'
  el.style.setProperty(rule, `${elementSize.size[rule]}`)
  el.style.setProperty(`padding-${start.value}`, `${elementSize.padding[start.value]}`)
  el.style.setProperty(`padding-${end.value}`, `${elementSize.padding[end.value]}`)
  el.style.setProperty(`margin-${start.value}`, `${elementSize.margin[start.value]}`)
  el.style.setProperty(`margin-${end.value}`, `${elementSize.margin[end.value]}`)
  el.style.setProperty('overflow', 'hidden')
}
const collapse = (el: HTMLElement) => {
  el.style.setProperty(isVertical.value ? 'height' : 'width', '0')
  el.style.setProperty(`padding-${start.value}`, '0')
  el.style.setProperty(`padding-${end.value}`, '0')
  el.style.setProperty(`margin-${start.value}`, '0')
  el.style.setProperty(`margin-${end.value}`, '0')
  el.style.setProperty('overflow', 'hidden')
}
</script>
