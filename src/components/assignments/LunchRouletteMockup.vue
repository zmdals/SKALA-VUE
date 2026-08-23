<script setup>
import { ref } from 'vue'
const menus = ref([
  { id: 1, name: '돈까스', spicy: 0, category: '양식', tempType: 'any' },
  { id: 2, name: '김치찌개', spicy: 2, category: '한식', tempType: 'cold' },
  { id: 3, name: '쫄면', spicy: 2, category: '한식', tempType: 'hot' },
  { id: 4, name: '짜장면', spicy: 0, category: '중식', tempType: 'any' },
  { id: 5, name: '초밥', spicy: 0, category: '일식', tempType: 'hot' },
  { id: 6, name: '짬뽕', spicy: 2, category: '중식', tempType: 'cold' },
  { id: 7, name: '카레', spicy: 1, category: '양식', tempType: 'cold' },
  { id: 8, name: '떡볶이', spicy: 2, category: '한식', tempType: 'any' },
  { id: 9, name: '우동', spicy: 0, category: '일식', tempType: 'cold' },
  { id: 10, name: '마라탕', spicy: 2, category: '중식', tempType: 'cold' },
  { id: 11, name: '부대찌개', spicy: 1, category: '한식', tempType: 'cold' },
  { id: 12, name: '파스타', spicy: 0, category: '양식', tempType: 'any' },
  { id: 13, name: '냉면', spicy: 1, category: '한식', tempType: 'hot' },
  { id: 14, name: '콩국수', spicy: 0, category: '한식', tempType: 'hot' },
  { id: 15, name: '빙수', spicy: 0, category: '기타', tempType: 'hot' },
])

const pickedMenu = ref('')

const randomSelect = () => {
  let randomIndex = Math.floor(Math.random() * menus.value.length)
  pickedMenu.value = menus.value[randomIndex]
}

const newMenuName = ref('')
const newMenuSpicy = ref(0)
const newMenuCategory = ref('')
const addMenuItem = () => {
  //빈 값이면 그냥 return
  if (!newMenuName.value || !newMenuCategory.value) return
  //정상 흐름
  menus.value.push({
    id: menus.value.length + 1,
    name: newMenuName.value,
    spicy: newMenuSpicy.value,
    category: newMenuCategory.value,
  })
  newMenuName.value = ''
  newMenuSpicy.value = 0
  newMenuCategory.value = ''
}

const deleteMenuItem = (index) => {
  menus.value.splice(index, 1)
}
</script>

<template>
  <div class="roulette-section">
    <h2>🎰 과제 1-2 (본인 데이터 추가): 랜덤 메뉴 뽑기</h2>
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
        <select v-model="newMenuSpicy">
          <option :value="0">안 매움</option>
          <option :value="1">중간 맵기</option>
          <option :value="2">아주 매움</option>
        </select>
        <input type="text" v-model="newMenuCategory" placeholder="카테고리" />
        <button class="btn-add" @click="addMenuItem">메뉴 추가</button>
      </div>
    </section>
    <!-- 메뉴 리스트 -->
    <section class="list-box">
      <h3>메뉴 목록: {{ menus.length }}개</h3>
      <p class="empty-msg" v-if="menus.length < 1">메뉴를 추가해주세요</p>
      <ul class="menu-list">
        <li class="menu-card" v-for="(menu, index) in menus" :key="menu.id">
          <div class="card-info">
            <span class="menu-name">{{ menu.name }}</span>
            <span class="label label-hot" v-if="menu.spicy === 2">🥵 아주 매움</span>
            <span class="label label-mid" v-else-if="menu.spicy === 1">🙁 중간 맵기</span>
            <span class="label label-mild" v-else>😄 안 매움</span>
            <span class="menu-category">{{ menu.category }}</span>
          </div>
          <button class="btn-delete" @click="deleteMenuItem(index)">삭제</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.roulette-section {
  max-width: 1024px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* 공통 섹션 박스 */
.pick-box,
.add-box,
.list-box {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
}

/* 랜덤 뽑기 */
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

/* 메뉴 추가 */
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

/* 메뉴 리스트 */
.list-box h3 {
  margin: 0 0 12px;
  font-size: 15px;
}

.empty-msg {
  text-align: center;
  color: #999;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

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

.card-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-name {
  font-weight: 600;
  font-size: 15px;
}

.menu-category {
  font-size: 13px;
  color: #888;
}

/* 라벨 */
.label {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.label-hot {
  background: #ffe0e0;
  color: #d63031;
}

.label-mid {
  background: #fff3e0;
  color: #e17055;
}

.label-mild {
  background: #e0f2e9;
  color: #00b894;
}

/* 삭제 버튼 */
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
</style>
