import { createRouter, createWebHistory } from 'vue-router'


// auth.js
import { useAuthStore } from '@/script/auth'

// view
import Login from '../view/login.vue'
import Books from '../view/books.vue'
import Userspace from '../view/userspace.vue'
import Administer from '../view/administer.vue'
import Book_detail from '../view/book_detail.vue'
import Home from '../view/index.vue'
import User_Management from '../view/user_management.vue';
import Register from '../view/register.vue';
import Search from '../view/search.vue';
import Forget from '../view/forget.vue';
import BookManagement from '../view/book_management.vue';
import Mock from '../view/mock.vue';
import Admin_login from '../view/admin_login.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: 'home',
            component: Home,
            meta: {
                title: '首页',
                requiresAuth: false,
            }
        },
        {
            path: "/login",
            name: 'login',
            component: Login,
            props: true,
            meta: {
                title: '登录',
                requiresAuth: false,
            }
        },
        {
            path: "/admin_login",
            name: 'admin_login',
            component: Admin_login,
            props: true,
            meta: {
                title: '管理员登录',
                requiresAuth: false,
            }
        },
        {
            path: "/register",
            name: 'register',
            component: Register,
            meta: {
                title: '注册',
                requiresAuth: false,
            }
        },
        {
            path: "/detail/:id",
            name: 'detail',
            component: Book_detail,
            meta: {
                title: '详情',
                requiresAuth: false,
            }
        },
        {
            path: "/books",
            name: 'books',
            component: Books,
            props: true,
            meta: {
                title: '书目',
                requiresAuth: false,
            }
        },
        {
            path: "/administer",
            name: 'administer',
            component: Administer,
            meta: {
                title: '后台管理界面',
                requiresAuth: true,
                type: "admin",
            }
        },
        {
            path: "/administer/usercontrol",
            name: 'usercontrol',
            component: User_Management,
            meta: {
                title: '用户管理',
                requiresAuth: true,
                type: "admin",
            }
        },
        {
            path: "/search",
            name: 'search',
            component: Search,
            meta: {
                title: '搜索',
                requiresAuth: false,
            }
        },
        {
            path: "/user",
            name: 'user',
            component: Userspace,
            meta: {
                title: '用户空间',
                requiresAuth: true,
                type: "user",
            }
        },
        {
            path: "/forget",
            name: "forget",
            component: Forget,
            meta: {
                title: '忘记密码',
                requiresAuth: false,
            }
        },
        {
            path: "/manage/book",
            name: "book_manage",
            component: BookManagement,
            meta: {
                title: '图书管理',
                requiresAuth: true,
                type: "admin",
            }
        },
        {
            path: "/mock",
            name: "mock",
            component: Mock,
            meta: {
                title: 'Mock',
                requiresAuth: false
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    // openAuth
    // console.log("openAuth:", auth.openAuth)

    if(!auth.openAuth){
        console.log("open auth ...")
        next()
        return;
    }

    const identity = auth.identity

    // console.log("auth.redirectPath: ", auth.redirectPath)
    // console.log("to: ", to.fullPath)
    // console.log("from: ", from.fullPath)

    // redircet
    if(to.fullPath === '/login' || to.fullPath === '/admin_login') {
        if(auth.redirectPath === to.fullPath){
            auth.redirectPath = '/'
        }
    }
    else if (to.fullPath != auth.redirectPath) {
        auth.redirectPath = to.fullPath
    }

    // admin
    if (to.meta.requiresAuth && to.meta.type !== identity) {


        if (to.meta.type === 'admin') {

            next('/admin_login')
        }

        else if (to.meta.type === 'user') {
            next('/login')
        }
    }
    else {
        next();
    }
})

export default router