<template>
    <!-- 弹窗二 -->
    <div v-if="showChoose" class="Model2">
        <div class="search-container2">
            <form class="search-form2">
                <p class="choosebook">《{{ selectedBook.bookName }}》</p>
                <img class="book-image" :src="selectedBook.cover" title="img">
                <!-- 在加上一些主页没有显示的类似数量之类的信息 -->
                <!-- <p class="booknum">此书剩余数量:{{ selectedBook.bookNumber }}</p> -->
                <p class="bookloc">此书位置:{{ selectedBook.location }}</p>
                <div class="funcbutton">
                    <button v-if="selectedBook.state !== 'borrowed'" class="form-button borrow-btn"
                        @click.prevent="borrowBook_btn(selectedBook)">借阅</button>
                    <button v-if="selectedBook.state !== 'reserved'" class="form-button keep-btn"
                        @click.prevent="orderBook_btn(selectedBook)">预约</button>
                    <button class="form-button" @click="showChoose = false">关闭</button>
                </div>
                <!-- <p class="orderbk">数量不够?<a @click="secondorder = true">点击预约</a></p> -->
            </form>
        </div>
    </div>
    <!-- 弹窗二-1 -->
    <!-- <div v-if="secondborrow" class="Model2-1">
        <div class="search-container2-1">
            <form class="search-form2-1" @submit.prevent="">
                <input type="number" class="userbr" v-model="brnum" placeholder="请输入借阅个数..." required>
                <div class="funcbutton">
                    <button class="form-button borrow-btn" @click="borrowBookfin()">借阅</button>
                    <button class="form-button" @click="secondborrow = false">关闭</button>
                </div>
            </form>
        </div>
    </div> -->
    <!-- 弹窗二-2 -->
    <!-- <div v-if="secondkeep" class="Model2-1">
        <div class="search-container2-1">
            <form class="search-form2-1" @submit.prevent="">
                <input type="date" class="userbr" v-model="brdate" required>
                <div class="funcbutton">
                    <button class="form-button keep-btn" @click="keepBookfin()">续借</button>
                    <button class="form-button" @click="secondkeep = false">关闭</button>
                </div>
            </form>
        </div>
    </div> -->

    <!-- 弹窗二-3 -->
    <div v-if="secondorder" class="Model2-1">
        <div class="search-container2-1">
            <form class="search-form2-1" @submit.prevent="">
                <input type="number" class="userod" v-model="ornum" placeholder="请输入预约个数..." required>
                <div class="funcbutton">
                    <button class="form-button order-btn" @click="orderBookfin()">预约</button>
                    <button class="form-button" @click="secondorder = false">关闭</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 主页面 -->
    <div class="mixed">
        <div class="header" style="">
            <div class="tx">
                <el-dropdown trigger="click">
                    <span class="head-img">
                        <img :src="userInfo.avatar" alt="Avatar">
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click.native="goToUserSpace">用户空间</el-dropdown-item>
                            <el-dropdown-item @click.native="handleLogout">注销账户</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <h2>图书借阅</h2>

            <!-- for dev -->
            <!-- <button @click="req_borrowBook">req_borrowBook</button>
            <button @click="req_returnBook">req_returnBook</button> -->
            <!-- for dev -->



        </div>
        <hr class="divider">

        <div>
            <div class="input-row">
                <input class="search-input" type="text" placeholder="书名" v-model="searchForm.bookname">
                <input class="search-input" type="text" placeholder="作者" v-model="searchForm.author">
                <input class="search-input" type="text" placeholder="ISBN" v-model="searchForm.isbn">
                <button class="search-button" @click="search_btn">搜索</button>
            </div>
        </div>
        <!-- <form class="search_bar" :class="{ focused: isFocused }" @submit.prevent="">
            <div class="input_part">
                <input @focus="isFocused = true" @blur="isFocused = false" type="text" maxlength="200"
                    placeholder="按名称、作者、ISBN、出版社、MD5...搜索。" v-model="searchbig">
                   
                
            
                
            </div>
            <button class="search_book" @click="handlesearchbig()"><i class="fas fa-search"></i></button>
        </form> -->
        <div class="container">
            <div class="book" v-for="item in bookTotalSlice" @click="book_btn(item)">
                <img :src="item.cover" title="点击查看图书详情">
                <td>
                    <p class="bigt" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">《{{ item.bookName
                    }}》</p>
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">作者:<a
                            :href="'/?/' + item.bookAuthor" title="搜索该作者的书">{{ item.author }}</a></p>
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">出版社:<a
                            :href="'/?/' + item.bookPublisher" title="搜索该出版社的书">{{ item.publisher }}</a></p>
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">出版日期:{{
                        formatDate(item.publishDate) }}</p>
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">可借阅状态:{{ bookState(item.state)
                    }}</p>
                </td>
            </div>
        </div>


        <ElPagination class="pagination-container" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="bookTotal.length">
        </ElPagination>
    </div>
