import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    login(userData) {
      this.user = {
        id: userData.id,
        username: userData.username,
        token: userData.token,
        role: userData.role,
      }
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    isLoggedIn() {
      return this.user !== null
    },
    isAdmin() {
      return this.user && this.user.role === 'admin'
    },
  },
})