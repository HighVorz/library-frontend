<template>
    <div class="admin-container">

        <div class="sidebar">
            <h2><i class="fas fa-user-tie"></i> 图书管理员</h2>
            <ul>
                <li><button :class="{ selected: selectedMenu === 'users' }" @click="select_menu('users')"><i
                            class="fas fa-book"></i> 用户列表</button></li>

                <li><button :class="{ selected: selectedMenu === 'books' }" @click="select_menu('books')"><i
                            class="fas fa-book"></i> 书目详情</button></li>

                <li><button :class="{ selected: selectedMenu === 'respository' }" @click="select_menu('respository')"><i
                            class="fas fa-book"></i> 库存管理</button></li>

                <li><button :class="{ selected: selectedMenu === 'borrow' }" @click="select_menu('borrow')"><i
                            class="fas fa-users"></i> 借阅申请</button></li>

                <li><button :class="{ selected: selectedMenu === 'orders' }" @click="select_menu('orders')"><i
                            class="fas fa-calendar-check"></i> 预约情况</button></li>

                <li><button :class="{ selected: selectedMenu === 'exit' }" class="exit-btn" @click="exit"><i
                            class="fas fa-sign-out-alt"></i> 退出系统</button></li>
            </ul>
        </div>


        <div class="content">

            <!-- 弹窗1 -->
            <div v-if="showModel3" class="Model">
                <div class="search-container">
                    <form class="search-form" @submit.prevent="">
                        <p>图书搜索</p>
                        <div class="form-group">
                            <label for="name">书名:</label>
                            <input type="text" id="name" class="form-control" v-model="searchbook.bookname">
                        </div>
                        <div class="form-group">
                            <label for="au">作者:</label>
                            <input type="text" id="au" class="form-control" v-model="searchbook.bookauthor">
                        </div>
                        <div class="form-group">
                            <label for="pub">出版社:</label>
                            <input type="text" id="pub" class="form-control" v-model="searchbook.bookpublisher">
                        </div>
                        <div class="form-group">
                            <label for="time">出版时间:</label>
                            <input type="date" id="time" class="form-control" v-model="searchbook.bookdate">
                        </div>
                        <div class="form-group">
                            <label for="restnum">剩余数量:</label>
                            <input type="number" id="restnum" class="form-control" v-model="searchbook.booknumber">
                        </div>
                        <div class="form-group">
                            <button class="searchbk" @click="showsearchbook()">查找</button>
                            <button @click="showModel3 = false" class="quit">关闭</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- 弹窗2 -->
            <div v-if="showModel4" class="Model">
                <div class="search-container">
                    <form class="search-form4" @submit.prevent="">
                        <p>添加图书</p>
                        <div class="form-group">
                            <label for="name">书名:</label>
                            <input type="text" id="name" class="form-control" v-model="addbook.bookname">
                        </div>
                        <div class="form-group">
                            <label for="au">作者:</label>
                            <input type="text" id="au" class="form-control" v-model="addbook.author">
                        </div>
                        <div class="form-group">
                            <label for="pub">出版社:</label>
                            <input type="text" id="pub" class="form-control" v-model="addbook.publisher">
                        </div>
                        <div class="form-group">
                            <label for="time">出版时间:</label>
                            <input type="date" id="time" class="form-control" v-model="addbook.date">
                        </div>
                        <div class="form-group">
                            <label for="time">ISBN:</label>
                            <input type="text" id="isbn" class="form-control" v-model="addbook.isbn">
                        </div>
                        <!-- <div class="form-group">
                            <label for="restbk">册数:</label>
                            <input type="number" id="restbk" class="form-control" v-model="addbook.number">
                        </div> -->
                        <!-- <div class="form-group">
                            <label for="status">借阅状态:</label>
                            <input type="text" id="status" class="form-control" v-model="addbook.status">
                        </div> -->
                        <!-- 其实也能放入图片 -->
                        <div class="form-group">
                            <button class="addbk2" @click="addBookCatalog">添加</button>
                            <button @click="showModel4 = false" class="quit">关闭</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- 弹窗3 -->
            <div v-if="showModel5" class="Model">
                <div class="search-container">
                    <form class="search-form3" @submit.prevent="">
                        <p>修改信息</p>
                        <div class="form-group">
                            <label for="name">书名:</label>
                            <input type="text" id="name" class="form-control" v-model="modifybkinfo.bookname">
                        </div>
                        <div class="form-group">
                            <label for="au">作者:</label>
                            <input type="text" id="au" class="form-control" v-model="modifybkinfo.bookauthor">
                        </div>
                        <div class="form-group">
                            <label for="pub">出版社:</label>
                            <input type="text" id="pub" class="form-control" v-model="modifybkinfo.bookpublisher">
                        </div>
                        <div class="form-group">
                            <label for="time">出版时间:</label>
                            <input type="date" id="time" class="form-control" v-model="modifybkinfo.bookdate">
                        </div>
                        <div class="form-group">
                            <label for="restbk">剩余数量:</label>
                            <input type="number" id="restbk" class="form-control" v-model="modifybkinfo.booknumber">
                        </div>
                        <div class="form-group">
                            <label for="status">借阅状态:</label>
                            <input type="text" id="status" class="form-control" v-model="modifybkinfo.bookstatus">
                        </div>
                        <!-- 其实也能放入图片 -->
                        <div class="form-group">
                            <button class="fixbk" @click="showmodifybkinfo()">修改</button>
                            <button @click="showModel5 = false" class="quit">关闭</button>
                        </div>
                    </form>
                </div>
            </div>

            <div v-if="selectedMenu === 'books'" class="container">
                <div class="bimg"></div>
                <button class="add-button" @click="showModel4 = true"><i class="fas fa-book"></i> 添加图书</button>
                <button class="search-button2" @click="showModel3 = true"><i class="fas fa-search"></i> 搜索一下</button>

                <table>
                    <tr style="font-weight: bold;background-color: rgba(202, 57, 57, 0.5);">
                        <td>书名</td>
                        <td>作者</td>
                        <td>出版社</td>
                        <td>出版时间</td>
                        <td>剩余数量</td>
                        <td>借阅状态</td>
                        <td>操作:修改 / 删除</td>
                    </tr>
                    <tr v-for="item in bookTotal">
                        <td>{{ item.bookName }}</td>
                        <td>{{ item.bookAuthor }}</td>
                        <td>{{ item.bookPublisher }}</td>
                        <td>{{ item.bookDate }}</td>
                        <td>{{ item.bookNumber }}</td>
                        <td>{{ item.bookStatus }}</td>
                        <td>
                            <form action="" @submit="handleSubmit">
                                <button class="act addin" @click="showModel5 = true">修改</button>&nbsp&nbsp&nbsp<button
                                    class="act del" @click="deleteItem(item)">删除</button>
                            </form>
                        </td>
                    </tr>
                </table>
                <el-pagination class="pagination-container" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                    layout="prev, pager, next" :total="bookTotal.length">
                </el-pagination>
            </div>

            <!-- 弹窗1-1 -->
            <div v-if="showModel" class="Model">
                <div class="search-container">
                    <form class="search-form" @submit.prevent="">
                        <p>用户搜索</p>
                        <div class="form-group">
                            <label for="name">用户名:</label>
                            <input type="text" id="name" class="form-control" v-model="searchuser.username">
                        </div>
                        <div class="form-group">
                            <label for="au">借书名:</label>
                            <input type="text" id="au" class="form-control" v-model="searchuser.userborrow">
                        </div>
                        <div class="form-group">
                            <label for="bknum">借书数量:</label>
                            <input type="number" id="bknum" class="form-control" v-model="searchuser.borrownum">
                        </div>
                        <div class="form-group">
                            <label for="time">借书时间:</label>
                            <input type="date" id="time" class="form-control" v-model="searchuser.userborrowtime">
                        </div>
                        <div class="form-group">
                            <label for="ret">还书时间:</label>
                            <input type="date" id="ret" class="form-control" v-model="searchuser.userreturntime">
                        </div>
                        <div class="form-group">
                            <label for="mail">用户邮箱:</label>
                            <input type="email" id="mail" class="form-control" v-model="searchuser.usermail">
                        </div>
                        <div class="form-group">
                            <button class="searchbk" @click="showsearchuser()">查找</button>
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
                            <input type="text" id="name" class="form-control" v-model="modifyuserinfo.username">
                        </div>
                        <div class="form-group">
                            <label for="au">用户借书:</label>
                            <input type="text" id="au" class="form-control" v-model="modifyuserinfo.userborrow">
                        </div>
                        <div class="form-group">
                            <label for="bknum">借书数量:</label>
                            <input type="number" id="bknum" class="form-control" v-model="modifyuserinfo.borrownum">
                        </div>
                        <div class="form-group">
                            <label for="time">借书时间:</label>
                            <input type="date" id="time" class="form-control" v-model="modifyuserinfo.userborrowtime">
                        </div>
                        <div class="form-group">
                            <label for="ret">还书时间:</label>
                            <input type="date" id="ret" class="form-control" v-model="modifyuserinfo.userreturntime">
                        </div>
                        <div class="form-group">
                            <label for="mail">用户邮箱:</label>
                            <input type="email" id="mail" class="form-control" v-model="modifyuserinfo.usermail">
                        </div>
                        <!-- 其实也能放入图片 -->
                        <div class="form-group">
                            <button class="addbk" @click="showmodifyuserinfo()">修改</button>
                            <button @click="showModel2 = false" class="quit">关闭</button>
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="selectedMenu === 'borrow'">
                <div class="container">
                    <div class="bg-image">
                    </div>

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
                        <tr v-for="item in borrowTotal">
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

            <!-- 弹窗3-1 -->
            <div v-if="showModel6" class="Model">
                <div class="search-container">
                    <form class="search-form" @submit.prevent="">
                        <p>预约搜索</p>
                        <div class="form-group">
                            <label for="name">用户名:</label>
                            <input type="text" id="name" class="form-control" v-model="searchorder.username">
                        </div>
                        <div class="form-group">
                            <label for="bkname">申请书名:</label>
                            <input type="text" id="bkname" class="form-control" v-model="searchorder.userorder">
                        </div>
                        <div class="form-group">
                            <label for="ordertime">申请时间:</label>
                            <input type="date" id="ordertime" class="form-control" v-model="searchorder.userordertime">
                        </div>

                        <div class="form-group">
                            <label for="mail">用户邮箱:</label>
                            <input type="email" id="mail" class="form-control" v-model="searchorder.usermail">
                        </div>
                        <div class="form-group">
                            <label for="ordernum">申请数量:</label>
                            <input type="number" id="ordernum" class="form-control" v-model="searchorder.ordernum">
                        </div>
                        <div class="form-group">
                            <button class="searchbk" @click="showsearchorder">查找</button>
                            <button @click="showModel6 = false" class="quit">关闭</button>
                        </div>
                    </form>
                </div>
            </div>

            <div v-if="selectedMenu === 'orders'">
                <button class="search-button" @click="showModel6 = true"><i class="fas fa-search"></i> 搜索一下</button>
                <div class="container">
                    <div class="odimg"></div>
                    <table>
                        <tr style="font-weight: bold;background-color: rgba(59, 215, 59, 0.5);">
                            <td>用户名</td>
                            <td>申请书名</td>
                            <td>申请时间</td>
                            <td>用户邮箱</td>
                            <td>申请数量</td>
                            <!-- <td>借阅状态</td> -->
                            <td>操作:同意 / 取消</td>
                        </tr>
                        <tr v-for="item in orderTotal">
                            <td>{{ item.userName }}</td>
                            <td>{{ item.userOrder }}</td>
                            <td>{{ item.userOrdertime }}</td>
                            <td>{{ item.userMail }}</td>
                            <!-- <td>{{ item.bookNumber }}</td> -->
                            <td>{{ item.orderNum }}</td>
                            <td>
                                <form action="" @submit="handleSubmit">
                                    <button class="act satis" @click="">同意</button>&nbsp&nbsp&nbsp<button class="act del"
                                        @click="deleteItem(item)">取消</button>
                                </form>
                            </td>
                        </tr>
                    </table>
                    <el-pagination class="pagination-container" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                        layout="prev, pager, next" :total="orderTotal.length">
                    </el-pagination>
                </div>
            </div>
            <h1 v-if="selectedMenu === 'exit'">退出系统</h1>
        </div>
    </div>