</template>

<script setup>
// import { ElPagination } from 'element-plus';
import { ref, onMounted, inject } from 'vue';

import { useAuthStore } from "../script/auth.js"


// object
const auth = useAuthStore();
const http = inject('$http')
const router = inject('$router')
http.defaults.headers.common['Authorization'] = auth.token


// data
const searchForm = ref({
    bookname: null,
    author: null,
    isbn: null
})



const showChoose = ref(false)
const secondborrow = ref(false)
const secondkeep = ref(false)
const secondorder = ref(false)
const isFocused = ref(false)
const brnum = ref('')
const brdate = ref('')
const ornum = ref('')
const selectedBook = ref([])
const searchbig = ref([])

const bookTotal = ref([




])

const userInfo = ref({
    avatar: null
})

const currentPage = ref(1)
const pageSize = ref(7)
const bookTotalSlice = ref([])

function goToUserSpace() {
    router.push('/user')
}

function handleLogout() {
    auth.logout()
    router.replace('/login')
}

//lifetime
onMounted(async () => {
    // console.log(bookTotal.value);
    await getUserInfo()
    await getBook_reader()

    updatePaginatedData();
});




// 🚩



// function 
function bookState(state) {
    if (state === 'canBorrow') {
        return '可借'
    }

    if (state === 'borrowed') {
        return '已借'
    }

    if (state === 'reserving') {
        return '已预定'
    }

    if (state === 'reserved') {
        return '已预定'
    }
}

function formatDate(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleDateString();
}



function reset(obj) {
    Object.keys(obj).forEach(key => {
        obj[key] = null;
    });
}

async function borrowBook_btn(item) {
    console.log("borrowBook_btn: ", item)


    await borrowBook(item.id, item.isbn)

    await getBook_reader()
}

async function orderBook_btn(item) {
    console.log('orderBook_btn: ', item)

    await addReservationReader(item.isbn)

    getBook_reader()
}

function search_btn() {
    getBook_reader()
}

function handleSizeChange(val) {
    pageSize.value = val;
    updatePaginatedData();  // 更新数据的方法，需要你自己实现
};

function handleCurrentChange(val) {
    currentPage.value = val;
    updatePaginatedData();  // 更新数据的方法，需要你自己实现
};

function updatePaginatedData() {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    bookTotalSlice.value = bookTotal.value.slice(start, end);
};

function book_btn(book) {
    if (book.bookStatus === '否') {
        alert("《" + book.bookName + "》已被借完o（＞︿＜）o");
        return;
    }

    showChoose.value = true;
    selectedBook.value = book;
}

function keepBook() {
    secondkeep.value = "true";
}

// function borrowBook() {
//     secondborrow.value = "true";
// }
function handlesearchbig() {
    console.log(searchbig.value);
    console.log('搜索成功');
    searchbig.value = '';
}
function borrowBookfin() {
    console.log('借阅成功');
    console.log(brnum.value);
    brnum.value = '';
}
function keepBookfin() {
    console.log('续借成功');
    console.log(brdate.value);
    brdate.value = '';
}
function orderBookfin() {
    console.log('预约成功');
    console.log(ornum.value);
    ornum.value = '';
}

// // 🚩
// function queryBookCatalog() {

// }

// request

async function getBook_reader() {
    const path = '/api/bookInfo/getBook?page=1&pageSize=100'

    const body = {
        isbn: searchForm.value.isbn,
        location: null,
        state: null,
        id: null
    }

    console.log("getBook parameter: ", body)

    await http.post(path, body)
        .then(response => {
            console.log("getBook_reader: ", response.data)
            bookTotal.value = response.data.data
            updatePaginatedData()

        }).catch(error => {
            console.log("getBook_reader request fail", error)
        })
}


