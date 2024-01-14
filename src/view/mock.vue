<template>
    <h1>Api</h1>

    <h3>link</h3>
    <td>

        <a href="/administer" style="display: block;">administer</a>
        <a href="/user" style="display: block;">userspace</a>
        <a href="/search" style="display: block;">search</a>

    </td>



    <button @click="openAuth">openAuth</button>
    <button @click="closeAuth">closeAuth</button>

    <h3></h3>
    <button @click="click_users">Api users</button>
    <button @click="click_borrowlist">borrowlist</button>

    <div style="margin: 20px;">

        <h3>Administer</h3>
        <button @click="to_admin_login" style="display: block;">need login first</button>

        <div style="margin-top: 10px;">
            <h5>Account</h5>
            <button @click="getAllReader">getAllReader</button>
            <button @click="deleteReader">deleteReader</button>
            <button @click="updateReader">updateReader</button>
        </div>

        <div style="margin-top: 10px;">
            <h5>Borrow</h5>
            <button @click="getBorrowBookList">getBorrowBookList</button>
            <button @click="updataBorrowBookList">updataBorrowBookList</button>
            <button @click="deleteBorrowBookList">deleteBorrowBookList</button>
        </div>

        <div style="margin-top: 10px;">
            <h5>BookInfo</h5>
            <button @click="getBook_admin">getBook_admin</button>
            <button @click="addBook_admin">addBook_admin</button>
            <button @click="updateBook_admin">updateBook_admin</button>
            <button @click="deleteBook_admin">deleteBook_admin</button>
        </div>

        <div style="margin-top: 10px;">
            <h5>BookCatalog</h5>
            <input type="file" id="input-cover">
            <img :src="book_cover" alt="封面">

            <button @click="addBookCatalog">addBookCatalog</button>
            <button @click="deleteBookCatalog">deleteBookCatalog</button>
            <button @click="modifyBookCatalog">modifyBookCatalog</button>
            <button @click="updateBookCatalogCover">updateBookCatalogCover</button>
        </div>

        <div style="margin-top: 10px;">
            <h5>Reservation</h5>
            <button @click="addReservation">addReservation</button>
            <button @click="deleteReservation">deleteReservation</button>
            <button @click="queryReservation">queryReservation</button>
            <button @click="getReservationBook">getReservationBook</button>
        </div>
    </div>

    <div style="height: 100px;"></div>


    <!-- user -->
    <div style="margin: 20px;">
        <h3>user</h3>
        <button @click="to_user_login" style="display: block;">need login first</button>
        <div style="margin-top: 10px;">
            <h5>Account</h5>
            <input type="file" id="input-avatar">
            <img :src="user_avatar" alt="用户头像">
            <button @click="getUserInfo">getUserInfo</button>
            <button @click="updateAvatar">updateAvatar</button>
        </div>


        <div style="margin-top: 10px;">
            <h5>Reservation</h5>
            <button @click="to_user_login" style="display: block;">need login first</button>
            <button @click="addReservationReader">addReservationReader</button>
            <button @click="getReservationReader">getReservationReader</button>
            <button @click="deleteReservationReader">deleteReservationReader</button>
        </div>


        <div style="margin-top: 10px;">
            <h5>BookInfo</h5>
            <button @click="getBook_reader">getBook_reader</button>
        </div>


        <div style="margin-top: 10px;">
            <h5>BookCatalog</h5>
            <button @click="queryBookCatalog">queryBookCatalog</button>
        </div>

        <div style="margin-top: 10px;">
            <h5>Borrow</h5>
            <button @click="borrowBook">borrowBook</button>
            <button @click="returnBook">returnBook</button>
            <button @click="getBorrowBookListReader">getBorrowBookListReader</button>
        </div>

    </div>

    <div style="height: 30px;"></div>
</template>

<script setup>
import { inject, ref } from "vue"
import { useAuthStore } from "../script/auth.js"

const auth = useAuthStore();
const http = inject('$http')
const router = inject('$router')

// data
const user_avatar = ref("")
const book_cover = ref("")

http.defaults.headers.common['Authorization'] = auth.token

function to_admin_login() {
    router.push('/admin_login')
}

function to_user_login() {
    router.push('/login')
}

function click_users() {
    http.get('/api/users')
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

function click_borrowlist() {
    const body = { uid: 1 }

    http.post('api/borrowlist', body)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
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


function getUserInfo() {
    http.get('api/userInfo')
        .then(response => {
            console.log("getUserInfo: ", response.data)
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
        user_avatar.value = response.data.data.url
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


// administer - Account
function getAllReader() {
    http.get('/api/admin/getAllReader?page=1&pageSize=10')
        .then(response => {
            console.log("getAllReader: ", response.data)
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
    http.post('/api/bookCatalog/admin/addBookCatalog', {
        bookName: "我家有個小小哲學家",
        author: "史考特.赫修維茲",
        publisher: "采實文化",
        publishDate: null,
        isbn: "9786263495630",
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






function openAuth() {
    auth.openAuth = true;
}
function closeAuth() {
    auth.openAuth = false;
}


</script>