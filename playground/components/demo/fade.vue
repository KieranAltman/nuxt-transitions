<template>
  <Wrap @click="toggle">
    <TransitionFade>
      <Placeholder v-if="show" />
    </TransitionFade>
  </Wrap>
</template>

<script setup lang="ts">
import { ref } from '#imports'

const show = ref(false)
const toggle = () => {
  show.value = !show.value
}
</script>
