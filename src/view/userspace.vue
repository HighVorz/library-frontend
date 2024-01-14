<template>
    <div class="bg-image">
    </div>

    <audio src="https://game.maj-soul.com/1/v0.10.1.w/audio/sound/yiji/lobby_playerlogin.mp3" autoplay></audio>

    <!-- 弹窗-续借 -->
    <div v-if="keepborrow" class="modalself">
        <div class="search-containerself">
            <form class="search-formself" @submit.prevent="">
                <input type="Date" class="userbr" v-model="keepdate" required>
                <div class="funcbutton">
                    <button class="form-button borrow-btn" @click="renewBook(record.id)">续借</button>
                    <button class="form-button" @click="keepborrow = false">关闭</button>
                </div>
            </form>
        </div>
    </div>

    <div class="position-absolute top-50 start-50 translate-middle">
        <div class="user-space">
            <div class="sidebar">
                <ul>
                    <li :class="{ selected: selectedTab === 'userinfo' }" @click="select('userinfo')"><i
                            class="fas fa-user"></i> 用户信息</li>
                    <li :class="{ selected: selectedTab === 'borrow' }" @click="select('borrow')"><i class="fas fa-book"></i>
                        借书情况
                    </li>
                    <li :class="{ selected: selectedTab === 'order' }" @click="select('order')"><i
                            class="fas fa-calendar-check"></i> 预约情况</li>
                </ul>
            </div>
            <div class="main">
                <div v-if="selectedTab === 'userinfo'">
                    <div class="avatar-section">
                        <img class="avatar-img" :src="userInfo.avatar" alt="头像"
                            @click="showModel = true">
                    </div>
                    <div class="basicinfo">
                        <h2>{{ userInfo.userName }}</h2>
                        <p>{{ userInfo.signature }}</p>
                        <p>{{ userInfo.userMail }}</p>
                        <!-- <p>借书数量: {{ userInfo.userTotalborrow }}</p> -->
                        <p>{{ userInfo.status }}</p>
                        <p>进入时间: {{ new Date().toLocaleString() }}</p>
                        <button class="form-button exit-btn" @click="exit">退出</button>
                    </div>
                </div>
                <div v-else-if="selectedTab === 'borrow'">
                    <h2>借书情况</h2>
                    <!-- 借书情况列表... -->
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>书名</th>
                                <!-- <th>数量</th> -->
                                <th>借书时间</th>
                                <th>还书期限</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="record in paginatedData" :key="record.id">
                                <td>《{{ record.bookName }}》</td>
                                <!-- <td>{{ record.bookNumber }}</td> -->
                                <td>{{ record.borrowDate }}</td>
                                <td>{{ record.returnDate }}</td>
                                <td>
                                    <button @click="returnBook(record.id)" class="retbk">还书</button>
                                    <button @click="keepborrow = true" class="kepbk">续借</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <el-pagination class="pagination-container" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                        layout="prev, pager, next" :total="borrowRecords.length">
                    </el-pagination>
                </div>
                <div v-else-if="selectedTab === 'order'">
                    <!-- 这个order要怎么放入,以下都是用来放用户预约列表的 -->
                    <h2>预约情况</h2>
                    <!-- 预约情况列表... -->
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>书名</th>
                                <!-- <th>数量</th> -->
                                <th>预约时间</th>
                                <th>预约数量</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="record in paginatedData2" :key="record.id">
                                <td>《{{ record.userOrder }}》</td>
                                <!-- <td>{{ record.bookNumber }}</td> -->
                                <td>{{ record.userOrdertime }}</td>
                                <td>{{ record.orderNum }}</td>
                                <td>
                                    <button @click="orderBook(record.id)" class="odbk">取消预约</button>
                                    <!-- <button @click="keepborrow = true" class="kepbk">续借</button> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <el-pagination class="pagination-container" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                        layout="prev, pager, next" :total="orderRecords.length">
                    </el-pagination>
                </div>


                <!-- 弹窗代码 -->
                <div v-if="showModel" class="modal">
                    <div class="modal-content">
                        <span class="close" @click="showModel = false">&times;</span>
                        <p>请点击以下按钮选择一个新的头像：</p>
                        <input type="file" id="input-avatar">
                        <button @click="submit_avatar">提交</button>
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>

<script setup>
import { ElPagination } from 'element-plus';
import { inject, onMounted, ref } from "vue"
import { useAuthStore } from "../script/auth.js"


const auth = useAuthStore();

// inject
const router = inject('$router')
const http = inject('$http');
http.defaults.headers.common['Authorization'] = auth.token

