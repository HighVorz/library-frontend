<template>
    <div class="header">
        <marquee>
            <h1>欢迎来到图书借阅系统</h1>
        </marquee>
    </div>
    <div class="divider"></div>
    <!-- 弹窗一 -->
    <div v-if="showModal" class="modal">
        <div class="search-container">
            <form class="search-form">
                <p>图书搜索</p>
                <div class="form-group">
                    <label for="name">书名:</label>
                    <input type="text" id="name" class="form-control">
                </div>
                <div class="form-group">
                    <label for="au">作者:</label>
                    <input type="text" id="au" class="form-control">
                </div>
                <div class="form-group">
                    <label for="time">出版时间:</label>
                    <input type="date" id="time" class="form-control">
                </div>
                <div class="form-group">
                    <label for="pub">出版社:</label>
                    <input type="text" id="pub" class="form-control">
                </div>
                <div class="form-group">
                    <button class="addbk">查找</button>
                    <button @click="showModal = false" class="quit">关闭</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 弹窗二 -->
    <div v-if="showChoose" class="modal2">
        <div class="search-container2">
            <form class="search-form2">
                <p class="choosebook">《{{ selectedBook.bookName }}》详情</p>
                <img class="book-image" :src="selectedBook.bookRef" title="真的没有其他的了">
                <!-- 在加上一些主页没有显示的类似数量之类的信息 -->
                <p class="booknum">此书剩余数量:{{ selectedBook.bookNumber }}</p>
                <p class="bookloc">此书位置:{{ selectedBook.bookLocate }}</p>
                <div class="funcbutton">
                    <button class="form-button borrow-btn" @click.prevent="borrowBook">借阅</button>
                    <button class="form-button keep-btn" @click.prevent="keepBook">续借</button>
                    <button class="form-button" @click="showChoose = false">关闭</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 弹窗二-1 -->
    <div v-if="erjishowbr" class="modal2-1">
        <div class="search-container2-1">
            <form class="search-form2-1">
                <input type="text" class="userbr" v-model="brnum" placeholder="请输入借阅个数...">
                <div class="funcbutton">
                    <button class="form-button borrow-btn" @click="borrowBookfin" style="margin-right: 62%;">借阅</button>
                    <button class="form-button" @click="erjishowbr = false">关闭</button>
                </div>
            </form>
        </div>
    </div>
    <!-- 弹窗二-2 -->
    <div v-if="erjishowkp" class="modal2-1">
        <div class="search-container2-1">
            <form class="search-form2-1">
                <input type="text" class="userbr" v-model="brnum" placeholder="请输入续借时长(天)...">
                <div class="funcbutton">
                    <button class="form-button keep-btn" @click="keepBookfin" style="margin-right: 62%;">续借</button>
                    <button class="form-button" @click="erjishowbr = false">关闭</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 主页面 -->
    <div class="mixed">
        <h2>可借阅图书列表</h2>
        <p class="bar" style="display: inline-block;">需要借阅书籍的点击书本图片进入书本详情进行借阅即可</p>
        <button class="search_book" @click="showModal = true"><i class="fas fa-search"></i> 搜索书籍</button>
        <button class="exitbk" @click="handleLogout"><i class="fas fa-sign-out-alt"></i>注销账户</button>
        <div class="container">
            <div class="book" v-for="item in paginatedData">
                <h3 style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">《{{ item.bookName }}》</h3>
                <img :src="item.bookRef" @click="handleimgClick(item)">
                <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">作者:<a :href="'/?/' + item.bookAuthor" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">出版社:<a :href="'/?/' + item.bookPublisher" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">出版日期:{{ item.bookDate }}</p>
                <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">可借阅状态:{{ item.bookStatus }}</p>
            </div>
        </div>
        <ElPagination class="pagination-container" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="bookTotal.length">
        </ElPagination>
    </div>
    <hr>
    <div class="footer">
        <div class="contact">
            <p style="color:#6e6969;">QQ：2055318980 / Mail：2055318980@qq.com / Tel：15257896475</p>
            <p style="color:#6e6969;">点击下方图标与我联系</p>
        </div>
        <div class="icon_set">
            <a href="tencent://message/?uin=2055318980&Site=qq&Menu=yes"><img src="/assets/img/QQ.png" width="50px"
                    height="50px"></a>
            <a href="mailto:2055318980@qq.com"><img src="/assets/img/mail.png" width="50px" height="50px"></a>
        </div>
    </div>
