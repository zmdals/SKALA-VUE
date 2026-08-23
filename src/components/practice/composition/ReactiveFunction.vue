<script setup>
import { reactive } from 'vue'

const userReactive = reactive({ name: '이순신', age: 30 })
const celebreateReactive = () => {
  userReactive.age++
}
const items = reactive(['사과', '바나나'])
const addItem = () => {
  items.push(`과일 ${items.length + 1}`)
}
const removeItem = (index) => {
  items.splice(index, 1)
}
</script>

<template>
  <div class="practice-section">
    <h1>18. Reactive 함수 활용</h1>
    <h2>반응형 상태 reactive() 특징 및 주의점</h2>
    <p>이름: {{ userReactive.name }} / 나이: {{ userReactive.age }}세</p>
    <button @click="celebreateReactive">reactive 나이 한 살 추가</button>
    <h3>2) 배열(Array) reative</h3>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <button @click="removeItem(index)" style="margin-left: 8px; padding: 2px 6px">삭제</button>
      </li>
    </ul>
    <button @click="addItem">과일 항목 추가</button>
  </div>
</template>