// data
const selectedTab = ref("userinfo")
const keepborrow = ref(false)
const keepdate = ref([])
// const avatar = ref('/assets/img/avatar.png')
const borrowRecords = ref([
    {
        "bookName": "计算机体系结构",
        "bookNumber": "1",
        "borrowDate": "2023-12-27",
        "returnDate": "2024-1-27"
    },
    {
        "bookName": "算法导论",
        "bookNumber": "2",
        "borrowDate": "2023-12-25",
        "returnDate": "2024-1-25"
    },
    {
        "bookName": "计算机网络",
        "bookNumber": "3",
        "borrowDate": "2023-3-27",
        "returnDate": "2023-4-27"
    },
    {
        "bookName": "计算机图形学",
        "bookNumber": "6",
        "borrowDate": "2023-5-2",
        "returnDate": "2023-6-2"
    }
])
const orderRecords = ref([
    {
        "userName": "钱璟丰",
        "userOrder": "计算机体系结构",
        "userOrdertime": "2023-12-27",
        "userMail": "2055318980@qq.com",
        "orderNum": "1"
    },
    {
        "userName": "小明",
        "userOrder": "计算机图形学",
        "userOrdertime": "2023-1-2",
        "userMail": "233465654756@qq.com",
        "orderNum": "5"
    },
    {
        "userName": "张三",
        "userOrder": "计算机图形学",
        "userOrdertime": "2023-12-28",
        "userMail": "zhangsan@example.com",
        "orderNum": "3"
    },
    {
        "userName": "李四",
        "userOrder": "操作系统概念",
        "userOrdertime": "2023-2-1",
        "userMail": "lisi@example.com",
        "orderNum": "2"
    },
    {
        "userName": "王五",
        "userOrder": "算法设计与分析",
        "userOrdertime": "2024-1-1",
        "userMail": "wangwu@example.com",
        "orderNum": "1"
    },
    {
        "userName": "赵六",
        "userOrder": "计算机组成与设计",
        "userOrdertime": "2023-1-15",
        "userMail": "zhaoliu@example.com",
        "orderNum": "1"
    },
    {
        "userName": "陈七",
        "userOrder": "计算机体系结构",
        "userOrdertime": "2023-12-27",
        "userMail": "chenqi@example.com",
        "orderNum": "1"
    },
    {
        "userName": "张十",
        "userOrder": "数据结构与算法",
        "userOrdertime": "2023-1-20",
        "userMail": "zhangshi@example.com",
        "orderNum": "5"
    }
])
const showModel = ref(false)
const userInfo = ref({})
const currentPage = ref(1)
const pageSize = ref(6)
const paginatedData = ref([])
const paginatedData2 = ref([])

onMounted(async () => {
    await getUserInfo()
});





function getBorrowlist() {
    http.get("/api/bookBorrow/getBorrowBookList?page=1&pageSize=10", {
        params: {
            dueTime: null,
            borrowTime: null,
            librarianJobNumber: null,
            bookId: null,
            state: null,
            returnTime: null,
            borrowId: null,
        },
    }).then(async response => {
        console.log(response.data)
        borrowRecords.value = response.data.result.borrowlist

        console.log('execute updatePaginatedData');

    }).catch(error => console.log(error))
};

// ui
function select(tab) {
    selectedTab.value = tab
    if (tab === 'borrow') {
        getBorrowBookListReader()
    }

    if (tab === 'order') {
        updatePaginatedData();
        getReservationReader()
    }
};

function submit_avatar(){
    updateAvatar()
    showModel.value = false
}



function onFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        avatar.value = e.target.result;
        showModel.value = false;  // 关闭弹窗
    };
    reader.readAsDataURL(file);
};

function renewBook(id) {
    alert("续借成功");
    console(keepdate)
}

function exit() {
    auth.logout()
    router.replace('/')
}

function handleSizeChange(val) {
    pageSize.value = val;
    updatePaginatedData();
}
function handleCurrentChange(val) {
    currentPage.value = val;
    updatePaginatedData();
}
async function updatePaginatedData() {
    console.log('updatePaginatedData');
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    paginatedData.value = borrowRecords.value.slice(start, end);
    paginatedData2.value = orderRecords.value.slice(start, end);
    // console.log("----");
    // console.log(paginatedData.value);
}

// region request


// user - borrow

