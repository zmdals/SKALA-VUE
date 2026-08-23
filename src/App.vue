<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/"><img alt="Vue logo" class="logo" src="@/assets/logo.svg" /></RouterLink>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/practice">Practice</RouterLink>
      <RouterLink to="/assignments">Assignments</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  z-index: 100;
}

.logo {
  height: 30px;
  width: auto;
}

nav {
  display: flex;
  gap: 8px;
}

nav a {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 14px;
  color: #555;
  text-decoration: none;
  transition: background 0.15s;
}

nav a:hover {
  background: #f0f0f0;
}

nav a.router-link-exact-active {
  color: #42b883;
  font-weight: 600;
}

main {
  padding-top: 72px;
  max-width: 1920px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}
</style>
