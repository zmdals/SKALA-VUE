<script setup>
import { ref } from 'vue'

const rawHtmlData =
  '이 글자는 <span style="color:red; font-weight: bold;">빨간색 굵은 글자</span>이다.'

const inputValue = ref('')
const message = ref('')

function showMessage() {
  message.value = inputValue.value
}
</script>

<template>
  <div class="practice-section">
    <h1>3-1. V-HTML</h1>
    <h2>v-html 디렉티브 학습</h2>
    <h3>일반 보간법 {{}} 사용 결과:</h3>
    <p>{{ rawHtmlData }}</p>
    <br />
    <h3>v-html 디렉티브 사용 결과:</h3>
    <p v-html="rawHtmlData"></p>
  </div>

  <div class="practice-section">
    <h1>3-2. V-HTML - Cross-Site Scripting 위험</h1>
    <h2>v-html XSS 학습</h2>
    <input v-model="inputValue" placeholder="내용을 입력하세요" />
    <button @click="showMessage">확인</button>
    <div v-html="message"></div>
  </div>
</template>
