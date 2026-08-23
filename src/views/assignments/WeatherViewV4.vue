<template>
  <div>
    <h2>🌤️ 과제 4: 라우터 적용</h2>
    <nav>
      <RouterLink to="/assignments/weather-router">날씨 대시보드</RouterLink>
      <RouterLink to="/assignments/weather-router/compare">상세 날씨 비교</RouterLink>
      <RouterLink to="/assignments/weather-router/about">서비스 소개</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
