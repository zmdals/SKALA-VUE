<script setup>
import InputText from 'primevue/inputtext'

defineProps({
  searchQuery: String,
})
const emit = defineEmits(['update-query'])
</script>

<template>
  <div>
    <h3 class="mb-3 text-sm font-semibold text-surface-700">🔍 도시 검색</h3>
    <InputText
      :model-value="searchQuery"
      @update:model-value="emit('update-query', $event)"
      placeholder="검색할 도시 이름 입력"
      class="w-full"
    />
    <p class="mt-2 text-xs text-surface-400">검색 중인 도시: {{ searchQuery }}</p>
  </div>
</template>
