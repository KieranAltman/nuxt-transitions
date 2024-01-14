<template>
  <div>
    <Wrap @click="toggle">
      <TransitionSlide
        :duration="duration"
        :offset="{ enter: [offset.enter.x, offset.enter.y], leave: [offset.leave.x, offset.leave.y] }"
      >
        <Placeholder v-if="show" />
      </TransitionSlide>
    </Wrap>

    <div>
      <h2 class="mb-4 text-lg font-medium">Options</h2>

      <h3 class="mb-2 text-sm">Duration</h3>
      <label class="mb-6 flex items-center gap-2 border border-slate-200 rounded px-1 py-0.5">
        <input type="text" v-model="duration" class="flex-grow px-1 outline-none" />
        <span class="text-sm text-black/50">ms</span>
      </label>

      <h3 class="mb-2 text-sm">Enter Offset</h3>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <label class="flex items-center gap-2">
          X:
          <input
            type="text"
            v-model="offset.enter.x"
            class="flex-grow px-1 outline-none border border-slate-200 rounded"
          />
        </label>
        <label class="flex items-center gap-2">
          Y:
          <input
            type="text"
            v-model="offset.enter.y"
            class="flex-grow px-1 outline-none border border-slate-200 rounded"
          />
        </label>
      </div>

      <h3 class="mb-2 text-sm">Leave Offset</h3>
      <div class="grid grid-cols-2 gap-4">
        <label class="flex items-center gap-2">
          X:
          <input
            type="text"
            v-model="offset.leave.x"
            class="flex-grow px-1 outline-none border border-slate-200 rounded"
          />
        </label>
        <label class="flex items-center gap-2">
          Y:
          <input
            type="text"
            v-model="offset.leave.y"
            class="flex-grow px-1 outline-none border border-slate-200 rounded"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from '#imports'

const show = ref(false)
const toggle = () => {
  show.value = !show.value
}

const duration = ref(150)
const offset = reactive({
  enter: {
    x: 0,
    y: 10
  },
  leave: {
    x: 0,
    y: 10
  }
})
</script>
