import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App) //엡 인스턴스 등록

app.use(createPinia()) // Pinia 등록 (≈ @ComponentScan으로 Service 등록)
app.use(router) // 라우터 등록 (≈ @EnableWebMvc)

//UI 라이브러리 등록
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.mount('#app') // DOM에 부착 (≈ run → 서버 시작) index.html <div id =app>  </div> 안이 <template>로 대체
