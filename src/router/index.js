import {createRouter, createWebHistory} from 'vue-router'

import Login from '../view/login.vue'
import Books from '../view/books.vue'
import Userspace from '../view/userspace.vue'
import Administer from '../view/administer.vue'
import Book_detail from '../view/book_detail.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            name: Login,
            component: Login
        },

    ]
})

export default router