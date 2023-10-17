<template>
  <component :is="group ? TransitionGroup : Transition" name="nuxt-fade">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { Transition, TransitionGroup } from 'vue-demi'

defineProps<{ group?: boolean }>()
</script>

<style lang="less">
.nuxt-fade-enter-from,
.nuxt-fade-leave-to {
  opacity: 0;
}

.nuxt-fade-enter-active,
.nuxt-fade-leave-active {
  transition: opacity 0.15s;
}
</style>
