<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <div class="rounded-xl border border-surface-200 bg-white p-8 shadow-sm">
      <h2 class="mb-4 text-xl font-bold text-surface-800">ℹ️ 서비스 소개</h2>

      <p class="mb-4 text-surface-600 leading-relaxed">
        본 앱은 Vue 3 및 Vue Router 기반 기상 관측 + 점심 메뉴 추천 시스템입니다.
      </p>

      <h3 class="mb-2 text-sm font-semibold text-surface-700">주요 기능</h3>
      <ul class="mb-6 flex flex-col gap-2 text-sm text-surface-600">
        <li class="flex items-center gap-2">
          <span class="text-blue-500">•</span> 6개 도시의 실시간 날씨 대시보드
        </li>
        <li class="flex items-center gap-2">
          <span class="text-green-500">•</span> 도시 선택 시 기온 기반 맞춤 메뉴 추천
        </li>
        <li class="flex items-center gap-2">
          <span class="text-purple-500">•</span> 랜덤 메뉴 룰렛으로 오늘의 메뉴 결정
        </li>
        <li class="flex items-center gap-2">
          <span class="text-orange-500">•</span> 메뉴 추가/삭제로 나만의 메뉴 리스트 관리
        </li>
      </ul>

      <Button
        label="대시보드로 이동"
        severity="info"
        class="w-full"
        @click="router.push('/assignments/weather-final')"
      />
    </div>
  </div>
</template>
