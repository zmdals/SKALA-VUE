<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import axios from 'axios'
import SearchBar from '@/components/assignments/weather-component/SearchBar.vue'
import WeatherCard from '@/components/assignments/weather-component/WeatherCard.vue'
import BaseDashBoardCard from '@/components/assignments/common/BaseDashBoardCard.vue'
import { cityNames } from '@/utils/mappingTable.js'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const cities = ['Seoul', 'Chicago', 'Los Angeles', 'Paris', 'Tokyo', 'Oslo']

const weatherList = ref([])
const error = ref(null)

async function fetchData() {
  try {
    for (const city of cities) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`,
      )
      weatherList.value.push({
        id: response.data.id,
        name: cityNames[city] || response.data.name,
        temp: Math.round(response.data.main.temp),
        status: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      })
    }
  } catch (e) {
    error.value = e.message
  }
}

onMounted(fetchData)

const props = defineProps({
  selectedCity: { type: Object, default: null },
})
const emit = defineEmits(['select-city', 'click-detail'])

const searchQuery = ref('')
const selectedCityInfo = ref('')

const handleSearchQuery = (updatedQuery) => {
  searchQuery.value = updatedQuery
}

const filteredWeatherList = computed(() => {
  if (searchQuery.value) {
    return weatherList.value.filter((w) => w.name.includes(searchQuery.value))
  } else {
    return weatherList.value
  }
})

const showDetail = (city) => {
  emit('click-detail', city)
}

//한글 조사 처리
const getParticle = (name) => {
  const lastChar = name.charCodeAt(name.length - 1)
  const hasBatchim = (lastChar - 0xac00) % 28 !== 0
  return hasBatchim ? '이' : '가'
}

const showSelected = (city) => {
  if (props.selectedCity && props.selectedCity.id === city.id) {
    emit('select-city', null)
    selectedCityInfo.value = '선택이 해제되었습니다.'
  } else {
    emit('select-city', city)
    selectedCityInfo.value = `${city.name}${getParticle(city.name)} 선택되었습니다.`
  }
}

watch(selectedCityInfo, (newValue) => {
  console.log(`[watch 감지] 상태 바 문구가 업데이트 되었습니다. -> ${newValue}`)
})

watchEffect(() => {
  console.log(
    `[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})
</script>

<template>
  <div class="flex-1">
    <h2 class="mb-5 text-center text-lg font-bold text-zinc-800">🌦️ 날씨 대시보드</h2>

    <BaseDashBoardCard>
      <SearchBar :search-query="searchQuery" @update-query="handleSearchQuery" />
    </BaseDashBoardCard>

    <BaseDashBoardCard>
      <h3 class="mb-3 text-sm font-semibold text-zinc-700">지역별 날씨 현황</h3>
      <p v-if="filteredWeatherList.length === 0" class="py-6 text-center text-sm text-zinc-300">
        검색 결과가 없습니다
      </p>
      <ul class="flex flex-col gap-2">
        <WeatherCard
          v-for="w in filteredWeatherList"
          :key="w.id"
          :city="w"
          :selected="selectedCity?.id === w.id"
          @select-card="showSelected"
          @click-detail="showDetail"
        />
      </ul>
    </BaseDashBoardCard>

    <div
      class="mt-4 rounded-lg border p-3 text-center text-sm font-medium"
      :class="
        selectedCityInfo
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-zinc-100 bg-zinc-50 text-zinc-300'
      "
    >
      {{ selectedCityInfo || '카드를 클릭하거나 검색해 보세요' }}
    </div>
  </div>
</template>
