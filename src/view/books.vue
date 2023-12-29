<template>
    <div class="header">
        <marquee><h1>欢迎来到图书借阅系统</h1></marquee>
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
                <p class="choosebook">《{{ selectedBookName }}》的详细情况</p>
                <button @click="showChoose = false">关闭</button>
            </form>
        </div>
    </div>

    <!-- 主页面 -->
    <div class="mixed">
        <h2>可借阅图书列表</h2>
        <button class="search_book" @click="showModal = true"><i class="fas fa-search"></i>  搜索书籍</button>
        <button class="exitbk" @click="handleLogout"><i class="fas fa-sign-out-alt"></i>注销账户</button>
        <div class="container">
            <div class="book" v-for="item in bookTotal">
                <h3>《{{ item.bookName }}》</h3>
                <img :src="item.bookRef" @click="handleimgClick(item.bookName)">
                <p>作者:<a href="https://www.baidu.com" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                <p>出版社:<a href="https://www.wangyi.com" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                <p>出版日期:{{ item.bookDate }}</p>
                <p>可借阅状态:{{ item.bookStatus }}</p>
            </div>

            <div class="book" v-for="item in bookTotal">
                <h3>《{{ item.bookName }}》</h3>
                <img :src="item.bookRef" @click="borrowBook(item.bookName)">
                <p>作者:<a href="https://www.baidu.com" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                <p>出版社:<a href="https://www.wangyi.com" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                <p>出版日期:{{ item.bookDate }}</p>
                <p>可借阅状态:{{ item.bookStatus }}</p>
            </div>

            <div class="book" v-for="item in bookTotal">
                <h3>《{{ item.bookName }}》</h3>
                <img :src="item.bookRef" @click="borrowBook(item.bookName)">
                <p>作者:<a href="https://www.baidu.com" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                <p>出版社:<a href="https://www.wangyi.com" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                <p>出版日期:{{ item.bookDate }}</p>
                <p>可借阅状态:{{ item.bookStatus }}</p>
            </div>

            <div class="book" v-for="item in bookTotal">
                <h3>《{{ item.bookName }}》</h3>
                <img :src="item.bookRef" @click="borrowBook(item.bookName)">
                <p>作者:<a href="https://www.baidu.com" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                <p>出版社:<a href="https://www.wangyi.com" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                <p>出版日期:{{ item.bookDate }}</p>
                <p>可借阅状态:{{ item.bookStatus }}</p>
            </div>

            <div class="book" v-for="item in bookTotal">
                <h3>《{{ item.bookName }}》</h3>
                <img :src="item.bookRef" @click="borrowBook(item.bookName)">
                <p>作者:<a href="https://www.baidu.com" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                <p>出版社:<a href="https://www.wangyi.com" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                <p>出版日期:{{ item.bookDate }}</p>
                <p>可借阅状态:{{ item.bookStatus }}</p>
            </div>
        </div>
    </div>
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

export default {
    data() {
        return {
            showModal: false,
            showChoose: false,
            selectedBookName: "",
            // 这个对象是需要从后端获取的,进行覆盖就能刷新前端的页面了
            bookTotal: [
                {
                    bookName: "计算机体系结构",
                    bookAuthor: "钱璟丰",
                    bookPublisher: "机械工业出版社",
                    bookDate: "2023-12-27",
                    bookStatus: "是",
                    bookRef: "/assets/img/计算机体系结构.jpg"
                },
                {
                    bookName: "算法导论",
                    bookAuthor: "钱璟丰",
                    bookPublisher: "MIT Press",
                    bookDate: "2023-12-27",
                    bookStatus: "是",
                    bookRef: "/assets/img/算法导论.jpg"
                },
                {
                    bookName: "计算机网络",
                    bookAuthor: "钱璟丰",
                    bookPublisher: "清华大学出版社",
                    bookDate: "2023-12-27",
                    bookStatus: "是",
                    bookRef: "/assets/img/计算机网络.jpg"
                },
                {
                    bookName: "计算机图形学",
                    bookAuthor: "钱璟丰",
                    bookPublisher: "机械工业出版社",
                    bookDate: "2023-12-27",
                    bookStatus: "是",
                    bookRef: "/assets/img/计算机图形学.jpg"
                },
                {
                    bookName: "计算机组成与设计",
                    bookAuthor: "钱璟丰",
                    bookPublisher: "Morgan Kaufmann",
                    bookDate: "2023-12-28",
                    bookStatus: "否",
                    bookRef: "/assets/img/计算机组成与设计.jpg"
                },
                {
                    bookName: "操作系统概念",
                    bookAuthor: "钱璟丰",
                    bookPublisher: "人民邮电出版社",
                    bookDate: "2023-2-27",
                    bookStatus: "是",
                    bookRef: "/assets/img/操作系统概念.jpg"
                },
                {
                    bookName: "数据库系统原理",
                    bookAuthor: "钱璟丰",
                    bookPublisher: "机械工业出版社",
                    bookDate: "2023-1-2",
                    bookStatus: "是",
                    bookRef: "/assets/img/数据库系统原理.jpg"
                },
                {
                    bookName: "算法设计与分析",
                    bookAuthor: "钱璟丰",
                    bookPublisher: "清华大学出版社",
                    bookDate: "2023-12-7",
                    bookStatus: "否",
                    bookRef: "/assets/img/算法设计与分析.jpg"
                }]
        }
    },
    methods: {
        handleimgClick(bookName) {
            alert("您已成功借阅《" + bookName + "》");
            this.showChoose = true;
            this.selectedBookName = bookName;
        },
        handleLogout() {
            this.$router.push('/login')
        }
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
    background-color: black;
}

.search_book {
    position: absolute;
    right:15%;
    margin-top: 20px;
    width: 110px;
    height: 36px;
    background-color: rgba(0, 123, 255, 0.8);
    color: #e2dbdb;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
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
    cursor: pointer;
    font-size: 16px;
}

.exitbk:hover {
    background-color: rgba(255, 0, 0, 1);
    color: #ffffff;
}
.mixed {
    background: url('/assets/img/librarylearning.png') center/cover no-repeat;
    background-attachment: fixed;
    box-sizing: border-box;
}
.mixed h2 {
    margin: 10px;
    width:300px;
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
    cursor: pointer;
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
    cursor: pointer;
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
    cursor: pointer;
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
</style>