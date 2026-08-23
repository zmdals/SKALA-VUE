<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const name = ref('')
const category = ref('')

const emit = defineEmits(['add-menu'])

const handleAdd = () => {
  if (!name.value || !category.value) return
  emit('add-menu', { name: name.value, category: category.value })
  name.value = ''
  category.value = ''
}
</script>

<template>
  <div>
    <h3 class="mb-3 text-sm font-semibold text-surface-700">➕ 메뉴 추가</h3>
    <div class="flex gap-2">
      <InputText v-model="name" placeholder="메뉴 이름" class="flex-1" />
      <InputText v-model="category" placeholder="카테고리" class="flex-1" />
      <Button label="추가" severity="success" @click="handleAdd" />
    </div>
  </div>
</template>
