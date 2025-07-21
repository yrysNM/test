import { defineStore } from 'pinia'

export const useCommonStore = defineStore('token', {
  state: () => ({ token: '', serviceBaseUrl: null }),
  getters: {
    getToken: (state) => state.token,
    getServiceBaseUrl: (state) => state.serviceBaseUrl,
  },
  actions: {
    setToken(tokenValue) {
      this.token = tokenValue
    },
    setServiceBaseUrl(urlValue) {
      this.serviceBaseUrl = urlValue
    },
  },
})
