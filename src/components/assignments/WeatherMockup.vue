<script setup>
import { ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 30, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 18, status: '구름' },
  { id: 'city_04', name: '대구', temp: 33, status: '맑음' },
  { id: 'city_05', name: '광주', temp: 7, status: '눈' },
  { id: 'city_06', name: '대전', temp: 14, status: '안개' },
])

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
const inputValue = ref('') //검색 도시 값
const selectedCard = ref('카드를 클릭하거나 검색해 보세요')
const showSelected = (cityName) => {
  selectedCard.value = `${cityName}(가)이 선택되었습니다.`
}
</script>

<template>
  <div class="weather-section">
    <h2>🌦️ 과제 1: 날씨(Mockup)</h2>
    <section class="search-box">
      <input type="text" v-model="inputValue" placeholder="검색할 도시 이름 입력" />
      <p>검색 중인 도시: {{ inputValue }}</p>
    </section>
    <section class="list-box">
      <ul>
        지역별 날씨 현황
        <li class="weather-card" @click="showSelected(w.name)" v-for="w in weatherList" :key="w.id">
          <div class="card-info">
            <h3>{{ w.name }} ({{ w.status }})</h3>
            <h3>현재 기온: {{ w.temp }}℃</h3>
            <!--temp(온도) 조건에 따른 span 출력 변경-->
            <span class="label label-hot" v-if="w.temp >= 30">🔥 더움 (30도 이상)</span>
            <span class="label label-cool" v-else-if="w.temp >= 20">☀️ 선선함 (20~29도 사이)</span>
            <span class="label label-cold" v-else>❄️ 추움 (20도 미만)</span>
          </div>
          <!--이벤트 버블링 막기-->
          <button class="btn-detail" @click.stop="showDetail(w.name, w.status)">상세보기</button>
        </li>
      </ul>
    </section>
    <div class="status-bar">{{ selectedCard }}</div>
  </div>
</template>

<style scoped>
.weather-section {
  max-width: 1000px;
  margin: 20px auto;
  font-family: 'Pretendard', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* 검색 영역 */
.search-box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
}

.search-box h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

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

/* 날씨 카드 리스트 */
.list-box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
}

.list-box h3 {
  margin: 0 0 12px;
  font-size: 15px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

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

.weather-card:hover {
  background: #f0f0f0;
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

/* 라벨 */
.label {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.label-hot {
  background: #ffe0e0;
  color: #d63031;
}
.label-cool {
  background: #32cd32;
  color: white;
}
.label-cold {
  background: #1e90ff;
  color: white;
}

/* 상세보기 버튼 */
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

/* 하단 상태바 */
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
</style>
