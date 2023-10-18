<template>
  <div class="max-w-lg py-24 px-6 mx-auto font-sono">
    <h1 class="mb-12 italic text-4xl text-center font-medium">Playground</h1>

    <div class="flex flex-col items-start gap-2">
      <label for="transition-types" class="text-sm">Select transition.</label>
      <select
        name="types"
        v-model="currentTransition"
        id="transition-types"
        class="py-1 px-2 outline-none border border-slate-200 rounded"
      >
        <option v-for="item in transitions" :key="item.value" :value="item.value">{{ item.label }}</option>
      </select>
    </div>

    <template v-if="currentTransition === 'fade'">
      <DemoFade />
    </template>
    <template v-else-if="currentTransition === 'slide'">
      <DemoSlide />
    </template>
    <template v-else-if="currentTransition === 'scale'">
      <DemoScale />
    </template>
    <template v-else-if="currentTransition === 'expand'">
      <DemoExpand />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'

const transitions = [
  { label: 'TransitionFade', value: 'fade' },
  { label: 'TransitionSlide', value: 'slide' },
  { label: 'TransitionScale', value: 'scale' },
  { label: 'TransitionExpand', value: 'expand' }
]
const currentTransition = ref(transitions[1].value)

const show = ref(false)
const toggle = () => {
  show.value = !show.value
}
</script>
