<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { cityNames } from '@/utils/mappingTable.js'
import axios from 'axios'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const cityId = route.params.cityId
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const detail = ref(null)
const forecast = ref([])
const moreDetail = ref(null)
const error = ref(null)

async function fetchDetail() {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric&lang=kr`,
    )
    detail.value = {
      id: response.data.id,
      nameEn: response.data.name,
      name: cityNames[response.data.name] || response.data.name,
      temp: Math.round(response.data.main.temp),
      status: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: response.data.weather[0].icon,
      lat: response.data.coord.lat,
      lon: response.data.coord.lon,
    }
  } catch (e) {
    error.value = e.message
  }
}

async function fetchForecast() {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}&units=metric&lang=kr`,
    )
    for (const item of response.data.list) {
      if (item.dt_txt.includes('12:00:00')) {
        forecast.value.push({
          date: item.dt_txt.split(' ')[0],
          temp: Math.round(item.main.temp),
          humidity: item.main.humidity,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          wind: item.wind.speed,
        })
      }
    }
  } catch (e) {
    error.value = e.message
  }
}

async function fetchMoreDetail() {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${detail.value.lat}&longitude=${detail.value.lon}&current=uv_index&daily=sunrise,sunset&timezone=auto`,
    )
    moreDetail.value = {
      uv_index: response.data.current.uv_index,
      sunrise: response.data.daily.sunrise[0].split('T')[1],
      sunset: response.data.daily.sunset[0].split('T')[1],
    }
  } catch (e) {
    error.value = e.message
  }
}

onMounted(async () => {
  await fetchDetail()
  await fetchForecast()
  await fetchMoreDetail()
})

const displayTemp = computed(() => {
  if (!detail.value) return 0
  const rawTemp = detail.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <!-- 기본 날씨 -->
    <div v-if="detail" class="mb-4 rounded-xl border border-zinc-100 bg-white p-6">
      <div class="mb-5 flex items-center gap-4">
        <img :src="`https://openweathermap.org/img/wn/${detail.icon}@2x.png`" class="h-16 w-16" />
        <div class="flex-1">
          <h3 class="text-xl font-bold text-zinc-800">{{ detail.name }}</h3>
          <p class="text-sm text-zinc-400">{{ detail.status }}</p>
        </div>
        <p class="text-3xl font-bold tabular-nums text-zinc-800">
          {{ displayTemp }}{{ configStore.unitSymbol }}
        </p>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-lg bg-zinc-50 px-4 py-3">
          <p class="text-xs text-zinc-400">습도</p>
          <p class="text-lg font-semibold text-zinc-700">{{ detail.humidity }}%</p>
        </div>
        <div class="rounded-lg bg-zinc-50 px-4 py-3">
          <p class="text-xs text-zinc-400">풍속</p>
          <p class="text-lg font-semibold text-zinc-700">{{ detail.wind }}m/s</p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="mb-4 rounded-xl border border-zinc-100 bg-white p-8 text-center text-zinc-300"
    >
      해당 도시를 찾을 수 없습니다
    </div>

    <!-- UV / 일출 / 일몰 -->
    <div v-if="moreDetail" class="mb-4 rounded-xl border border-zinc-100 bg-white p-6">
      <h3 class="mb-3 text-sm font-semibold text-zinc-700">☀️ 태양 정보</h3>
      <div class="grid grid-cols-3 gap-3">
        <div class="rounded-lg bg-amber-50 px-4 py-3 text-center">
          <p class="text-xs text-amber-400">UV 지수</p>
          <p class="text-lg font-semibold text-amber-600">{{ moreDetail.uv_index }}</p>
        </div>
        <div class="rounded-lg bg-orange-50 px-4 py-3 text-center">
          <p class="text-xs text-orange-400">일출</p>
          <p class="text-lg font-semibold text-orange-600">{{ moreDetail.sunrise }}</p>
        </div>
        <div class="rounded-lg bg-indigo-50 px-4 py-3 text-center">
          <p class="text-xs text-indigo-400">일몰</p>
          <p class="text-lg font-semibold text-indigo-600">{{ moreDetail.sunset }}</p>
        </div>
      </div>
    </div>

    <!-- 5일 예보 -->
    <div v-if="forecast.length > 0" class="mb-4 rounded-xl border border-zinc-100 bg-white p-6">
      <h3 class="mb-3 text-sm font-semibold text-zinc-700">5일간 날씨 예보 (정오 기준)</h3>
      <div
        class="grid border-b border-zinc-100 pb-2 text-xs font-medium text-zinc-400"
        style="grid-template-columns: 100px 32px 80px 1fr 60px"
      >
        <span>날짜</span>
        <span></span>
        <span>상태</span>
        <span class="text-right">기온</span>
        <span class="text-right">풍속</span>
      </div>
      <div class="flex flex-col">
        <div
          v-for="f in forecast"
          :key="f.date"
          class="grid items-center border-b border-zinc-50 py-3 last:border-0"
          style="grid-template-columns: 100px 32px 80px 1fr 60px"
        >
          <span class="text-sm text-zinc-500">{{ f.date }}</span>
          <img :src="`https://openweathermap.org/img/wn/${f.icon}.png`" class="h-8 w-8" />
          <span class="text-sm text-zinc-500">{{ f.description }}</span>
          <span class="text-right text-sm font-semibold tabular-nums text-zinc-700"
            >{{ f.temp }}℃</span
          >
          <span class="text-right text-xs text-zinc-400">{{ f.wind }}m/s</span>
        </div>
      </div>
    </div>

    <Button
      label="← 대시보드로 돌아가기"
      severity="secondary"
      text
      class="w-full"
      @click="router.back()"
    />
  </div>
</template>