async function borrowBook(bookid, isbn) {

    const path = '/api/bookBorrow/borrowBook?isbn=' + isbn + 'borrowNum=' + bookid
    const body = {
        dueTime: "2024-01-30T22:18:26.625Z",
        librarianJobNumber: 1,
        readerId: userInfo.value.id,
        bookId: bookid
    }

    console.log('borrowBook: ', body)

    await http.post(path, body)
        .then(response => {
            console.log("borrowBook: ", response.data)

            if (response.data.msg === 'Success') {
                alert('借书成功')
            }

        })
        .catch(error => {
            console.log(error)
        })
}


async function addReservationReader(isbn) {
    await http.post('/api/Reservation/addReservationReader', {
        "reservationTime": null,
        "reservationDeadline": "2024-01-30T22:18:26.625Z",
        "librarianJobNumber": 1,
        "isbn": isbn
    }).then(response => {
        console.log("addReservationReader: ", response.data)

        if(response.data.msg === 'Success'){
            alert('预约成功')
        }
        else{
            alert('预约失败')
        }

    }).catch(error => {
        console.log(error)
    })
}

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

</script>

<style scoped>
.input-row {
    display: flex;
    justify-content: space-between;
}

.search-input {
    flex: 1;
    margin-right: 30px;
}

.search-button {
    margin-left: 10px;
}

