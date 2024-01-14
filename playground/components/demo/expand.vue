<template>
  <div>
    <Wrap @click="toggle">
      <TransitionExpand :axis="axis" :duration="duration">
        <Placeholder v-if="show" />
      </TransitionExpand>
    </Wrap>

    <div>
      <h2 class="mb-4 text-lg font-medium">Options</h2>

      <h3 class="mb-2 text-sm">Duration</h3>
      <label class="mb-6 flex items-center gap-2 border border-slate-200 rounded px-1 py-0.5">
        <input type="text" v-model="duration" class="flex-grow px-1 outline-none" />
        <span class="text-sm text-black/50">ms</span>
      </label>

      <h3 class="mb-2 text-sm">Axis value</h3>
      <div class="flex items-center gap-6">
        <label>
          <select
            name="types"
            v-model="axis"
            id="transition-types"
            class="py-1 px-2 outline-none border border-slate-200 rounded"
          >
            <option v-for="item in ['x', 'y']" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'

const show = ref(false)
const toggle = () => {
  show.value = !show.value
}
const duration = ref(150)
const axis = ref('x')
</script>
