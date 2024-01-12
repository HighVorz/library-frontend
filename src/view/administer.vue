<template>
    <div class="admin-container">
        <div class="sidebar">
            <h2><i class="fas fa-user-tie"></i> 图书管理员</h2>
            <ul>
                <li><button :class="{ selected: selectedMenu === 'books' }" @click="selectedMenu = 'books'"><i
                            class="fas fa-book"></i> 管理书目</button></li>
                <li><button :class="{ selected: selectedMenu === 'users' }" @click="selectedMenu = 'users'"><i
                            class="fas fa-users"></i> 管理用户</button></li>
                <li><button :class="{ selected: selectedMenu === 'exit' }" class="exit-btn" @click="selectedMenu = 'exit'"><i
                            class="fas fa-sign-out-alt"></i> 退出系统</button></li>
            </ul>
        </div>
        <div class="content">
            <h1 v-if="selectedMenu === 'books'">书目管理</h1>
            <h1 v-else-if="selectedMenu === 'users'">用户管理</h1>
            <h1 v-else-if="selectedMenu === 'exit'">退出系统</h1>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';


const selectedMenu = ref('');

function logout() {
    // 在这里添加退出系统的代码
    console.log('退出系统');
}
</script>
  
<style scoped>
.admin-container {
    display: flex;
    font-family: Arial, sans-serif;
}

.sidebar {
    width: 240px;
    border-right: 1px solid #ccc;
    padding: 20px 0 20px 0;
    background-color: #007bff;
    height: 100vh;
    overflow: auto;
}

.sidebar button.selected {
    background-color: #6a0dad;
    font-size: 20px;
}

.sidebar h2 {
    text-align: center;
    color: #d6dde3;
    margin-bottom: 20px;
}

.sidebar ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
}

/* .sidebar li {
    margin-bottom: 10px;
} */

.sidebar button {
    width: 100%;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition-duration: 0.4s;
}

.sidebar>ul>li>.exit-btn {
    background-color: #dc3545;
}

.sidebar>ul>li>.exit-btn:hover {
    background-color: #9a1825;
}

.sidebar>ul>li>.exit-btn.selected {
    background-color: #9a1825;
}
.sidebar button:hover {
    background-color: #0069d9;
    font-size: 20px;
}

.content {
    flex-grow: 1;
    padding: 20px;
}

.content h1 {
    color: #6c757d;
}</style>