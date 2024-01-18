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
                    <li :class="{ selected: selectedTab === 'borrow' }" @click="select('borrow')"><i
                            class="fas fa-book"></i>
                        借书情况
                    </li>
                    <li :class="{ selected: selectedTab === 'order' }" @click="select('order')"><i
                            class="fas fa-calendar-check"></i> 预约情况</li>
                </ul>
            </div>
            <div class="main">
                <div v-if="selectedTab === 'userinfo'">
                    <div class="avatar-section">
                        <img class="avatar-img" :src="userInfo.avatar" alt="头像" @click="showModel = true">
                    </div>
                    <div class="basicinfo">
                        <h2> {{ userInfo.name }} </h2>
                        <p> {{ userInfo.email }} </p>
                        <!-- <p>借书数量: {{ userInfo.userTotalborrow }}</p> -->
                        <p>{{ userInfo.status }}</p>
                        <p>进入时间: {{ new Date().toLocaleString() }}</p>
                        <button class="form-button search-btn" @click="to_search">搜索</button>
                        <button class="form-button exit-btn" @click="exit">退出</button>
                    </div>
                </div>
                <div v-else-if="selectedTab === 'borrow'">
                    <!-- <h2>借书情况</h2> -->
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
                            <tr v-for="record in borrowRecordsSlice" :key="record.borrowId">
                                <td>《{{ record.bookName }}》</td>
                                <!-- <td>{{ record.bookNumber }}</td> -->
                                <td>{{ formatDate(record.borrowTime) }}</td>
                                <td>{{ formatDate(record.dueTime) }}</td>
                                <td v-if="record.state !== 'returned'" style="text-align: center; vertical-align: middle;">

                                    <button @click="returnBook_btn(record)" class="retbk">还书</button>
                                    <!-- <button @click="keepborrow = true" class="kepbk">续借</button> -->
                                </td>

                                <td v-if="record.state === 'returned'" style="text-align: center; vertical-align: middle;">
                                    已还</td>
                            </tr>
                        </tbody>
                    </table>
                    <el-pagination class="pagination-container" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                        layout="prev, pager, next" :total="borrowRecords.length">
                    </el-pagination>
                </div>
                <div v-else-if="selectedTab === 'order'">
                    <!-- <h2>预约情况</h2> -->
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>书名</th>
                                <!-- <th>数量</th> -->
                                <th>预约时间</th>
                                <th>截止时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="record in orderRecordsSlice" :key="record.id">
                                <td>《{{ record.bookName }}》</td>
                                <!-- <td>{{ record.bookNumber }}</td> -->
                                <td>{{ formatDate(record.reservationTime) }}</td>
                                <td>{{ formatDate(record.reservationDeadline) }}</td>
                                <td>
                                    <button v-if="record.state === 'reserving'" @click="deleteReservationReader_btn(record.reservationId)"
                                        class="odbk">取消预约</button>

                                    <button v-if="record.state === 'reserved'" @click="getReservationBook(record)"
                                        class="odbk">取书</button>
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
                        <input type="text" placeholder="用户名" v-model="userInfoForm.name">
                        <input type="text" placeholder="邮箱" v-model="userInfoForm.email">
                        <input type="text" placeholder="手机号码" v-model="userInfoForm.telephoneNumber">
                        <button @click="submit_userInfo">提交</button>
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
    
])
const orderRecords = ref([
    
])
const showModel = ref(false)
const userInfo = ref({})
const userInfoForm = ref({
    name: null,
    telephoneNumber: null,
    email: null,
})

const currentPage = ref(1)
const pageSize = ref(6)
const borrowRecordsSlice = ref([])
const orderRecordsSlice = ref([])

onMounted(async () => {
    await getUserInfo()
});



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

async function submit_userInfo() {
    await updateUserInfo()
    showModel.value = false
    reset(userInfoForm.value)
    await getUserInfo()
}


function renewBook(id) {
    alert("续借成功");
    console(keepdate)
}

function to_search() {
    router.push('/search')
}