function borrowBook() {
    const path = '/api/bookBorrow/borrowBook?isbn=9786269736676&borrowNum=1'
    const body = {
        "dueTime": "2024-01-15T22:18:26.625Z",
        "librarianJobNumber": 1,
        "readerId": 1,
        "bookId": 1
    }
    http.post(path, body)
        .then(response => {
            console.log("borrowBook: ", response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

function returnBook() {
    const path = '/api/bookBorrow/returnBook?borrowId=2'

    http.post(path)
        .then(response => {
            console.log("returnBook: ", response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

function getBorrowBookListReader() {
    const path = '/api/bookBorrow/getBorrowBookList?page=1&pageSize=10'
    const body = {
        "dueTime": null,
        "borrowTime": null,
        "librarianJobNumber": null,
        "bookId": null,
        "state": null,
        "returnTime": null,
        "borrowId": null
    }

    http.post(path, body)
        .then(response => {
            console.log('getBorrowBookListReader: ', response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

// user - account
// 🚩


function getUserInfo() {
    http.get('api/userInfo')
        .then(response => {
            console.log("getUserInfo: ", response.data)
            const data = response.data.data
            userInfo.value = data
        })
        .catch(error => {
            console.log("getUserInfo request fail: ", error)
        })
}


function updateAvatar() {
    var fileInput = document.getElementById('input-avatar');
    var file = fileInput.files[0];
    console.log(file)
    var formData = new FormData();
    formData.append('file', file);

    http.post('/api/updateAvatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log("updateAvatar: ", response.data)
        userInfo.value.avatar = response.data.data.url
    }).catch(error => {
        console.log(error)
    })
}

// user - reservation

function addReservationReader() {
    http.post('/api/Reservation/addReservationReader', {
        "reservationTime": null,
        "reservationDeadline": "2024-01-15T22:18:26.625Z",
        "librarianJobNumber": 1,
        "isbn": "9786263495630"
    }).then(response => {
        console.log("addReservationReader: ", response.data)
    }).catch(error => {
        console.log(error)
    })
}

function getReservationReader() {
    http.post('/api/Reservation/getReservationReader?page=1&pageSize=10', {
        "reservationId": null,
        "reservationTime": null,
        "reservationDeadline": null,
        "librarianJobNumber": null,
        "isbn": null,
        "state": null
    }).then(response => {
        console.log("getReservationReader: ", response.data)
    }).catch(error => {
        console.log(error)
    })
}

function deleteReservationReader() {
    http.get('/api/Reservation/deleteReservationReader?reservationId=1')
        .then(response => {
            console.log("deleteReservationReader: ", response.data)
        }).catch(error => {
            console.log(error)
        })
}

// user - bookinfo

function getBook_reader() {
    http.post('/api/bookInfo/getBook?page=1&pageSize=10', {
        "isbn": null,
        "location": null,
        "state": null,
        "id": null
    }).then(response => {
        console.log("getBook_reader: ", response.data)
    }).catch(error => {
        console.log("getBook_reader request fail", error)
    })
}


// user - bookcatalog
function queryBookCatalog() {
    http.post('/api/bookCatalog/queryBookCatalog?page=1&pageSize=10', {
        "bookName": null,
        "author": null,
        "publisher": null,
        "publishDate": null,
        "isbn": null,
        "unitPrice": null
    }).then(response => {
        console.log("queryBookCatalog: ", response.data)
        if (response.data.msg === 'Success') {

        }
        else {
            console.log(response.data.msg)
        }
    }).catch(error => {
        console.log(error)
    })
}

// endregion

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

.pagination-container {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

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

.odbk {
    background-color: rgba(19, 129, 231, 0.7);
}

.odbk:hover {
    background-color: rgba(19, 129, 231, 1);
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-5px);
    }
}

.modalself {
    z-index: 2;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}


.search-containerself {
    width: 100%;
    margin: auto;
    border: none;
    margin-top: 10%;
}

.search-formself {
    width: 30%;
    margin: auto;
    margin-top: 20%;
    background-color: #fefefe;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 20px;
}

.funcbutton {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

.form-button {
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    padding: 10px 20px;
    margin: 0 10px 10px 10px;
    border-radius: 10px;
}

.form-button:hover {
    background-color: #0056b3;
}

.borrow-btn {
    background-color: #28a745;
}

.borrow-btn:hover {
    background-color: #1e7e34;
}

.userbr {
    width: 80%;
    text-align: center;
    height: 40px;
    padding: 0 12px;
    display: block;
    margin: 15px auto 0px auto;
    outline: none;
    border: none;
    border-radius: 8px;
    box-shadow: 0 5px 10px 5px rgba(47, 45, 45, 0.08);
    font-size: 20px;
    background-color: #e9e7ee;
    font-weight: 600;
}

.exit-btn {
    background-color: #eb2121;
}

.exit-btn:hover {
    background-color: #b20e0e;
}
</style>