import {createRouter, createWebHistory} from 'vue-router'

import Login from '../view/login.vue'
import Books from '../view/books.vue'
import Userspace from '../view/userspace.vue'
import Administer from '../view/administer.vue'
import Book_detail from '../view/book_detail.vue'
import Home from '../view/index.vue'
import User_Management from '../view/user_management.vue';
import Register from '../view/register.vue';

const Router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: Home,
            component: Home,
            meta:{
                title: '首页'
            }
        },
        {
            path: "/login",
            name: Login,
            component: Login,
            props: true,
            meta:{
                title: '登录'
            }
        },
        {
            path: "/register",
            name: Register,
            component: Register,
            meta:{
                title: '注册'
            }
        },
        {
            path: "/detail",
            name: Book_detail,
            component: Book_detail,
            meta:{
                title: '详情'
            }
        },
        {
            path: "/books",
            name: Books,
            component: Books,
            props: true,
            meta:{
                title: '书目'
            }
        },
        {
            path: "/administer",
            name: Administer,
            component: Administer,
            meta:{
                title: '后台管理界面'
            }
        },
        {
            path: "/administer/usercontrol",
            name: User_Management,
            component: User_Management,
            meta:{
                title: '用户管理'
            }
        },
        {
            path: "/user",
            name: Userspace,
            component: Userspace,
            meta:{
                title: '用户空间'
            }
        },
    ]
})

export default Router