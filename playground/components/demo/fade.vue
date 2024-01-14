<template>
  <Wrap @click="toggle">
    <TransitionFade :duration="duration">
      <Placeholder v-if="show" />
    </TransitionFade>
  </Wrap>

  <div>
    <h2 class="mb-4 text-lg font-medium">Options</h2>

    <h3 class="mb-2 text-sm">Duration</h3>
    <label class="mb-6 flex items-center gap-2 border border-slate-200 rounded px-1 py-0.5">
      <input type="text" v-model="duration" class="flex-grow px-1 outline-none" />
      <span class="text-sm text-black/50">ms</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'

const show = ref(false)
const toggle = () => {
  show.value = !show.value
}
const duration = ref(150)
</script>
