<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20">
    <div class="rounded-xl border border-surface-200 bg-white p-10 text-center shadow-sm">
      <p class="mb-2 text-6xl">🌤️❓</p>
      <h2 class="mb-2 text-2xl font-bold text-surface-800">페이지를 찾을 수 없습니다.</h2>
      <p class="mb-6 text-sm text-surface-400">
        요청하신 주소가 존재하지 않거나,<br />아직 개발되지 않았습니다.
      </p>
      <Button
        label="날씨 메인으로 이동"
        severity="info"
        @click="router.push('/assignments/weather-final')"
      />
    </div>
  </div>
</template>
