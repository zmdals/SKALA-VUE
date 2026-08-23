import { defineStore } from 'pinia'
export const useConfigStore = defineStore('config', {
  state: () => ({
    unit: 'celsius', //초기값
    favoriteCategory: 'all',
  }),

  getters: {
    unitSymbol: (state) => (state.unit === 'celsius' ? '℃' : '℉'),
    categorylabel: (state) => (state.favoriteCategory === 'all' ? '전체' : state.favoriteCategory),
  },

  actions: {
    toggleUnit() {
      if (this.unit === 'celsius') this.unit = 'fahrenheit'
      else this.unit = 'celsius'
    },
    setFavoriteCategory(category) {
      console.log(category)
      this.favoriteCategory = category
    },
  },
})
