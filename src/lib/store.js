import { defineStore } from 'pinia'

export const useToken = defineStore('token', {
  state: () => ({ token: '' }),
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    setToken(tokenValue) {
      this.token = tokenValue
    },
  },
})
