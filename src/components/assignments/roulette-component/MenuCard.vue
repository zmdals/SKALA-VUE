<script setup>
import Tag from 'primevue/tag'
import Button from 'primevue/button'

defineProps({
  menu: Object,
  index: Number,
})
const emit = defineEmits(['delete-menu'])

const tempTypeMap = {
  cold: { label: '추울 때', severity: 'info' },
  hot: { label: '더울 때', severity: 'danger' },
  any: { label: '아무때나', severity: 'secondary' },
}
</script>

<template>
  <li class="flex items-center gap-3 border-b border-zinc-50 px-1 py-3 last:border-0">
    <span class="w-16 text-sm font-semibold text-zinc-800">{{ menu.name }}</span>
    <span class="text-xs text-zinc-400">{{ menu.category }}</span>
    <Tag
      :severity="tempTypeMap[menu.tempType].severity"
      :value="tempTypeMap[menu.tempType].label"
      class="ml-auto"
    />
    <Button
      label="삭제"
      severity="danger"
      size="small"
      outlined
      @click="emit('delete-menu', index)"
    />
  </li>
</template>
