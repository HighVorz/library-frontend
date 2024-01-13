<template>
    <h1>Api</h1>

    <h3>link</h3>
    <td>

        <a href="/administer" style="display: block;">administer</a>
        <a href="/user" style="display: block;">userspace</a>
        <a href="/search" style="display: block;">search</a>
       
    </td>



    <button @click="openAuth">openAuth</button>
    <button @click="closeAuth">closeAuth</button>

    <h3></h3>
    <button @click="click_users">Api users</button>
    <button @click="click_borrowlist">borrowlist</button>

    <h3>administer</h3>
    <button @click="to_admin_login">need login first</button>
    <button @click="getBorrowBookList">getBorrowBookList</button>
    <button @click="updataBorrowBookList">Api updataBorrowBookList</button>
    <button @click="deleteBorrowBookList">deleteBorrowBookList</button>
</template>

<script setup>
import { inject } from "vue"
import { useAuthStore } from "../script/auth.js"

const auth = useAuthStore();
const http = inject('$http')
const router = inject('$router')

function to_admin_login() {
    router.push('/admin_login')
}

function click_users() {
    http.get('/api/users')
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

function click_borrowlist() {
    http.post('api/borrowlist', { uid: 1 })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

// administer.vue
// 🚩
function getBorrowBookList() {

}

// 🚩
function updataBorrowBookList() {

}

// 🚩
function deleteBorrowBookList() {

}


function openAuth() {
    auth.openAuth = true;
}
function closeAuth() {
    auth.openAuth = false;
}


</script>