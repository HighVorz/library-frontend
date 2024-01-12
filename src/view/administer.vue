<template>
    <div class="admin-container">
        <div class="sidebar">
            <h2><i class="fas fa-user-tie"></i> 图书管理员</h2>
            <ul>
                <li><button :class="{ selected: selectedMenu === 'books' }" @click="selectedMenu = 'books'"><i
                            class="fas fa-book"></i> 管理书目</button></li>
                <li><button :class="{ selected: selectedMenu === 'users' }" @click="selectedMenu = 'users'"><i
                            class="fas fa-users"></i> 管理用户</button></li>
                <li><button :class="{ selected: selectedMenu === 'exit' }" class="exit-btn"
                        @click="selectedMenu = 'exit'"><i class="fas fa-sign-out-alt"></i> 退出系统</button></li>
            </ul>
        </div>
        <div class="content">
            <h1 v-if="selectedMenu === 'books'">书目管理</h1>
            <!-- 弹窗1-1 -->
            <div v-if="showModel" class="Model">
                <div class="search-container">
                    <form class="search-form">
                        <p>用户搜索</p>
                        <div class="form-group">
                            <label for="name">用户名:</label>
                            <input type="text" id="name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="au">借书名:</label>
                            <input type="text" id="au" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="bknum">借书数量:</label>
                            <input type="number" id="bknum" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="time">借书时间:</label>
                            <input type="date" id="time" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="ret">还书时间:</label>
                            <input type="date" id="ret" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="mail">用户邮箱:</label>
                            <input type="email" id="mail" class="form-control">
                        </div>
                        <div class="form-group">
                            <button class="searchbk">查找</button>
                            <button @click="showModel = false" class="quit">关闭</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- 弹窗1-2 -->
            <div v-if="showModel2" class="Model">
                <div class="search-container">
                    <form class="search-form2" @submit.prevent="">
                        <p>修改信息</p>
                        <div class="form-group">
                            <label for="name">用户名:</label>
                            <input type="text" id="name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="au">用户借书:</label>
                            <input type="text" id="au" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="bknum">借书数量:</label>
                            <input type="number" id="bknum" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="time">借书时间:</label>
                            <input type="date" id="time" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="ret">还书时间:</label>
                            <input type="date" id="ret" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="mail">用户邮箱:</label>
                            <input type="email" id="mail" class="form-control">
                        </div>
                        <!-- 其实也能放入图片 -->
                        <div class="form-group">
                            <button class="addbk" @click="showAlertmodify">修改</button>
                            <button @click="showModel2 = false" class="quit">关闭</button>
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="selectedMenu === 'books'">
                <div class="container">
                    <button class="search-button" @click="showModel = true"><i class="fas fa-search"></i> 搜索一下</button>

                    <table>
                        <tr style="font-weight: bold;background-color: rgba(103, 57, 202, 0.5);">
                            <td>用户名</td>
                            <td>用户借书</td>
                            <td>借书数量</td>
                            <td>借书时间</td>
                            <td>还书时间</td>
                            <td>用户邮箱</td>
                            <td>操作:修改 / 删除</td>
                        </tr>
                        <tr v-for="item in paginatedData">
                            <td>{{ item.userName }}</td>
                            <td>《{{ item.userBorrow }}》</td>
                            <td>{{ item.borrowNum }}</td>
                            <td>{{ item.userBorrowtime }}</td>
                            <td>{{ item.userReturntime }}</td>
                            <td>{{ item.userMail }}</td>
                            <td>
                                <form action="" @submit="handleSubmit">
                                    <button class="act addin" @click="showModel2 = true">修改</button>&nbsp&nbsp&nbsp<button
                                        class="act del" @click="deleteItem(item)">删除</button>
                                </form>
                            </td>
                        </tr>
                    </table>
                    <el-pagination class="pagination-container" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                        layout="prev, pager, next" :total="userTotal.length">
                    </el-pagination>
                </div>
            </div>
            <h1 v-else-if="selectedMenu === 'users'">用户管理</h1>
            <h1 v-else-if="selectedMenu === 'exit'">退出系统</h1>
        </div>
    </div>
</template>
  
<script setup>
import { ElPagination } from 'element-plus';
import { ref, inject } from 'vue'

const router = inject('$router')

// data
const userTotal = ref([])
const selectedMenu = ref('books')
const showModel = ref(false)
const showModel2 = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const paginatedData = ref([])
function handleSizeChange(val) {
    pageSize, value = val;
    updatePaginatedData();  // 更新数据的方法，需要你自己实现
};

