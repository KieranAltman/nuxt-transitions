<template>
  <div>
    Nuxt module playground!
    <button @click="toggle">Toggle</button>
    <TransitionExpand axis="x">
      <div v-if="show" class="content"></div>
    </TransitionExpand>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'

const show = ref(false)
const toggle = () => {
  show.value = !show.value
}
</script>

<style>
.content {
  width: 128px;
  height: 128px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: cyan;
  /* transform: translateX(10px); */
  transform: matrix(1, 0, 0, 1, 0, 0);
}
</style>
