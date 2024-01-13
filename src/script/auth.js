import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userInfo: null,
        loggedIn: false,
        token: null,
        identity: null,
    }),

    actions: {
        login(userInfo, token, type) {
            this.loggedIn = true
            this.userInfo = userInfo
            this.token = token

            if(type === 'admin'){
                this.identity = 'admin'
            }

            if(type === 'user'){
                this.identity = 'user'
            }
        },
        logout() {
            this.loggedIn = false
            this.userInfo = null
            this.identity = null
        },
    },
    
    persist: true
});

