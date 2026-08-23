<script setup>
import { useConfigStore } from '@/stores/configStore'
import Select from 'primevue/select'

const configStore = useConfigStore()

const categories = [
  { label: '전체', value: 'all' },
  { label: '한식', value: '한식' },
  { label: '중식', value: '중식' },
  { label: '양식', value: '양식' },
  { label: '일식', value: '일식' },
  { label: '기타', value: '기타' },
]
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-surface-500">카테고리:</span>
    <Select
      :model-value="configStore.favoriteCategory"
      @update:model-value="configStore.setFavoriteCategory($event)"
      :options="categories"
      option-label="label"
      option-value="value"
      placeholder="카테고리"
      class="w-28"
    />
  </div>
</template>
