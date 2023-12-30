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
                    <label for="num">数量:</label>
                    <input type="number" id="num" class="form-control">
                </div>
                <div class="form-group">
                    <label for="pub">出版社:</label>
                    <input type="text" id="pub" class="form-control">
                </div>
                <div class="form-group">
                    <label for="money">单价:</label>
                    <input type="number" id="money" class="form-control">
                </div>
                <div class="form-group">
                    <button class="addbk">查找图书</button>
                    <button @click="showModal = false" class="quit">关闭</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 弹窗二 -->
    <div v-if="showChoose" class="modal2">
        <div class="search-container2">
            <form class="search-form2">
                <p class="choosebook">《{{ selectedBook.bookName }}》详细情况</p>
                <img class="book-image" :src="selectedBook.bookRef">
                <!-- 在加上一些主页没有显示的类似数量之类的信息 -->
                <button class="form-button" @click="showChoose = false">关闭</button>
                <button class="form-button borrow-btn">借阅</button>
                <button class="form-button keep-btn">续借</button>
            </form>
        </div>
    </div>

    <!-- 主页面 -->
    <div class="mixed">
        <h2>可借阅图书列表</h2>
        <!-- <video autoplay muted loop id="myVideo">
            <source src="/assets/img/lib_learning.mp4" type="video/mp4">
        </video> -->
        <button class="search_book" @click="showModal = true"><i class="fas fa-search"></i> 搜索书籍</button>
        <button class="exitbk" @click="handleLogout"><i class="fas fa-sign-out-alt"></i>注销账户</button>
        <div class="container">
            <div class="book" v-for="item in bookTotal">
                <h3>《{{ item.bookName }}》</h3>
                <img :src="item.bookRef" @click="handleimgClick(item)">
                <p>作者:<a :href="'/?/' + item.bookAuthor" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                <p>出版社:<a :href="'/?/' + item.bookPublisher" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                <p>出版日期:{{ item.bookDate }}</p>
                <p>可借阅状态:{{ item.bookStatus }}</p>
            </div>

            <div class="book" v-for="item in bookTotal">
                <h3>《{{ item.bookName }}》</h3>
                <img :src="item.bookRef" @click="handleimgClick(item)">
                <p>作者:<a :href="'/?/' + item.bookAuthor" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                <p>出版社:<a :href="'/?/' + item.bookPublisher" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                <p>出版日期:{{ item.bookDate }}</p>
                <p>可借阅状态:{{ item.bookStatus }}</p>
            </div>

            <div class="book" v-for="item in bookTotal">
                <h3>《{{ item.bookName }}》</h3>
                <img :src="item.bookRef" @click="handleimgClick(item)">
                <p>作者:<a :href="'/?/' + item.bookAuthor" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                <p>出版社:<a :href="'/?/' + item.bookPublisher" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                <p>出版日期:{{ item.bookDate }}</p>
                <p>可借阅状态:{{ item.bookStatus }}</p>
            </div>

            <div class="book" v-for="item in bookTotal">
                <h3>《{{ item.bookName }}》</h3>
                <img :src="item.bookRef" @click="handleimgClick(item)">
                <p>作者:<a :href="'/?/' + item.bookAuthor" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                <p>出版社:<a :href="'/?/' + item.bookPublisher" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                <p>出版日期:{{ item.bookDate }}</p>
                <p>可借阅状态:{{ item.bookStatus }}</p>
            </div>

            <div class="book" v-for="item in bookTotal">
                <h3>《{{ item.bookName }}》</h3>
                <img :src="item.bookRef" @click="handleimgClick(item)">
                <p>作者:<a :href="'/?/' + item.bookAuthor" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                <p>出版社:<a :href="'/?/' + item.bookPublisher" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                <p>出版日期:{{ item.bookDate }}</p>
                <p>可借阅状态:{{ item.bookStatus }}</p>
            </div>
        </div>
    </div>
    <!-- <pagination :data="bookTotal" @pagination-change-page="getResults"></pagination> -->
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
// import Pagination from 'vue-pagination-2';

export default {
    data() {
        return {
            // page:1,
            // perPage: 8,
            // pages:[],
            showModal: false,
            showChoose: false,
            selectedBook: [],
            // 这个对象是需要从后端获取的,进行覆盖就能刷新前端的页面了
            bookTotal: []
        }
    },
    // components: {
    //     Pagination
    // },
    // computed: {
    //     paginatedData() {
    //         return this.pages[this.page];
    //     },
    // },
    async created() {
        const response = await fetch('/data.json');
        if (response.ok) {
            this.bookTotal = await response.json();
        } else {
            console.error('Failed to load data.json:', response.status, response.statusText);
        }
    },
    methods: {
        handleimgClick(book) {
            if (book.bookStatus === '否') {
                alert("《" + book.bookName + "》已被借完o（＞︿＜）o");
                return;
            }
            alert("您已成功借阅《" + book.bookName + "》<(￣︶￣)↗[GO!]");
            this.showChoose = true;
            this.selectedBook = book;
        },
        handleLogout() {
            this.$router.push('/login')
        },
        // getResults(page) {
        //     this.page = page;
        //     this.pages = _.chunk(this.bookTotal, this.perPage);
        // }
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
        }
    }
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
    width: 110px;
    height: 36px;
    background-color: rgba(0, 123, 255, 0.8);
    color: #e2dbdb;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    font-size: 16px;
}

.search_book:hover {
    background-color: rgba(0, 123, 255, 1);
    color: #ffffff;
}

.exitbk {
    position: absolute;
    right: 3%;
    margin-top: 20px;
    width: 110px;
    height: 36px;
    background-color: rgba(255, 0, 0, 0.8);
    color: #e2dbdb;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    font-size: 16px;
}

.exitbk:hover {
    background-color: rgba(255, 0, 0, 1);
    color: #ffffff;
}

.mixed {
    background: url('/assets/img/lib_learning.gif') center/cover no-repeat;
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
    width: 15%;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    background-color: rgb(255, 255, 255, 0.8);
    box-sizing: border-box;
    overflow: hidden;
}

.book:hover {
    background-color: rgb(255, 255, 255, 1);
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
    width: 60px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 5px;
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
    font-size: 32px;
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
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
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
}</style>