function exit() {
    auth.logout()
    router.replace('/')
}

function formatDate(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleDateString();
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
    borrowRecordsSlice.value = borrowRecords.value.slice(start, end);
    orderRecordsSlice.value = orderRecords.value.slice(start, end);
}

function reset(obj) {
    Object.keys(obj).forEach(key => {
        obj[key] = null;
    });
}

async function returnBook_btn(item) {
    await returnBook(item.borrowId)
    await getBorrowBookListReader()

    updatePaginatedData()
}

async function deleteReservationReader_btn(id){
    await deleteReservationReader(id)
    await getReservationReader()
} 

// region request


// user - borrow


function returnBook(id) {
    const path = '/api/bookBorrow/returnBook?borrowId=' + id

    http.post(path)
        .then(response => {
            console.log("returnBook: ", response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

async function getBorrowBookListReader() {
    const path = '/api/bookBorrow/getBorrowBookList?page=1&pageSize=100'

    const body = {
        "dueTime": null,
        "borrowTime": null,
        "librarianJobNumber": null,
        "bookId": null,
        "state": null,
        "returnTime": null,
        "borrowId": null
    }

    console.group("getBorrowBookListReader")
    console.log(body)

    await http.post(path, body)
        .then(response => {
            console.log('getBorrowBookListReader: ', response.data)
            borrowRecords.value = response.data.data

            updatePaginatedData()
        })
        .catch(error => {
            console.log(error)
        })

    console.groupEnd()
}

// user - account
// 🚩


async function getUserInfo() {
    await http.get('api/userInfo')
        .then(response => {
            console.log("getUserInfo: ", response.data)
            const data = response.data.data
            userInfo.value = data
        })
        .catch(error => {
            console.log("getUserInfo request fail: ", error)
        })
}


async function updateAvatar(image) {
    const path = '/api/updateAvatar'
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    // var fileInput = document.getElementById('input-avatar');
    // var file = fileInput.files[0];

    console.log("image param: ", image)
    var formData = new FormData();
    formData.append('file', image);

    http.post(path, formData, config)
        .then(response => {
            console.log("updateAvatar: ", response.data)
            userInfo.value.avatar = response.data.data.url
        }).catch(error => {
            console.log(error)
        })
}

async function updateUserInfo() {

    var fileInput = document.getElementById('input-avatar');
    var image = fileInput.files[0];

    console.log("image: ", image)

    if (image) {
        await updateAvatar(image)
    }

    const path = '/api/updateUserInfo'
    const body = {
        "name": userInfoForm.value.name,
        "telephoneNumber": userInfoForm.value.telephoneNumber,
        "email": userInfoForm.value.email
    }

    console.log("updateUserInfo body: ", body)

    await http.post(path, body)
        .then(response => {
            console.log('updateUserInfo: ', response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

// user - reservation


async function getReservationReader() {
    await http.post('/api/Reservation/getReservationReader?page=1&pageSize=100', {
        "reservationId": null,
        "reservationTime": null,
        "reservationDeadline": null,
        "librarianJobNumber": null,
        "isbn": null,
        "state": null
    }).then(response => {
        console.log("getReservationReader: ", response.data)

        orderRecords.value = response.data.data

        updatePaginatedData()

    }).catch(error => {
        console.log(error)
    })
}

async function deleteReservationReader(id) {
    const path = '/api/Reservation/deleteReservationReader?reservationId=' + id

    await http.get(path)
        .then(response => {
            console.log("deleteReservationReader: ", response.data)
            updatePaginatedData()
        }).catch(error => {
            console.log(error)
        })
}

// user - bookinfo




// user - bookcatalog
function queryBookCatalog() {
    http.post('/api/bookCatalog/queryBookCatalog?page=1&pageSize=100', {
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

// 取书
async function getReservationBook(item) {
    alert(联系管理员取书)
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

.search-btn {
    background-color: #0056b3;
}

.exit-btn {
    background-color: #eb2121;
}

.exit-btn:hover {
    background-color: #b20e0e;
}
</style>