.search_bar {
    display: flex;
    justify-content: space-between;
    margin: 20px auto 40px auto;
    border: solid 1px #000000;
    width: 70%;
    height: 38px;
    background-color: rgba(218, 228, 226, 0.8);
    color: #f1ecec;
    font-weight: bold;
    /* border: none; */
    border-radius: 8px;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.search_bar.focused {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.input_part {
    background-color: rgba(221, 229, 231, 0.5);
    height: 38px;
    position: relative;
    box-shadow: inset 0px 6px 4px -6px rgba(200, 200, 200, 0.75);
    width: 85%;
}

.input_part input {
    background: none repeat scroll 0 0 transparent;
    border: none;
    border-right: 1px solid #000000;
    color: #333333;
    display: block;
    margin: 0;
    outline: 0 none;
    padding: 7px 38px 7px 8px;
    width: 100%;
    height: 100%;
}

.header {
    padding: 5px 13px 5px 13px;
    text-align: center;
    font-size: 14px;
    line-height: 19px;
    background: linear-gradient(89.99deg, #234D49 0.46%, #495F86 24.82%, #25A6BB 44.52%, #0ABAD4 62.67%, #03AAC0 82.36%, #058490 99.99%) #495F86;
    font-size: large;
}

.tx {
    float: right;
}

.head-img,
.head-img>img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

.divider {
    margin: 0;
    height: 3px;
    background: linear-gradient(270deg, #d53369, #daae51, #e91e63, #283c86);
    background-size: 800% 800%;
    animation: AnimationName 3s ease infinite;
}

@keyframes AnimationName {
    0% {
        background-position: 0% 50%
    }

    50% {
        background-position: 100% 50%
    }

    100% {
        background-position: 0% 50%
    }
}

.search_book {

    width: 15%;
    background-color: rgba(0, 123, 255, 0.8);
    color: #f1ecec;
    font-weight: bold;
    border: none;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.search_book:hover {
    background-color: rgba(0, 123, 255, 1);
    color: #ffffff;
}

.search_book i {
    /* 其他样式 */
    transition: transform 0.3s ease;
}

.search_book:hover i {
    transform: scale(1.2);
}

.mixed {
    background-attachment: fixed;
    background: url("/assets/img/cloud.jpg") no-repeat center center fixed;
    box-sizing: border-box;
    min-height: 100%;
}


.header h2 {
    width: 300px;
    margin: auto;
    font-size: 36px;
    color: #000000;
    text-shadow: -1px 0 rgb(25, 161, 182), 0 1px rgb(25, 161, 182), 1px 0 rgb(25, 161, 182), 0 -1px rgb(25, 161, 182);
}

.book {
    width: 100%;
    height: 180px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin: 0px 2% 0px 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: rgb(255, 255, 255, 0.8);
    box-sizing: border-box;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}

.book:hover {
    background-color: rgb(255, 255, 255, 1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

td {
    position: relative;
    left: 4%;
}

.book p {
    margin: 2px;
    font-size: normal;
}

.book a {
    text-decoration: none;
    color: #27777f;
}

.book a:hover {
    color: #00bfff;
    text-decoration: underline;
}

.book img {
    position: relative;
    left: 1%;
    margin-top: 5px;
    width: 130px;
    height: 149px;
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.book img:hover {
    transform: scale(1.1);
}

.bigt {
    font-size: large;
    font-weight: bold;
}

.leader {
    padding-left: 10px;
    color: #333;
}


.borrow-btn {
    background-color: #008CBA;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
}

.borrow-btn:hover {
    background-color: #006080;
}

.logout-btn {
    background-color: #ff4500;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    margin: 37px 20px 20px 20px;
    float: right
}

.logout-btn:hover {
    background-color: #cc3700;
}

.contact {
    text-align: center;
    margin: 10px;
}

.contact p {
    text-align: center;
    margin: 3px;
}

.icon_set {
    text-align: center;
}

.icon_set a {
    margin: 6px;
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

.search-form {
    width: 30%;
    margin: auto;
    background-color: #fefefe;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 20px;
}

.search-form p {
    position: relative;
    text-align: center;
    font-size: 32px;
    color: #0056b3;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
}

.search-form p::before {
    position: absolute;
    content: "";
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 4px;
    background-color: #0276ea;
}

.form-group {
    align-items: center;
    margin-bottom: 10px;
}

.form-group label {
    display: inline-block;
    cursor: url("/assets/img/alternate.ico"), auto;
    width: 20%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: bold;
    margin-right: 2%;
    margin-top: 8px;
    margin-bottom: 3px;
    color: rgb(56, 56, 56);
}

.funcbutton {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

.form-group input {
    width: 68%;
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

.addbk:hover {
    background-color: #0056b3;
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

.Model2 {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}


.search-container2 {
    width: 100%;
    margin: auto;
    border: none;
    margin-top: 6%;
}

.search-form2 {
    width: 30%;
    margin: auto;
    background-color: #fefefe;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 20px;
}

.search-form2>.choosebook {
    position: relative;
    text-align: center;
    font-size: 26px;
    color: #0056b3;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
}

.search-form2>.choosebook::before {
    position: absolute;
    content: "";
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 4px;
    background-color: #0276ea;
}


button:hover {
    cursor: url("/assets/img/alternate.ico"), auto;
}

.search-form2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
}

.choosebook {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
}

.book-image {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    /* object-fit: cover; */
    margin-bottom: 20px;
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

.booknum {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-top: 5px;
    margin-bottom: 0px;
}

.bookloc {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 10px;
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

.order-btn {
    background-color: #e47a18;
}

.order-btn:hover {
    background-color: #a45d1b;
}

.keep-btn {
    background-color: #ffc107;
}

.keep-btn:hover {
    background-color: #d39e00;
}

.orderbk {
    margin-top: 15px;
    margin-bottom: 0px;
    font-size: small;
}

.orderbk a {
    color: #007bff;
    text-decoration: none;
}

.orderbk a:hover {
    color: #155faf;
    text-decoration: underline;
}

.Model2-1 {
    z-index: 2;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}


.search-container2-1 {
    width: 100%;
    margin: auto;
    border: none;
    margin-top: 10%;
}

.search-form2-1 {
    width: 30%;
    margin: auto;
    margin-top: 20%;
    background-color: #fefefe;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 20px;
}

.search-form2-1>.choosebook {
    position: relative;
    text-align: center;
    font-size: 26px;
    color: #0056b3;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
}

.search-form2-1>.choosebook::before {
    position: absolute;
    content: "";
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 4px;
    background-color: #0276ea;
}

.userbr,
.userod {
    width: 80%;
    text-align: center;
    height: 40px;
    padding: 0 12px;
    display: block;
    margin: auto;
    margin-bottom: 20px;
    outline: none;
    border: none;
    border-radius: 8px;
    box-shadow: 0 5px 10px 5px rgba(47, 45, 45, 0.08);
    font-size: 20px;
    background-color: #e9e7ee;
    font-weight: 600;
}</style>