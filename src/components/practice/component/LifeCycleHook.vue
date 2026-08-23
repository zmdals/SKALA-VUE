<script setup>
import { ref } from 'vue'
import TimerChild from './TimerChild.vue'

const showChild = ref(true)

// 생성 - create
console.log('1. [setup] 컴포넌트가 메모리에 생성되었습니다. (DOM 접근 불가능)')
</script>

<template>
  <div class="practice-section">
    <h1>25. 컴포넌트 생명주기</h1>
    <h2>LifeCycle Hook</h2>
    <button @click="showChild = false">실습 컴포넌트 파괴하기 (v-if = "false")</button>
    <TimerChild v-if="showChild" />
  </div>
</template>
