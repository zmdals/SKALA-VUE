<script setup>
import { ref } from 'vue'
import MemberCard from './MemberCard.vue'

const members = ref([
  { id: 1, name: '김철수', level: 3 },
  { id: 2, name: '이영희', level: 5 },
  { id: 3, name: '박민수', level: 1 },
])

const levelUp = (id) => {
  const member = members.value.find((m) => m.id === id)
  member.level++
}
</script>

<template>
  <div class="practice-section">
    <h1>27. Props & Emits 연습</h1>
    <h2></h2>
    <ul>
      <li v-for="member in members" :key="member.id">
        <MemberCard :member="member" @update-request="levelUp" />
      </li>
    </ul>
  </div>
</template>