</template>
  
<script setup>
import { ElPagination } from 'element-plus';
import { ref, inject, onMounted } from 'vue'
import { useAuthStore } from "../script/auth.js"

// object
const router = inject('$router')
const http = inject('$http')
const auth = useAuthStore();

http.defaults.headers.common['Authorization'] = auth.token

// data

// 用户列表
const userTotal = ref([])

// 书目列表
const bookTotal = ref([])

// 预约列表
const orderTotal = ref([])

// 已借列表

// 申请借阅列表


const selectedMenu = ref('books')
const showModel = ref(false)
const showModel2 = ref(false)
const showModel3 = ref(false)
const showModel4 = ref(false)
const showModel5 = ref(false)
const showModel6 = ref(false)
const currentPage = ref(1)
const pageSize = ref(7)
const paginatedData = ref([])
const paginatedData2 = ref([])
const paginatedData3 = ref([])
const addbook = ref({ bookname: '', author: '', publisher: '', bookdate: '', isbn: '' })
const searchbook = ref({ bookname: '', bookauthor: '', bookpublisher: '', bookdate: '', booknumber: '' })
const searchuser = ref({ username: '', userborrow: '', borrownum: '', userborrowtime: '', userreturntime: '', usermail: '' })
const modifybkinfo = ref({ bookname: '', bookauthor: '', bookpublisher: '', bookdate: '', bookstatus: '', booknumber: '' })
const modifyuserinfo = ref({ username: '', userborrow: '', borrownum: '', userborrowtime: '', userreturntime: '', usermail: '' })
const searchorder = ref({ username: '', userorder: '', userordertime: '', usermail: '', ordernum: '' })

