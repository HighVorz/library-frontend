<template>
    <button @click="click_users">Api users</button>
    <button @click="click_borrowlist">Api borrowlist</button>
</template>

<script setup>
import {inject} from "vue"
const http = inject('$http')

function click_users(){
    http.get('/api/users')
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

function click_borrowlist(){
    http.post('api/borrowlist', {uid: 1})
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}


</script>