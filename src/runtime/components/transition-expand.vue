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
    duration?: number
    group?: boolean
    axis?: Axis
  }>(),
  {
    duration: 150,
    group: false,
    axis: 'y'
  }
)
const isVertical = computed(() => props.axis === 'y')
const start = computed(() => (isVertical.value ? 'top' : 'left'))
const end = computed(() => (isVertical.value ? 'bottom' : 'right'))

const { setupTransition } = useBaseTransition(props)

const elementStyles = {
  size: { width: '0px', height: '0px' },
  padding: { left: '0px', top: '0px', right: '0px', bottom: '0px' },
  margin: { left: '0px', top: '0px', right: '0px', bottom: '0px' },
  opacity: '0'
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
    marginLeft,
    opacity
  } = getComputedStyle(el)

  elementStyles.size.width = width
  elementStyles.size.height = height
  elementStyles.padding.top = paddingTop
  elementStyles.padding.left = paddingLeft
  elementStyles.padding.bottom = paddingBottom
  elementStyles.padding.right = paddingRight
  elementStyles.margin.top = marginTop
  elementStyles.margin.bottom = marginBottom
  elementStyles.margin.left = marginLeft
  elementStyles.margin.right = marginRight
  elementStyles.opacity = opacity
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
  el.style.setProperty(rule, `${elementStyles.size[rule]}`)
  el.style.setProperty(`padding-${start.value}`, `${elementStyles.padding[start.value]}`)
  el.style.setProperty(`padding-${end.value}`, `${elementStyles.padding[end.value]}`)
  el.style.setProperty(`margin-${start.value}`, `${elementStyles.margin[start.value]}`)
  el.style.setProperty(`margin-${end.value}`, `${elementStyles.margin[end.value]}`)
  el.style.setProperty(`opacity`, elementStyles.opacity)
  el.style.setProperty('overflow', 'hidden')
}
const collapse = (el: HTMLElement) => {
  el.style.setProperty(isVertical.value ? 'height' : 'width', '0')
  el.style.setProperty(`padding-${start.value}`, '0')
  el.style.setProperty(`padding-${end.value}`, '0')
  el.style.setProperty(`margin-${start.value}`, '0')
  el.style.setProperty(`margin-${end.value}`, '0')
  el.style.setProperty(`opacity`, '0')
  el.style.setProperty('overflow', 'hidden')
}
</script>
