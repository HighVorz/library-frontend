<template>
    <div class="admin-container">
      <div class="sidebar">
        <h2>管理菜单</h2>
        <ul>
          <li><button @click="selectedMenu = 'books'">管理书目</button></li>
          <li><button @click="selectedMenu = 'users'">管理用户</button></li>
          <li><button @click="logout">退出系统</button></li>
        </ul>
      </div>
      <div class="content">
        <h1 v-if="selectedMenu === 'books'">书目管理</h1>
        <h1 v-else-if="selectedMenu === 'users'">用户管理</h1>
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
  width: 200px;
  border-right: 1px solid #ccc;
  padding: 20px;
  background-color: #f8f9fa;
  height: 100vh;
  overflow: auto;
}

.sidebar h2 {
  color: #6c757d;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
}

.sidebar button:hover {
  background-color: #0069d9;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.content h1 {
  color: #6c757d;
}
</style>