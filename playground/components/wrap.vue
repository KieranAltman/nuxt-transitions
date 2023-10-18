<template>
  <div
    class="transition relative w-full h-72 my-8 p-2 border border-slate-200 rounded-lg cursor-pointer ring-2 ring-offset-0 ring-transparent hover:ring-slate-300 hover:ring-offset-4 before:content-['Click_to_toggle.'] before:absolute before:inset-0 before:flex before:justify-center before:items-center before:text-4xl before:font-semibold before:text-slate-200 before:-z-10"
  >
    <slot />
  </div>
</template>
