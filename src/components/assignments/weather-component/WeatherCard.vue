<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const configStore = useConfigStore()

const props = defineProps({
  city: Object,
  selected: Boolean,
})
const emit = defineEmits(['select-card', 'click-detail'])

const displayTemp = computed(() => {
  const rawTemp = props.city.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const tempSeverity = computed(() => {
  if (props.city.temp >= 30) return 'danger'
  if (props.city.temp >= 20) return 'success'
  return 'info'
})

const tempLabel = computed(() => {
  if (props.city.temp >= 30) return '더움'
  if (props.city.temp >= 20) return '선선함'
  return '추움'
})
</script>

<template>
  <li
    class="grid cursor-pointer items-center rounded-lg border bg-white px-4 py-3 transition-all hover:shadow-sm"
    :class="
      selected
        ? 'border-emerald-300 ring-2 ring-emerald-100'
        : 'border-zinc-100 hover:border-zinc-200'
    "
    style="grid-template-columns: 40px 220px 80px 80px 1fr"
    @click="emit('select-card', city)"
  >
    <img
      v-if="city.icon"
      :src="`https://openweathermap.org/img/wn/${city.icon}@2x.png`"
      class="h-10 w-10"
    />
    <div>
      <p class="text-sm font-semibold text-zinc-800">{{ city.name }}</p>
      <p class="text-xs text-zinc-400">{{ city.status }}</p>
    </div>
    <p class="text-right text-lg font-bold tabular-nums text-zinc-800">
      {{ displayTemp }}{{ configStore.unitSymbol }}
    </p>
    <div class="flex justify-center">
      <Tag :severity="tempSeverity" :value="tempLabel" />
    </div>
    <div class="flex justify-end">
      <Button
        label="상세"
        severity="secondary"
        size="small"
        outlined
        @click.stop="emit('click-detail', city)"
      />
    </div>
  </li>
</template>
