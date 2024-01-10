<template>
    <div class="bg-image">
    </div>

    <audio src="https://game.maj-soul.com/1/v0.10.1.w/audio/sound/yiji/lobby_playerlogin.mp3" autoplay></audio>

    <div class="position-absolute top-50 start-50 translate-middle">
        <div class="user-space">
            <div class="sidebar">
                <ul>
                    <li :class="{ selected: selectedTab === USERINFO }" @click="select(USERINFO)">用户信息</li>
                    <li :class="{ selected: selectedTab === BORROW }" @click="select(BORROW)">借书情况
                    </li>
                </ul>
            </div>
            <div class="main">
                <div v-if="selectedTab === USERINFO">
                    <div class="avatar-section">
                        <img class="avatar-img" :src="avatar" :title="$route.query.username + '的头像'"
                            @click="showModal = true">
                    </div>
                    <div class="basicinfo">
                        <h2>{{ userInfo.name }}</h2>
                        <p>{{ userInfo.signature }}</p>
                        <p>{{ userInfo.userMail }}</p>
                        <!-- <p>借书数量: {{ userInfo.userTotalborrow }}</p> -->
                        <p>{{ userInfo.status }}</p>
                        <p>进入时间: {{ new Date().toLocaleString() }}</p>
                    </div>
                </div>
                <div v-else-if="selectedTab === BORROW">
                    <h2>借书情况</h2>
                    <!-- 借书情况列表... -->
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>书名</th>
                                <th>数量</th>
                                <th>借书时间</th>
                                <th>还书期限</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="record in borrowRecords   " :key="record.id">
                                <td>《{{ record.bookName }}》</td>
                                <td>{{ record.bookNumber }}</td>
                                <td>{{ record.borrowDate }}</td>
                                <td>{{ record.returnDate }}</td>
                                <td>
                                    <button @click="returnBook(record.id)" class="retbk">还书</button>
                                    <button @click="renewBook(record.id)" class="kepbk">续借</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <el-pagination>
                    </el-pagination>
                </div>
                <!-- 弹窗代码 -->
                <div v-if="showModal" class="modal">
                    <div class="modal-content">
                        <span class="close" @click="showModal = false">&times;</span>
                        <p>请点击以下按钮选择一个新的头像：</p>
                        <input type="file" @change="onFileChange">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ElPagination } from 'element-plus';
import { inject, onMounted, ref } from "vue"

// inject
const http = inject('$http');

// data
const USERINFO = ref("enum_userinfo")
const BORROW = ref("enum_borrow")
const selectedTab = ref("enum_userinfo")
const showModal = ref(false)
const avatar = ref('/assets/img/avatar.png')
const borrowRecords = ref([])
const userInfo = ref({
    
});

onMounted(() => {
    // 使用 $http 发送请求 axios
    http.post('/api/userinfo', {uid: 1})
        .then(response => {
            console.log(response.data);
            userInfo.value = response.data.userInfo
        })
        .catch(error => {
            console.error(error);
        });
});

function getBorrowlist() {
    http.post("/api/borrowlist", {uid: 1})
    .then(response => {
        console.log(response.data)
        borrowRecords.value = response.data.result.borrowlist
    })
    .catch(error => console.log(error))
};

function select(tab) {
    this.selectedTab = tab

    if(tab === BORROW.value){
        getBorrowlist()
    }
};

function returnBook(id) {
    alert("还书成功");
};

function onFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        this.avatar = e.target.result;
        this.showModal = false;  // 关闭弹窗
    };
    reader.readAsDataURL(file);
};

function renewBook(id) {
    alert("续借成功");
}
</script>

<style>
.avatar {
    vertical-align: middle;
}

.circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
}

.bg-image {
    background-image: url("/assets/img/lib_register.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
</style>