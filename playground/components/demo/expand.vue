<template>
  <div>
    <Wrap @click="toggle">
      <TransitionExpand :axis="axis">
        <Placeholder v-if="show" />
      </TransitionExpand>
    </Wrap>

    <div>
      <h2 class="mb-4 text-lg font-medium">Options</h2>
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

const axis = ref('x')
</script>
