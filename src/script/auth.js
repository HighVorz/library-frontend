import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userInfo: null,
        loggedIn: false,
    }),

    actions: {
        login(userInfo) {
            this.loggedIn = true;
            this.userInfo = userInfo;
        },
        logout() {
            this.loggedIn = false;
            this.userInfo = null;
        },
    }
});