//lifetime
onMounted(() => {

    updatePaginatedData();
});

// ui
function select_menu(str) {
    selectedMenu.value = str

    if (str === 'books') {
        // 后端未写
    }

    if (str === 'borrow') {
        getBorrowBookList()
    }

    if (str === 'users') {
        getAllReader()
    }

    if (str === 'orders') {

    }
}

// button


// nav
function exit() {
    auth.logout()
    router.replace('/admin_login')
}

// function 
function handleSizeChange(val) {
    pageSize.value = val;
    updatePaginatedData();  // 更新数据的方法
};

function handleCurrentChange(val) {
    currentPage.value = val;
    updatePaginatedData();  // 更新数据的方法
};

function updatePaginatedData() {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;


    paginatedData.value = userTotal.value.slice(start, end);
    paginatedData2.value = bookTotal.value.slice(start, end);
    paginatedData3.value = orderTotal.value.slice(start, end);
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


function reset(obj) {
    Object.keys(obj).forEach(key => {
        obj[key] = '';
    });
}


// #region request

// administer - Account
function getAllReader() {
    http.get('/api/admin/getAllReader?page=1&pageSize=10')
        .then(response => {
            console.log("getAllReader: ", response.data)
            userTotal.value = response.data.data
        })
        .catch(error => {
            console.log(error)
        })
}


function deleteReader() {

    const config = {
        params: {
            id: 11
        }
    }

    http.get('/api/admin/deleteReader', config)
        .then(response => {
            console.log("deleteReader: ", response.data)
        }).catch(error => {
            console.log(error)
        })
}



function updateReader() {

    const body = {
        name: "zhangsan",
        telephoneNumber: "1103",
        email: "1256852079@shu.edu.cn",
        id: 11
    }

    http.post('/api/admin/updateReader', body).then(response => {
        console.log("updateReader: ", response.data)
    }).catch(error => {
        console.log(error)
    })
}

// administer - bookinfo

function getBook_admin() {
    http.post('/api/bookInfo/admin/getBookInfo?page=1&pageSize=10', {
        "isbn": null,
        "location": null,
        "state": null,
        "id": null
    }).then(response => {
        console.log("getBook_admin: ", response.data)
    }).catch(error => {
        console.log("getBook_admin request fail", error)
    })
}

function addBook_admin() {
    http.post('/api/bookInfo/admin/addBookInfo', {
        "isbn": "9786263495630",
        "location": "图书流通室"
    }).then(response => {
        console.log("addBook_admin: ", response.data)
    }).catch(error => {
        console.log(error)
    })
}

function updateBook_admin() {
    http.post('/api/bookInfo/admin/updateBookInfo', {
        "location": null,
        "id": 35,
        "librarianJobNumber": 2
    }).then(response => {
        console.log("updateBook_admin: ", response.data)
    }).catch(error => {
        console.log(error)
    })
}

function deleteBook_admin() {
    http.post('/api/bookInfo/admin/deleteBookInfo', {
        "isbn": "9789577627452",
        "location": null,
        "state": null,
        "id": null
    }).then(response => {
        console.log("deleteBook_admin: ", response.data)
    }).catch(error => {
        console.log(error)
    })
}


// administer - BookCatalog

function addBookCatalog() {

    console.log('addBookCatalog check data: ', addbook.value)


    http.post('/api/bookCatalog/admin/addBookCatalog', {
        bookName: addbook.value.bookname,
        author: addbook.value.author,
        publisher: addbook.value.publisher,
        publishDate: addbook.value.date,
        isbn: addbook.value.isbn,
        unitPrice: null
    }).then(response => {
        console.log("addBookCatalog: ", response.data)
        if (response.data.msg === 'Success') {

        }
        else {
            console.log(response.data.msg)
        }
    }).catch(error => {
        console.log(error)
    })
}

function deleteBookCatalog() {
    http.get('/api/bookCatalog/admin/deleteBookCatalog?isbn=9789577627452')
        .then(response => {
            console.log("deleteBookCatalog: ", response.data)
            if (response.data.msg === 'Success') {

            }
            else {
                console.log(response.data.msg)
            }
        }).catch(error => {
            console.log(error)
        })
}

function modifyBookCatalog() {
    http.post('/api/bookCatalog/admin/modifyBookCatalog', {
        "bookName": "窗裡有什麼? ",
        "author": "卡特琳娜.葛蕾克",
        "publisher": "上誼文化",
        "publishDate": "",
        "isbn": "9789577627452",
        "unitPrice": 20
    }).then(response => {
        console.log("modifyBookCatalog: ", response.data)
        if (response.data.msg === 'Success') {

        }
        else {
            console.log(response.data.msg)
        }
    }).catch(error => {
        console.log(error)
    })
}

function updateBookCatalogCover() {

    var fileInput = document.getElementById('input-cover');
    var file = fileInput.files[0];

    console.log(file)

    var formData = new FormData();
    formData.append('file', file);

    http.post('/api/bookCatalog/admin/updateBookCatalogCover?isbn=9789577627452', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log("updateBookCatalogCover: ", response.data)
        if (response.data.msg === 'Success') {
            book_cover.value = response.data.data.url
        }
        else {
            console.log(response.data.msg)
        }
    }).catch(error => {
        console.log(error)
    })
}


