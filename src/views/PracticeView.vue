<template>
  <div>
    <nav class="sub-nav">
      <RouterLink to="/practice/basic">기본 템플릿 문법</RouterLink>
      <RouterLink to="/practice/event">이벤트 & 폼</RouterLink>
      <RouterLink to="/practice/composition">컴포지션 API</RouterLink>
      <RouterLink to="/practice/component">컴포넌트</RouterLink>
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

.sub-nav a.router-link-exact-active {
  background: #42b883;
  color: #fff;
}
</style>
