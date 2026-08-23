<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

//날씨 기본 배열
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 30, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 18, status: '구름' },
  { id: 'city_04', name: '대구', temp: 33, status: '맑음' },
  { id: 'city_05', name: '광주', temp: 7, status: '눈' },
  { id: 'city_06', name: '대전', temp: 14, status: '안개' },
])

// 카드 선택 날씨 변수
const selectedCity = ref(null)

// searchQuery가 비어있으면 전체 리스트
// 아니면 name에 searchQuery가 포함된 것만 필터
const filteredWeatherList = computed(() => {
  if (searchQuery.value) {
    return weatherList.value.filter((w) => w.name.includes(searchQuery.value))
  } else {
    return weatherList.value
  }
})

// 날씨 상세보기
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

//1. WeatherMockup에서의 변수명 변경
const searchQuery = ref('') // inputValue → searchQuery
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요') // selectedCard → selectedCityInfo

//상태바 문구 업데이트 & 선택 도시 저장
const showSelected = (city) => {
  if (selectedCity.value && selectedCity.value.id === city.id) {
    selectedCity.value = null
    selectedCityInfo.value = '선택이 해제되었습니다.'
  } else {
    selectedCity.value = city
    selectedCityInfo.value = `${city.name}(가)이 선택되었습니다.`
  }
}

// watch() 값 변경 감지 - selectedCityInfo
watch(selectedCityInfo, (newValue) => {
  console.log(`[watch 감지] 상태 바 문구가 업데이트 되었습니다. -> ${newValue}`)
})