// administer - borrow
function getBorrowBookList() {
    const path = '/api/bookBorrow/admin/getBorrowBookList?page=1&pageSize=10'
    const body = {
        "dueTime": null,
        "borrowTime": null,
        "librarianJobNumber": null,
        "bookId": null,
        "state": null,
        "readerId": null,
        "returnTime": null,
        "borrowId": null
    }

    http.post(path, body)
        .then(response => {
            console.log('getBorrowBookList', response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


function updataBorrowBookList() {
    const path = '/api/bookBorrow/admin/updateBorrowBookList'
    const body = {
        "dueTime": null,
        "borrowTime": null,
        "librarianJobNumber": 1,
        "state": null,
        "returnTime": null,
        "borrowId": 2
    }

    http.post(path, body)
        .then(response => {
            console.log('updataBorrowBookList', response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


function deleteBorrowBookList() {
    const body = {
        dueTime: null,
        borrowTime: null,
        librarianJobNumber: null,
        state: null,
        returnTime: null,
        borrowId: null
    }

    http.delete('/api/bookBorrow/admin/deleteBorrowBookList', body)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
}

// administer - reservation

function addReservation() {
    const path = '/api/Reservation/admin/addReservation'
    const body = {
        "reservationTime": "2016-03-09T22:18:26.625Z",
        "reservationDeadline": "2016-03-15T22:18:26.625Z",
        "isbn": "9789577627452",
        "readerId": 1
    }

    http.post(path, body)
        .then(response => {
            console.log('addReservation: ', response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

function deleteReservation() {
    const path = '/api/Reservation/admin/deleteReservation?reservationId=1'

    http.get(path)
        .then(response => {
            console.log('deleteReservation: ', response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

function queryReservation() {
    const path = '/api/Reservation/admin/queryReservation?page=1&pageSize=10'
    const body = {
        "reservationTime": null,
        "reservationDeadline": null,
        "isbn": null,
        "readerId": null,
        "state": null,
        "librarianJobNumber": null,
        "reservationId": null
    }
    http.post(path, body)
        .then(response => {
            console.log('queryReservation: ', response.data)
        })
        .catch(error => {
            console.log(error)
        })

}

function getReservationBook() {
    const path = '/api/Reservation/admin/getReservationBook'

    const body = {
        "dueTime": "2024-01-15T22:18:26.625Z",
        "readerId": 11,
        "isbn": 121
    }

    http.post(path, body)
        .then(response => {
            console.log('getReservationBook: ', response.data)
        })
        .catch(error => {
            console.log(error)
        })
}
// #endregion


</script>
  
<style scoped>
.admin-container {
    display: flex;
    font-family: Arial, sans-serif;
}

.sidebar {
    /* position: fixed; */
    width: 16%;
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

.sidebar>ul>li>.exit-btn:hover {
    background-color: #dc3545;
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

.bg-image {
    background-image: url("/assets/img/master2.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 16%;
    width: 90%;
    height: 100%;
    z-index: -1;
}

.bimg {
    background-image: url("/assets/img/master.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 16%;
    width: 90%;
    height: 100%;
    z-index: -1;
}


.odimg {
    background-image: url("/assets/img/nekoneko.png");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 16%;
    width: 90%;
    height: 100%;
    z-index: -1;
}

/* .container {
    position: fixed;
    left: 16%;
} */
.add-button {
    margin: 20px 0px 20px 0px;
    padding: 10px 20px;
    font-size: 16px;
    width: 13%;
    position: relative;
    left: 60%;
    color: rgb(0, 0, 0);
    background-color: rgba(119, 255, 0, 0.7);
    border: none;
    border-radius: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: background-color 0.3s ease;
    transition: font-weight 0.3s ease;
}

.add-button:hover {
    background-color: rgba(119, 255, 0, 1);
    animation: bounce 0.3s forwards;
    font-weight: bold;
}

.search-button,
.search-button2 {
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: background-color 0.3s ease;
    transition: font-weight 0.3s ease;
}

.search-button2 {
    left: 70%;
}

.search-button:hover,
.search-button2:hover {
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

.satis {
    color: white;
    background-color: rgba(231, 79, 79, 0.7);
}

.satis:hover {
    animation: bounce 0.3s forwards;
    background-color: rgba(231, 79, 79, 1);
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
.search-form2,
.search-form3,
.search-form4 {
    width: 30%;
    margin: auto;
    background-color: #fefefe;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 20px;
}

.search-form p,
.search-form2 p,
.search-form3 p,
.search-form4 p {
    position: relative;
    text-align: center;
    font-size: 32px;
    color: #0056b3;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
}

.search-form p::before,
.search-form2 p::before,
.search-form3 p::before,
.search-form4 p::before {
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

.search-form3 p,
.search-form4 p {
    color: rgb(40, 167, 69);
}

.search-form3 p::before,
.search-form4 p::before {
    background-color: rgb(40, 167, 69);
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
    margin-left: 20px;
    margin-right: 5px;
    margin-top: 8px;
    margin-bottom: 3px;
    color: rgb(56, 56, 56);
}

.form-group input {
    display: inline-block;
    width: 68%;
    height: 32px;
    padding: 0 12px;
    margin-left: 5px;
    outline: none;
    border: none;
    border-radius: 8px;
    box-shadow: 0 5px 10px 5px rgba(47, 45, 45, 0.08);
    font-size: 16px;
    background-color: #e9e7ee;
    font-weight: 600;
}

.searchbk,
.addbk,
.fixbk,
.addbk2 {
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
.addbk:hover,
.fixbk:hover,
.addbk2:hover {
    background-color: #0056b3;
}

.fixbk,
.addbk2 {
    background-color: rgb(40, 167, 69);
}

.fixbk:hover,
.addbk2:hover {
    background-color: rgb(11, 87, 29);
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
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
</style>