function handleCurrentChange(val) {
    currentPage.value = val;
    updatePaginatedData();  // 更新数据的方法，需要你自己实现
};

function updatePaginatedData() {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    paginatedData.value = userTotal.value.slice(start, end);
};

function showAlertmodify() {
    alert('修改成功');
    showModel2.value = false;
};

function handleSubmit(event) {
    event.preventDefault();
    // 删除操作...
};// 到时候记得删掉，只是为了测试删除

function handleReturn() {
    router.push('/manage/book')
};
function handleLogout() {
    router.push('/login')
};
function deleteItem(item) {
    alert('删除成功');
    const index = userTotal.value.indexOf(item);
    console.log(index);
    if (index !== -1) {
        userTotal.value.splice(index, 1);
    }
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
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    color: #ccc;
}


.header {
    background: url('/assets/img/lib_admin.jpg') center/cover no-repeat;
    color: rgb(237, 237, 217);
    padding: 15px;
    text-align: center;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}

.container::before {
    content: "";
    background: url('/assets/img/master2.jpg') center/cover no-repeat;
    opacity: 0.5;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
}

.search-button {
    margin: 20px 0px 20px 0px;
    padding: 10px 20px;
    font-size: 16px;
    width: 13%;
    position: relative;
    left: 85%;
    color: rgb(0, 0, 0);
    background-color: rgba(0, 123, 255, 0.7);
    border: none;
    border-radius: 15px;
    transition: background-color 0.3s ease;
    transition: font-weight 0.3s ease;
}

.search-button:hover {
    background-color: rgba(0, 123, 255, 1);
    animation: bounce 0.3s forwards;
    font-weight: bold;
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-5px);
    }
}

table {
    border-collapse: separate;
    border-spacing: 5;
    border: 1px solid #000000;
    width: 100%;
    font-family: Arial, sans-serif;
}

td {
    padding: 10px;
}

tr:nth-child(even) {
    background-color: rgba(242, 243, 234, 0.5);
}

tr:hover {
    background-color: rgba(221, 221, 221, 0.8);
}

hr {
    border: 3px solid #ddd;
    margin: 0;

}

.act {
    padding: 5px 10px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.addin {
    color: white;
    background-color: rgba(97, 40, 167, 0.7);
}

.addin:hover {
    animation: bounce 0.3s forwards;
    background-color: rgba(97, 40, 167, 1);
}

.del {
    color: white;
    background-color: rgba(220, 53, 69, 0.7);
}

.del:hover {
    animation: bounce 0.3s forwards;
    background-color: rgba(220, 53, 69, 1);
}

.Model {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}


.search-container {
    width: 100%;
    margin: auto;
    border: none;
    margin-top: 10%;
}

.search-form,
.search-form2 {
    width: 30%;
    margin: auto;
    background-color: #fefefe;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 20px;
}

.search-form p,
.search-form2 p {
    position: relative;
    text-align: center;
    font-size: 32px;
    color: #0056b3;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
}

.search-form p::before,
.search-form2 p::before {
    position: absolute;
    content: "";
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 4px;
    background-color: #0276ea;
}

.search-form2 p {
    color: rgb(114, 69, 170);
}

.search-form2 p::before {
    background-color: rgb(114, 69, 170);
}

.form-group {
    align-items: center;
    margin-bottom: 10px;
}

.form-group label {
    display: inline-block;
    width: 80px;
    cursor: url('/assets/img/alternate.ico'), auto;
    font-size: 16px;
    font-weight: bold;
    margin-right: 5px;
    margin-top: 8px;
    margin-bottom: 3px;
    color: rgb(56, 56, 56);
}

.form-group input {
    width: 58%;
    height: 32px;
    padding: 0 12px;
    margin-right: 5px;
    outline: none;
    border: none;
    border-radius: 8px;
    box-shadow: 0 5px 10px 5px rgba(47, 45, 45, 0.08);
    font-size: 16px;
    background-color: #e9e7ee;
    font-weight: 600;
}

.searchbk,
.addbk {
    width: 30%;
    padding: 10px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    margin-top: 10px;
    margin-left: 5%;
    margin-right: 30%;
    background-color: #007bff;
    border: none;
}

.searchbk:hover,
.addbk:hover {
    background-color: #0056b3;
}

.addbk {
    background-color: rgb(114, 69, 170);
}

.addbk:hover {
    background-color: #114a8b;
}

.quit {
    width: 30%;
    padding: 10px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    margin-top: 10px;
    background-color: #dc3545;
    border: none;
}

.quit:hover {
    background-color: #b02a37;
}

.pagination-container {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>