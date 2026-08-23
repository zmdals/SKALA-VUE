<script setup>
import { ref } from 'vue'
import WeatherParent from '@/components/assignments/weather-component/WeatherParent.vue'
import RouletteParent from '@/components/assignments/roulette-component/RouletteParent.vue'

const selectedCity = ref(null)

const handleSelectCity = (city) => {
  selectedCity.value = city
}

const showDetail = (city) => {
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}
</script>

<template>
  <div class="main-layout">
    <WeatherParent
      :selectedCity="selectedCity"
      @select-city="handleSelectCity"
      @click-detail="showDetail"
    />
    <RouletteParent :selectedCity="selectedCity" />
  </div>
</template>

<style scoped>
/* 전체 레이아웃 */
.main-layout {
  display: flex;
  gap: 24px;
  max-width: 1400px;
  margin: 20px auto;
}
</style>
