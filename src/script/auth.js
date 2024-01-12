import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userInfo: null,
        loggedIn: false,
        token: null,
    }),

    actions: {
        login(userInfo, token) {
            this.loggedIn = true
            this.userInfo = userInfo
            this.token = token
        },
        logout() {
            this.loggedIn = false
            this.userInfo = null
        },
    },
    
    persist: true
});

