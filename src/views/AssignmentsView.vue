<script setup></script>

<template>
  <div>
    <nav class="sub-nav">
      <RouterLink to="/assignments/weather-mockup">1. Mockup</RouterLink>
      <RouterLink to="/assignments/weather-composition">2. Composition</RouterLink>
      <RouterLink to="/assignments/weather-component">3. Component</RouterLink>
      <RouterLink to="/assignments/weather-router">4. Router</RouterLink>
      <RouterLink to="/assignments/weather-final">5. Pinia + Axios + UI Library</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.sub-nav {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.sub-nav a {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 14px;
  color: #555;
  text-decoration: none;
  background: #f5f5f5;
}

.sub-nav a.router-link-active,
.sub-nav a.router-link-exact-active {
  background: #42b883;
  color: #fff;
}
</style>
