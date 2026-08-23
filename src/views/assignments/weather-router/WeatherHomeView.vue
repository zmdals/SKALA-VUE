<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import WeatherParent from '@/components/assignments/weather-component/WeatherParent.vue'
import RouletteParent from '@/components/assignments/roulette-component/RouletteParent.vue'

const router = useRouter()

const selectedCity = ref(null)

const handleSelectCity = (city) => {
  selectedCity.value = city
}

const goToDetail = (city) => {
  router.push('/assignments/weather-final/weather/' + city.id)
}
</script>

<template>
  <div class="flex gap-6">
    <WeatherParent
      :selected-city="selectedCity"
      @select-city="handleSelectCity"
      @click-detail="goToDetail"
    />
    <RouletteParent :selected-city="selectedCity" />
  </div>
</template>
