<script setup>
import { ref, computed, watch } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import Button from 'primevue/button'
import Select from 'primevue/select'
import AddBar from '@/components/assignments/roulette-component/AddBar.vue'
import MenuCard from '@/components/assignments/roulette-component/MenuCard.vue'
import BaseDashBoardCard from '@/components/assignments/common/BaseDashBoardCard.vue'

const configStore = useConfigStore()

const props = defineProps({
  selectedCity: { type: Object, default: null },
})

const categories = [
  { label: '전체', value: 'all' },
  { label: '한식', value: '한식' },
  { label: '중식', value: '중식' },
  { label: '양식', value: '양식' },
  { label: '일식', value: '일식' },
  { label: '기타', value: '기타' },
]

const menus = ref([
  { id: 1, name: '돈까스', category: '양식', tempType: 'any' },
  { id: 2, name: '김치찌개', category: '한식', tempType: 'cold' },
  { id: 3, name: '쫄면', category: '한식', tempType: 'hot' },
  { id: 4, name: '짜장면', category: '중식', tempType: 'any' },
  { id: 5, name: '초밥', category: '일식', tempType: 'any' },
  { id: 6, name: '짬뽕', category: '중식', tempType: 'cold' },
  { id: 7, name: '카레', category: '양식', tempType: 'cold' },
  { id: 8, name: '떡볶이', category: '한식', tempType: 'any' },
  { id: 9, name: '우동', category: '일식', tempType: 'cold' },
  { id: 10, name: '마라탕', category: '중식', tempType: 'cold' },
  { id: 11, name: '부대찌개', category: '한식', tempType: 'cold' },
  { id: 12, name: '파스타', category: '양식', tempType: 'any' },
  { id: 13, name: '냉면', category: '한식', tempType: 'hot' },
  { id: 14, name: '콩국수', category: '한식', tempType: 'hot' },
  { id: 15, name: '빙수', category: '기타', tempType: 'hot' },
])

const filteredMenu = computed(() => {
  let result = menus.value
  if (props.selectedCity) {
    const type = props.selectedCity.temp >= 25 ? 'hot' : 'cold'
    result = result.filter((m) => m.tempType === type || m.tempType === 'any')
  }
  if (configStore.favoriteCategory !== 'all') {
    result = result.filter((m) => m.category === configStore.favoriteCategory)
  }
  return result
})

const pickedMenu = ref(null)

const randomSelect = () => {
  const list = filteredMenu.value
  if (list.length === 0) return
  let randomIndex = Math.floor(Math.random() * list.length)
  pickedMenu.value = list[randomIndex]
}

const addMenuItem = (newItem) => {
  if (!newItem.name || !newItem.category) return
  menus.value.push({
    id: menus.value.length + 1,
    name: newItem.name,
    category: newItem.category,
    tempType: 'any',
  })
}

const deleteMenuItem = (index) => {
  menus.value.splice(index, 1)
}

watch(
  () => props.selectedCity,
  (newCity) => {
    if (!newCity) return
    const type = newCity.temp >= 25 ? '시원한' : '따뜻한'
    console.log(
      `[watch 감지] 선택된 도시: ${newCity.name}, ${type} 메뉴 ${filteredMenu.value.length}개 추천`,
    )
  },
)
</script>

<template>
  <div class="flex-1">
    <h2 class="mb-5 text-center text-lg font-bold text-zinc-800">🍽️ 메뉴 추천</h2>

    <BaseDashBoardCard>
      <Button label="메뉴 랜덤 뽑기" @click="randomSelect" class="w-full" severity="contrast" />
      <div v-if="pickedMenu" class="mt-4 rounded-lg bg-zinc-50 p-4 text-center">
        <p class="text-lg font-bold text-zinc-800">🎉 {{ pickedMenu.name }}</p>
        <p class="text-xs text-zinc-400">{{ pickedMenu.category }}</p>
      </div>
      <p v-else class="mt-3 text-center text-sm text-zinc-300">버튼을 눌러보세요</p>
    </BaseDashBoardCard>

    <BaseDashBoardCard>
      <AddBar @add-menu="addMenuItem" />
    </BaseDashBoardCard>

    <BaseDashBoardCard>
      <div class="mb-3 flex items-center justify-between">
        <h3 class="text-sm font-semibold text-zinc-700">
          추천 메뉴
          <span class="ml-1 text-xs font-normal text-zinc-400">{{ filteredMenu.length }}개</span>
        </h3>
        <Select
          :model-value="configStore.favoriteCategory"
          @update:model-value="configStore.setFavoriteCategory($event)"
          :options="categories"
          option-label="label"
          option-value="value"
          placeholder="카테고리"
          class="w-28"
          size="small"
        />
      </div>
      <p v-if="filteredMenu.length === 0" class="py-6 text-center text-sm text-zinc-300">
        조건에 맞는 메뉴가 없습니다
      </p>
      <ul class="max-h-80 overflow-y-auto">
        <MenuCard
          v-for="(m, index) in filteredMenu"
          :key="m.id"
          :menu="m"
          :index="index"
          @delete-menu="deleteMenuItem"
        />
      </ul>
    </BaseDashBoardCard>
  </div>
</template>
