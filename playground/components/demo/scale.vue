<template>
  <div>
    <Wrap @click="toggle">
      <TransitionScale
        :scale="scale"
        :origin="{ enter: [origin.enter.x, origin.enter.y], leave: [origin.leave.x, origin.leave.y] }"
        :axis="axis"
      >
        <Placeholder v-if="show" />
      </TransitionScale>
    </Wrap>

    <div>
      <h2 class="mb-4 text-lg font-medium">Options</h2>

      <h3 class="mb-2 text-sm">Scale value</h3>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <label class="flex items-center gap-2">
          In:
          <input
            type="text"
            v-model="scale.enter"
            class="flex-grow px-1 outline-none border border-slate-200 rounded"
          />
        </label>
        <label class="flex items-center gap-2">
          Out:
          <input
            type="text"
            v-model="scale.leave"
            class="flex-grow px-1 outline-none border border-slate-200 rounded"
          />
        </label>
      </div>

      <h3 class="mb-2 text-sm">Origin value</h3>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="flex items-center gap-2">
          Enter:
          <div class="flex py-1 px-2 border border-slate-200 text-slate-300 rounded">
            [
            <input type="text" v-model="origin.enter.x" class="w-8 text-center text-slate-800 outline-none" />,
            <input type="text" v-model="origin.enter.y" class="w-8 text-center text-slate-800 outline-none" />
            ]
          </div>
        </div>

        <div class="flex items-center gap-2">
          Leave:
          <div class="flex py-1 px-2 border border-slate-200 text-slate-300 rounded">
            [
            <input type="text" v-model="origin.leave.x" class="w-8 text-center text-slate-800 outline-none" />,
            <input type="text" v-model="origin.leave.y" class="w-8 text-center text-slate-800 outline-none" />
            ]
          </div>
        </div>
      </div>

      <h3 class="mb-2 text-sm">Axis value</h3>
      <div class="flex items-center gap-6">
        <label>
          In:
          <select
            name="types"
            v-model="axis.enter"
            id="transition-types"
            class="py-1 px-2 outline-none border border-slate-200 rounded"
          >
            <option v-for="item in ['x', 'y', 'both']" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
        <label>
          Out:
          <select
            name="types"
            v-model="axis.leave"
            id="transition-types"
            class="py-1 px-2 outline-none border border-slate-200 rounded"
          >
            <option v-for="item in ['x', 'y', 'both']" :key="item" :value="item">{{ item }}</option>
          </select>
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

const scale = reactive({
  enter: 0,
  leave: 0
})
const origin = reactive({
  enter: { x: 50, y: 50 },
  leave: { x: 50, y: 50 }
})
const axis = reactive({
  enter: 'both',
  leave: 'both'
})
</script>
