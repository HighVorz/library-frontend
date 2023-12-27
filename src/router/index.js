import {createRouter, createWebHistory} from 'vue-router'

import Login from '../view/login.vue'
import Books from '../view/books.vue'
import Userspace from '../view/userspace.vue'
import Administer from '../view/administer.vue'
import Book_detail from '../view/book_detail.vue'
import Home from '../view/index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: Home,
            component: Home
        },
        {
            path: "/login",
            name: Login,
            component: Login
        },
        {
            path: "/detail",
            name: Book_detail,
            component: Book_detail
        },
        {
            path: "/books",
            name: Books,
            component: Books
        },
        {
            path: "/administer",
            name: Administer,
            component: Administer
        },
        {
            path: "/user",
            name: Userspace,
            component: Userspace
        },
    ]
})

export default router