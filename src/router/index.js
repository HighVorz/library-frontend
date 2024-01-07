import { createRouter, createWebHistory } from 'vue-router'

import Login from '../view/login.vue'
import Books from '../view/books.vue'
import Userspace from '../view/userspace.vue'
import Administer from '../view/administer.vue'
import Book_detail from '../view/book_detail.vue'
import Home from '../view/index.vue'
import User_Management from '../view/user_management.vue';
import Register from '../view/register.vue';
import Search from '../view/search.vue'

const Router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: 'home',
            component: Home,
            meta: {
                title: '首页'
            }
        },
        {
            path: "/login",
            name: 'login',
            component: Login,
            props: true,
            meta: {
                title: '登录'
            }
        },
        {
            path: "/register",
            name: 'register',
            component: Register,
            meta: {
                title: '注册'
            }
        },
        {
            path: "/detail/:id",
            name: 'detail',
            component: Book_detail,
            meta: {
                title: '详情'
            }
        },
        {
            path: "/books",
            name: 'books',
            component: Books,
            props: true,
            meta: {
                title: '书目'
            }
        },
        {
            path: "/administer",
            name: 'administer',
            component: Administer,
            meta: {
                title: '后台管理界面'
            }
        },
        {
            path: "/administer/usercontrol",
            name: 'usercontrol',
            component: User_Management,
            meta: {
                title: '用户管理'
            }
        },
        {
            path: "/search",
            name: 'search',
            component: Search,
            meta: {
                title: '搜索'
            }
        },
        {
            path: "/user",
            name: 'user',
            component: Userspace,
            meta: {
                title: '用户空间'
            }
        },
    ]
})

export default Router