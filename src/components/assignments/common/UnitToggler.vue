<script setup>
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div
    class="flex cursor-pointer items-center gap-0.5 rounded-lg bg-zinc-100 p-1 text-sm"
    @click="configStore.toggleUnit()"
  >
    <span
      class="rounded-md px-3 py-1.5 font-medium transition-colors"
      :class="configStore.unit === 'celsius' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400'"
    >
      ℃
    </span>
    <span
      class="rounded-md px-3 py-1.5 font-medium transition-colors"
      :class="configStore.unit === 'fahrenheit' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400'"
    >
      ℉
    </span>
  </div>
</template>
