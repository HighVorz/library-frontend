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
                        <h2>{{ userInfo.username }}</h2>
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

<script>
import { ElPagination } from 'element-plus';
import { inject, onMounted, ref } from "vue"

export default {
    components: {
        ElPagination
    },
    async created() {
        const response = await fetch('/userspbr.json');
        if (response.ok) {
            const data = await response.json();
            this.userInfo = data.user;
            this.borrowRecords = data.userborrow;
        } else {
            console.error('Failed to load userspbr.json:', response.status, response.statusText);
        }
    },
    data() {
        return {
            USERINFO: "enum_userinfo",
            BORROW: "enum_borrow",
            selectedTab: "enum_userinfo",
            showModal: false,
            avatar: '/assets/img/avatar.png',
            borrowRecords: [],
            userInfo: {
                username: "1337",
                signature: "放浪不羁爱自由",
                status: "摸鱼中"
            }
        }
    },

    methods: {
        select(tab) {
            this.selectedTab = tab
        },
        returnBook(id) {
            alert("还书成功");
        },

        onFileChange(e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                this.avatar = e.target.result;
                this.showModal = false;  // 关闭弹窗
            };
            reader.readAsDataURL(file);
        },

        renewBook(id) {
            alert("续借成功");
        }
    },

    setup() {
        const http = inject('$http');

        onMounted(() => {
            // 使用 $http 发送请求 axios
            http.get('/users')
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        });
    },
}

</script>

<style scoped>
.bg-image {
    background-image: url("/assets/img/claim.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

/* 
.z-container {
    width: 100%;
    height: 100%;
    background: url("/assets/img/claim.jpg") center/cover no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
} */

.user-space {
    display: flex;
    width: 900px;
    height: 550px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
}

.selected {
    background-color: #ddd;
}

.sidebar {
    width: 20%;
    border-right: 1px solid #ddd;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar li {
    cursor: url("/assets/img/alternate.ico"), auto;
    padding: 10px;
}

.sidebar li:hover {
    background-color: #ddd;
}

.basicinfo {
    text-align: center;
}

.main {
    width: 80%;
    padding: 20px;
}

.avatar-section {
    text-align: center;
}

.avatar-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
    border-radius: 10px;
    text-align: center;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: url("/assets/img/alternate.ico"), auto;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
}

input[type="file"] {
    margin-top: 10px;
}

.styled-table {
    width: 100%;
    border-collapse: collapse;
}

.styled-table th,
.styled-table td {
    border: 1px solid #ddd;
    padding: 8px;
}

.styled-table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: rgba(76, 175, 80, 0.8);
    color: white;
}

.styled-table tr:nth-child(even) {
    background-color: rgba(242, 242, 242, 0.7);
}

.styled-table tr:hover {
    background-color: #ddd;
}

.styled-table button {
    margin-right: 10px;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 8px;
}

.styled-table button:hover {
    animation: bounce 0.3s forwards;
}

.retbk {
    background-color: rgba(231, 185, 19, 0.7);
}

.retbk:hover {
    background-color: rgba(231, 185, 19, 1);
}

.kepbk {
    background-color: rgba(139, 26, 157, 0.7);
}

.kepbk:hover {
    background-color: rgba(139, 26, 157, 1);
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-5px);
    }
}
</style>