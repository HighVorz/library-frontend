<template>
    <button @click="click_users">Api users</button>
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
</script>