</template>

<script>
import { ElPagination } from 'element-plus';
export default {
    components: {
        ElPagination
    },
    data() {
        return {
            showModal: false,
            showChoose: false,
            erjishowbr: false,
            erjishowkp: false,
            brnum: '',
            selectedBook: [],
            // 这个对象是需要从后端获取的,进行覆盖就能刷新前端的页面了
            bookTotal: [],
            currentPage: 1,
            pageSize: 15,
            paginatedData: [],
        }
    },
    async created() {
        const response = await fetch('/data.json');
        if (response.ok) {
            this.bookTotal = await response.json();
        } else {
            console.error('Failed to load data.json:', response.status, response.statusText);
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.updatePaginatedData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.updatePaginatedData();
        },
        updatePaginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            this.paginatedData = this.bookTotal.slice(start, end);
        },
        handleimgClick(book) {
            if (book.bookStatus === '否') {
                alert("《" + book.bookName + "》已被借完o（＞︿＜）o");
                return;
            }
            alert("即将为你展示《" + book.bookName + "》的详情<(￣︶￣)↗[GO!]");
            this.showChoose = true;
            this.selectedBook = book;
        },
        handleLogout() {
            this.$router.push('/login')
        },
        keepBook() {
            this.erjishowkp = "true";
        },
        borrowBook() {
            this.erjishowbr = "true";
        },
        borrowBookfin() {
            alert("借阅成功");
        },
        keepBookfin() {
            alert("续借成功");
        },
    },
    watch: {
        showModal(val) {
            if (val) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'auto'
            }
        },
        showChoose(val) {
            if (val) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'auto'
            }
        },
        bookTotal: {
            deep: true,
            handler() {
                this.updatePaginatedData();
            }
        }
    },
}
</script>

<style scoped>
.header {
    background: url('/assets/img/cloud.jpg') center/cover no-repeat;
    color: rgb(36, 93, 116);
    font-size: large;
    text-align: center;
    text-shadow: -2px 0 rgb(255, 0, 0), 0 2px rgb(255, 0, 0), 2px 0 rgb(255, 0, 0), 0 -2px rgb(255, 0, 0);
}

.mixed>.bar {
    font-weight: bold;
    font-size: large;
    background: linear-gradient(270deg, #d53369, #daae51, #e91e63, #283c86);
    background-size: 800% 800%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: auto;
    width: 30%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    animation: AnimationName 3s ease infinite;
}

.divider {
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
    position: absolute;
    right: 15%;
    margin-top: 20px;
    width: 8%;
    height: 36px;
    background-color: rgba(0, 123, 255, 0.8);
    color: #e2dbdb;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.search_book:hover {
    background-color: rgba(0, 123, 255, 1);
    color: #ffffff;
    animation: bounce 0.3s forwards;
}

.exitbk {
    position: absolute;
    right: 3%;
    margin-top: 20px;
    width: 8%;
    height: 36px;
    background-color: rgba(255, 0, 0, 0.8);
    color: #e2dbdb;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.exitbk:hover {
    background-color: rgba(255, 0, 0, 1);
    color: #ffffff;
    animation: bounce 0.3s forwards;
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-5px);
    }
}

.mixed {
    background-attachment: fixed;
    box-sizing: border-box;
}


.mixed h2 {
    margin: 10px;
    width: 300px;
    display: inline-block;
    font-size: 36px;
    color: #d6a8a8;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.book {
    width: 16%;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin: 10px 2% 10px 2%;
    background-color: rgb(255, 255, 255, 0.8);
    box-sizing: border-box;
    overflow: hidden;
}

.book:hover {
    background-color: rgb(255, 255, 255, 1);
}

.pagination-container {
    display: flex;
    justify-content: center;
}

.book p {
    margin: 2px;
    font-size: small;
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
    left: 10%;
    width: 80%;
    height: 60%;
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.book img:hover {
    transform: scale(1.1);
}

.leader {
    padding-left: 10px;
    color: #333;
}


h3 {
    text-align: center;
    margin: 8px;
    font-size: 16px;
}

.borrow-btn {
    background-color: #008CBA;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
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
    cursor: pointer;
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

.modal {
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

.modal2 {
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
    margin-top: 10%;
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

.keep-btn {
    background-color: #ffc107;
}

.keep-btn:hover {
    background-color: #d39e00;
}

.modal2-1 {
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

.userbr {
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
}
</style>