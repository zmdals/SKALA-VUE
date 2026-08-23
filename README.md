# README

# Vue.js 기반 날씨 대시보드 앱

Vue 3 기반 기상 관측 + 점심 메뉴 추천 웹 애플리케이션.
SKALA 부트캠프 Vue.js 커리큘럼 과제를 단계별로 진행하며, 각 단계의 학습 과정을 그대로 보존한 프로젝트입니다.

전체 페이지는 실습 과정도 포함 되어있습니다.

## 배포 URL

- 전체 페이지: [https://skala-vue-kappa-seven.vercel.app/](https://skala-vue-kappa-seven.vercel.app/)
- 날씨 앱 (최종): [https://skala-vue-kappa-seven.vercel.app/assignments/weather-final](https://skala-vue-kappa-seven.vercel.app/assignments/weather-final)

---

## 프로젝트 설명

과제 1~5단계를 순서대로 진행하면서, 이전 단계의 코드를 별도 View로 보존했습니다.
각 단계별 결과물을 독립적으로 확인할 수 있도록 라우팅을 분리했고, 
3단계(Component 분리) 이후부터는 분리된 컴포넌트를 공유하여 이후 단계에서 재사용하는 구조입니다.

```
1. Mockup       → WeatherViewV1 (독립)
2. Composition  → WeatherViewV2 (독립)
3. Component    → WeatherViewV3 (컴포넌트 분리 — 이후 단계에서 공유)
4. Router       → WeatherViewV4 (V3의 컴포넌트 재사용 + 라우터 추가)
5. Pinia+Axios+UI → WeatherViewV5 (V4 기반 + Store/API/UI Library 적용)
```

---

## 주요 기능

**날씨 대시보드**
- OpenWeatherMap API로 6개 도시(서울, 시카고, LA, 파리, 도쿄, 오슬로) 실시간 날씨
- 도시 검색
- 도시 선택/해제 토글
- 섭씨/화씨 단위 변환

**상세 기상 정보**
- 도시별 상세 날씨 (기온, 습도, 풍속 - OpenWeatherMap API)
- 5일 예보 (OpenWeatherMap Forecast API)
- UV 지수, 일출/일몰 (Open-Meteo API)

**점심 메뉴 추천**
- 선택 도시 기온 기반 메뉴 필터링 (더운 날 → 시원한 메뉴, 추운 날 → 따뜻한 메뉴)
- 카테고리별 이중 필터링 (한식, 중식, 양식, 일식, 기타)
- 랜덤 메뉴 뽑기
- 메뉴 추가/삭제 (추가 시 tempType은 기본값 “아무때나”로 등록)

**모든 도시 상세 날씨 비교**
- Table로 전 도시 기온, 습도, 풍속 비교

---

## 과제 요구사항 외 추가 구현

| 항목 | 설명 |
| --- | --- |
| 날씨 기반 메뉴 추천 | 도시 기온에 따라 tempType(hot/cold/any)으로 메뉴 자동 필터링 |
| 카테고리 이중 필터 | 날씨 필터 + 카테고리 필터를 computed 하나에서 체이닝 |
| 도시 선택/해제 토글 | 같은 카드 재클릭 시 선택 해제 |
| 한글 조사 자동 처리 | 유니코드 받침 판별로 “이/가” 자동 분기 |
| 도시 비교 페이지 | PrimeVue DataTable로 모든 도시 데이터 비교 페이지 |
| 도시명 한글 매핑 | utils/mappingTable.js로 영문 API 응답을 한글 변환 |
| 날씨 아이콘 표시 | OpenWeatherMap icon API로 각 도시 날씨 아이콘 렌더링 |
| 선택 도시 하이라이트 | 동적 클래스 바인딩으로 선택된 카드 시각적 강조 |
| 상세보기 동작 분리 | emit 체이닝으로 같은 컴포넌트가 V3에서는 alert, V4에서는 router.push 실행 |
| 메뉴 추가 validation | 빈 값 입력 시 추가 방지 + 추가 후 input 자동 초기화 |

---

## 프로젝트 구조 (날씨 앱 부분)

```
src/
├── views/
│   ├── HomeView.vue                       # 메인 홈 (nav 카드)
│   ├── PracticeView.vue                   # 실습 레이아웃
│   └── assignments/
│       ├── AssignmentsView.vue            # 과제 레이아웃 (서브 nav)
│       ├── WeatherViewV1.vue              # 과제 1: Mockup
│       ├── WeatherViewV2.vue              # 과제 2: Composition
│       ├── WeatherViewV3.vue              # 과제 3: Component
│       ├── WeatherViewV4.vue              # 과제 4: Router
│       ├── WeatherViewV5.vue              # 과제 5: Pinia+Axios+UI (최종)
│       └── weather-router/
│           ├── WeatherHomeView.vue        # 메인 대시보드
│           ├── WeatherDetailView.vue      # 도시 상세 (동적 라우트)
│           ├── WeatherCompareView.vue     # 도시 비교
│           ├── WeatherAboutView.vue       # 서비스 소개
│           └── NotFoundView.vue           # 404 페이지
├── components/
│   └── assignments/
│       ├── weather-component/             # 과제 3~5 공유
│       │   ├── WeatherParent.vue
│       │   ├── WeatherCard.vue
│       │   └── SearchBar.vue
│       ├── roulette-component/            # 과제 3~5 공유
│       │   ├── RouletteParent.vue
│       │   ├── MenuCard.vue
│       │   └── AddBar.vue
│       └── common/
│           ├── BaseDashBoardCard.vue      # 공통 카드 (slot)
│           └── UnitToggler.vue
│           └── CategorySelector.vue
├── stores/
│   └── configStore.js                     # 단위 + 카테고리 상태
├── utils/
│   └── mappingTable.js                    # 도시명/국가 매핑
└── router/
    └── index.js
```

---

## 과제 단계별 진행

| 단계 | 주제 | 핵심 내용 |
| --- | --- | --- |
| 1 | Vue Syntax | v-for, v-if, v-model, @click, v-show로 Weather Mockup 구현 |
| 2 | Composition API | ref, computed, watch, watchEffect 적용, 메뉴 추천 기능 추가 |
| 3 | Component 분리 | props/emits, slot 기반 컴포넌트 분리 (이후 단계에서 재사용) |
| 4 | Vue Router | 중첩/동적 라우트, Catch-all, programmatic navigation |
| 5 | Pinia + Axios + UI | configStore, OpenWeatherMap / Open-Meteo API 연동, PrimeVue + Tailwind |

---

## 트러블슈팅

**REST Countries API CORS 에러**
국가 정보 API를 프론트에서 직접 호출 시 CORS 정책에 의해 차단.
Vite 프록시 설정으로도 리다이렉트 문제가 해결되지 않아, Open-Meteo API로 대체하여 UV 지수/일출/일몰 정보를 제공하는 방향으로 변경.

**Vite HMR 캐시 미반영**`:value` → `v-model` 등 바인딩 타입을 변경했을 때 HMR이 변경사항을 반영하지 못하는 경우 발생.
개발 서버 재시작(`Ctrl+C` → `npm run dev`)으로 해결.

**props에 .value 접근 에러**
부모에서 props로 받은 값에 `.value`를 붙여 접근하면 `Unexpected mutation of prop` 에러 발생.
props는 ref가 아니므로 `.value` 없이 직접 접근하고, 수정이 필요하면 emit으로 부모에게 요청.

**select option 값 타입 불일치**`<option value="0">`은 문자열 "0"이 전달되어 `===` 비교에서 숫자 0과 불일치.
`:value="0"`으로 v-bind 바인딩하여 JavaScript 숫자 타입 그대로 전달하도록 수정.
현재는 메뉴의 spicy 필드를 삭제해서 삭제된 부분.

**onMounted에 함수 두 개 전달 시 두 번째 무시**`onMounted(fetchDetail, fetchForecast)` 형태로 전달하면 두 번째 함수가 실행되지 않음.
`onMounted(async () => { await fetchDetail(); await fetchForecast() })`로 하나의 async 함수로 묶어 순차 호출.

**splice에 id와 index 혼동**`splice(menu.id, 1)`로 삭제 시 id 값이 배열 인덱스와 불일치하여 잘못된 항목 삭제.
v-for에서 `(item, index)`로 index를 받아 `splice(index, 1)` 사용으로 수정.

---

## API

- [OpenWeatherMap](https://openweathermap.org/api) — 현재 날씨, 5일 예보
- [Open-Meteo](https://open-meteo.com/) — UV 지수, 일출/일몰