import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/practice',
      component: () => import('@/views/PracticeView.vue'),
      children: [
        { path: 'basic', component: () => import('@/views/practice/BasicView.vue') },
        { path: 'event', component: () => import('@/views/practice/EventView.vue') },
        { path: 'composition', component: () => import('@/views/practice/CompositionView.vue') },
        { path: 'component', component: () => import('@/views/practice/ComponentView.vue') },
      ],
    },
    {
      path: '/assignments',
      component: () => import('@/views/AssignmentsView.vue'),
      children: [
        {
          path: 'weather-mockup',
          component: () => import('@/views/assignments/WeatherViewV1.vue'),
        },
        {
          path: 'weather-composition',
          component: () => import('@/views/assignments/WeatherViewV2.vue'),
        },
        {
          path: 'weather-component',
          component: () => import('@/views/assignments/WeatherViewV3.vue'),
        },
        {
          path: 'weather-router',
          component: () => import('@/views/assignments/WeatherViewV4.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/assignments/weather-router/WeatherHomeView.vue'),
            },
            {
              path: 'about',
              component: () => import('@/views/assignments/weather-router/WeatherAboutView.vue'),
            },
            {
              path: 'weather/:cityId',
              component: () => import('@/views/assignments/weather-router/WeatherDetailView.vue'),
            },
            {
              path: 'compare',
              component: () => import('@/views/assignments/weather-router/WeatherCompareView.vue'),
            },
            {
              path: ':pathMatch(.*)*',
              component: () => import('@/views/assignments/weather-router/NotFoundView.vue'),
            },
          ],
        },
        {
          path: 'weather-final',
          component: () => import('@/views/assignments/WeatherViewV5.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/assignments/weather-router/WeatherHomeView.vue'),
            },
            {
              path: 'about',
              component: () => import('@/views/assignments/weather-router/WeatherAboutView.vue'),
            },
            {
              path: 'weather/:cityId',
              component: () => import('@/views/assignments/weather-router/WeatherDetailView.vue'),
            },
            {
              path: 'compare',
              component: () => import('@/views/assignments/weather-router/WeatherCompareView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/assignments/weather-router/NotFoundView.vue'),
    },
  ],
})

export default router
