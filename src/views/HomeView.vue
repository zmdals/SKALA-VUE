<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="home">
    <h1>Practice (실습 코드)</h1>
    <div class="nav-cards">
      <RouterLink to="/practice/basic" class="nav-card">
        <h2>템플릿 문법</h2>
        <p>v-bind, v-if, v-for, v-model 등</p>
      </RouterLink>
      <RouterLink to="/practice/event" class="nav-card">
        <h2>이벤트 & 폼</h2>
        <p>v-on, v-model 수식어, 스타일 바인딩 등</p>
      </RouterLink>
      <RouterLink to="/practice/composition" class="nav-card">
        <h2>Composition API</h2>
        <p>ref, reactive, computed, watch 등</p>
      </RouterLink>
      <RouterLink to="/practice/component" class="nav-card">
        <h2>컴포넌트 생명주기, Props & Emits, Slot 등</h2>
        <p>LifeCycle</p>
      </RouterLink>
    </div>
    <br />
    <h1>Assignments (날씨 앱 과제)</h1>
    <div class="nav-cards">
      <RouterLink to="/assignments" class="nav-card">
        <h2>날씨 앱</h2>
        <p>Weather Mockup, Composition, Component, Router, Pinia + Axios + UI library 등</p>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.home h1 {
  text-align: center;
  margin-bottom: 32px;
}

.nav-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.nav-card {
  display: block;
  padding: 24px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition:
    box-shadow 0.15s,
    transform 0.15s;
}

.nav-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.nav-card h2 {
  margin: 0 0 8px;
  font-size: 18px;
}

.nav-card p {
  margin: 0;
  font-size: 14px;
  color: #888;
}
</style>