// watchEffect() 값 변경 감지 - searchQuery
watchEffect(() => {
  console.log(
    `[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})

/*
개인 데이터
tempType = cold - 추울 때 추천음식, hot - 더울 때 추천음식
음식 메뉴 기본 배열
*/
const menus = ref([
  { id: 1, name: '돈까스', category: '양식', tempType: 'any' },
  { id: 2, name: '김치찌개', category: '한식', tempType: 'cold' },
  { id: 3, name: '쫄면', category: '한식', tempType: 'hot' },
  { id: 4, name: '짜장면', category: '중식', tempType: 'any' },
  { id: 5, name: '초밥', category: '일식', tempType: 'hot' },
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

//선택도시 온도기반 메뉴 필터링,
const filteredMenu = computed(() => {
  if (!selectedCity.value) {
    return menus.value
  } else {
    const type = selectedCity.value.temp >= 25 ? 'hot' : 'cold'
    return menus.value.filter((m) => m.tempType === type || m.tempType === 'any')
  }
})

//선택된 메뉴 저장 변수
const pickedMenu = ref('')

//필터링된 메뉴에서 랜덤 선택
const randomSelect = () => {
  const list = filteredMenu.value
  if (list.length === 0) return
  let randomIndex = Math.floor(Math.random() * list.length)
  pickedMenu.value = list[randomIndex]
}

//메뉴 추가 변수들
const newMenuName = ref('')
const newMenuCategory = ref('')

//메뉴 추가 로직
const addMenuItem = () => {
  //빈 값이면 그냥 return
  if (!newMenuName.value || !newMenuCategory.value) return
  //정상 흐름
  menus.value.push({
    id: menus.value.length + 1,
    name: newMenuName.value,
    category: newMenuCategory.value,
    tempType: 'any',
  })
  newMenuName.value = ''
  newMenuCategory.value = ''
}

//메뉴 삭제 로직
const deleteMenuItem = (index) => {
  menus.value.splice(index, 1)
}

watch(selectedCity, (newCity) => {
  if (!newCity) return
  const type = newCity.temp >= 25 ? '시원한' : '따뜻한'
  console.log(
    `[선택 도시 변경 watch 감지] 선택된 도시: ${newCity.name}, ${type} 메뉴 ${filteredMenu.value.length}개 추천으로 변경되었습니다.`,
  )
})
</script>

<template>
  <div class="main-layout">
    <div class="weather-section">
      <h2>🌦️과제 2: 날씨(컴포지션)</h2>
      <section class="search-box">
        <input type="text" v-model="searchQuery" placeholder="검색할 도시 이름 입력" />
        <p>검색 중인 도시: {{ searchQuery }}</p>
      </section>
      <section class="list-box">
        <ul>
          지역별 날씨 현황
          <li class="weather-card" v-if="filteredWeatherList.length <= 0">검색 결과가 없습니다.</li>
          <li
            class="weather-card"
            :class="{ 'weather-card--selected': selectedCity && selectedCity.id === w.id }"
            @click="showSelected(w)"
            v-for="w in filteredWeatherList"
            :key="w.id"
          >
            <div class="card-info">
              <span class="label">{{ w.name }} ({{ w.status }})</span>
              <span class="label">현재 기온: {{ w.temp }}℃</span>
              <!--temp(온도) 조건에 따른 span 출력 변경-->
              <span class="label label-hot" v-if="w.temp >= 30">🔥 더움 (30도 이상)</span>
              <span class="label label-cool" v-else-if="w.temp >= 20"
                >☀️ 선선함 (20~29도 사이)</span
              >
              <span class="label label-cold" v-else>❄️ 추움 (20도 미만)</span>
            </div>
            <!--이벤트 버블링 막기-->
            <button class="btn-detail" @click.stop="showDetail(w.name, w.status)">상세보기</button>
          </li>
        </ul>
      </section>
      <div class="status-bar">{{ selectedCityInfo }}</div>
    </div>
    <!--본인 데이터-->
    <div class="roulette-section">
      <h2>🎰 과제 2-2 (컴포지션): 날씨정보 기반 랜덤 메뉴 뽑기</h2>
      <!-- 랜덤 뽑기 -->
      <section class="pick-box">
        <button class="btn-pick" @click="randomSelect">메뉴 랜덤 뽑기</button>
        <p class="pick-result" v-if="pickedMenu">
          오늘의 메뉴: <strong>{{ pickedMenu.name }} 🎉 </strong>
        </p>
        <p class="pick-placeholder" v-else>버튼을 눌러보세요!</p>
      </section>
      <!-- 메뉴 추가 -->
      <section class="add-box">
        <h3>메뉴 추가</h3>
        <div class="add-inputs">
          <input type="text" v-model="newMenuName" placeholder="메뉴 이름" />

          <input type="text" v-model="newMenuCategory" placeholder="카테고리" />
          <button class="btn-add" @click="addMenuItem">메뉴 추가</button>
        </div>
      </section>
      <!-- 메뉴 리스트 -->
      <section class="list-box">
        <h3>메뉴 목록: {{ filteredMenu.length }}개</h3>
        <p class="empty-msg" v-if="menus.length < 1">메뉴를 추가해주세요</p>
        <ul class="menu-list">
          <li class="menu-card" v-for="(menu, index) in filteredMenu" :key="menu.id">
            <div class="card-info">
              <span class="menu-name">{{ menu.name }}</span>
              <span class="menu-category">{{ menu.category }}</span>
              <span class="label label-cold" v-if="menu.tempType === 'cold'">❄️ 추울 때</span>
              <span class="label label-any" v-else-if="menu.tempType === 'any'">👍 아무때나</span>
              <span class="label label-hot" v-else>🔥 더울 때</span>
            </div>
            <button class="btn-delete" @click="deleteMenuItem(index)">삭제</button>
          </li>
        </ul>
      </section>
    </div>
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

.weather-section,
.roulette-section {
  flex: 1; /* 1:1 동일 너비 */
  max-width: none; /* 기존 max-width 제거 */
  margin: 0; /* 기존 margin auto 제거 */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* 공통 섹션 박스 */
.search-box,
.pick-box,
.add-box,
.list-box {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
}

/* 검색 영역 */
.search-box input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.search-status {
  margin: 8px 0 0;
  font-size: 13px;
  color: #666;
}

/* 공통 리스트 */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-box h3 {
  margin: 0 0 12px;
  font-size: 15px;
}

/* 날씨 카드 */
.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.15s;
}

.weather-card--selected {
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.15);
}

.weather-card:hover {
  background: #f0f0f0;
}

/* 메뉴 카드 */
.menu-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 8px;
  transition: background 0.15s;
}

.menu-card:hover {
  background: #f0f0f0;
}

/* 카드 내부 */
.card-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-info h4 {
  margin: 0 0 4px;
  font-size: 15px;
}

.card-info p {
  margin: 0 0 8px;
  font-size: 13px;
  color: #555;
}

.menu-name {
  font-weight: 600;
  font-size: 15px;
}

.menu-category {
  font-size: 13px;
  color: #888;
}

/* 라벨 (공통) */
.label {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

/* 온도 라벨 */
.label-hot {
  background: #ffe0e0;
  color: #d63031;
}

.label-cool,
.label-any {
  background: #e0f2e9;
  color: #00b894;
}

.label-cold {
  background: #dfe6f0;
  color: #2d6cdf;
}

/* 버튼 */
.btn-detail {
  background: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-detail:hover {
  background: #e0e0e0;
}

.btn-pick {
  display: block;
  width: 100%;
  padding: 12px;
  background: #6c5ce7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-pick:hover {
  background: #5a4bd1;
}

.btn-add {
  padding: 8px 18px;
  background: #00b894;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-add:hover {
  background: #00a381;
}

.btn-delete {
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 13px;
  color: #999;
  cursor: pointer;
}

.btn-delete:hover {
  background: #ffe0e0;
  color: #d63031;
  border-color: #d63031;
}

/* 메뉴 추가 입력 */
.add-box h3 {
  margin: 0 0 12px;
  font-size: 15px;
}

.add-inputs {
  display: flex;
  gap: 8px;
}

.add-inputs input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

/* 랜덤 뽑기 결과 */
.pick-result {
  text-align: center;
  margin-top: 14px;
  font-size: 18px;
}

.pick-placeholder {
  text-align: center;
  margin-top: 14px;
  color: #999;
}

/* 상태바 / 빈 메시지 */
.status-bar {
  text-align: center;
  padding: 12px;
  margin-top: 16px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  color: #666;
}

.empty-msg {
  text-align: center;
  color: #999;
}

.menu-list {
  max-height: 400px;
  overflow-y: auto;
}
</style>
