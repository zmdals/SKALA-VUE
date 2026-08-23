<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from '@/components/assignments/common/UnitToggler.vue'
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-6">
    <div class="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4">
      <nav class="flex gap-6">
        <RouterLink
          to="/assignments/weather-final"
          exact-active-class="!text-zinc-900 !border-zinc-900"
          class="border-b-2 border-transparent px-1 pb-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-600"
        >
          날씨 대시보드
        </RouterLink>
        <RouterLink
          to="/assignments/weather-final/compare"
          active-class="!text-zinc-900 !border-zinc-900"
          class="border-b-2 border-transparent px-1 pb-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-600"
        >
          전체 날씨 비교
        </RouterLink>
        <RouterLink
          to="/assignments/weather-final/about"
          active-class="!text-zinc-900 !border-zinc-900"
          class="border-b-2 border-transparent px-1 pb-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-600"
        >
          서비스 소개
        </RouterLink>
      </nav>
      <UnitToggler />
    </div>
    <RouterView />
  </div>
</template>
