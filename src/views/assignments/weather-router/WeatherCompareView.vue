<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { cityNames } from '@/utils/mappingTable.js'
import axios from 'axios'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

const router = useRouter()
const configStore = useConfigStore()
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const cities = ['Seoul', 'Chicago', 'Los Angeles', 'Paris', 'Tokyo', 'Oslo']
const tableData = ref([])

async function fetchAll() {
  for (const city of cities) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`,
    )
    tableData.value.push({
      name: cityNames[city] || response.data.name,
      temp: Math.round(response.data.main.temp),
      status: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: response.data.weather[0].icon,
    })
  }
}

onMounted(fetchAll)

const displayTemp = (rawTemp) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <div class="rounded-xl border border-zinc-100 bg-white p-6">
      <h2 class="mb-4 text-lg font-bold text-zinc-800">📊 전체 상세 날씨 비교</h2>
      <DataTable :value="tableData" stripedRows class="text-sm">
        <Column header="도시" field="name">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <img :src="`https://openweathermap.org/img/wn/${data.icon}.png`" class="h-8 w-8" />
              <span class="font-medium text-zinc-800">{{ data.name }}</span>
            </div>
          </template>
        </Column>
        <Column header="기온">
          <template #body="{ data }">
            <span class="font-semibold tabular-nums"
              >{{ displayTemp(data.temp) }}{{ configStore.unitSymbol }}</span
            >
          </template>
        </Column>
        <Column header="상태" field="status" />
        <Column header="습도">
          <template #body="{ data }">{{ data.humidity }}%</template>
        </Column>
        <Column header="풍속">
          <template #body="{ data }">{{ data.wind }}m/s</template>
        </Column>
      </DataTable>
    </div>
    <Button
      label="← 대시보드로 돌아가기"
      severity="secondary"
      text
      class="mt-4 w-full"
      @click="router.push('/assignments/weather-final')"
    />
  </div>
</template>
