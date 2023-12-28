<template>
    <div class="header">
        <h1>欢迎来到图书借阅系统</h1>
    </div>
    <div class="choose">
        <form class="form-inline">
            <div class="form-group">
                <label for="name">书名:</label>
                <input type="text" id="name" class="form-control">
                <label for="au">作者:</label>
                <input type="text" id="au" class="form-control">
                <label for="num">数量:</label>
                <input type="number" id="num" class="form-control">
                <label for="pub">出版社:</label>
                <input type="text" id="pub" class="form-control">
                <label for="money">单价:</label>
                <input type="number" id="money" class="form-control">
                <input type="button" id="addBook" class="add btn btn-primary" value="查找图书" />
            </div>
        </form>
    </div>
    <div class="leader">
        <h2>可借阅图书列表</h2>
    </div>
    <div class="container">
        <div class="book" v-for="item in bookTotal">
            <h3>《{{ item.bookName }}》</h3>
            <img :src="item.bookRef" @click="borrowBook(item.bookName)">
            <p>作者:{{ item.bookAuthor }}</p>
            <p>出版社:{{ item.bookPublisher }}</p>
            <p>出版日期:{{ item.bookDate }}</p>
            <p>可借阅状态:{{ item.bookStatus }}</p>
        </div>

        <div class="book" v-for="item in bookTotal">
            <h3>《{{ item.bookName }}》</h3>
            <img :src="item.bookRef" @click="borrowBook(item.bookName)">
            <p>作者:{{ item.bookAuthor }}</p>
            <p>出版社:{{ item.bookPublisher }}</p>
            <p>出版日期:{{ item.bookDate }}</p>
            <p>可借阅状态:{{ item.bookStatus }}</p>
        </div>

        <div class="book" v-for="item in bookTotal">
            <h3>《{{ item.bookName }}》</h3>
            <img :src="item.bookRef" @click="borrowBook(item.bookName)">
            <p>作者:{{ item.bookAuthor }}</p>
            <p>出版社:{{ item.bookPublisher }}</p>
            <p>出版日期:{{ item.bookDate }}</p>
            <p>可借阅状态:{{ item.bookStatus }}</p>
        </div>

        <div class="book" v-for="item in bookTotal">
            <h3>《{{ item.bookName }}》</h3>
            <img :src="item.bookRef" @click="borrowBook(item.bookName)">
            <p>作者:{{ item.bookAuthor }}</p>
            <p>出版社:{{ item.bookPublisher }}</p>
            <p>出版日期:{{ item.bookDate }}</p>
            <p>可借阅状态:{{ item.bookStatus }}</p>
        </div>

        <div class="book" v-for="item in bookTotal">
            <h3>《{{ item.bookName }}》</h3>
            <img :src="item.bookRef" @click="borrowBook(item.bookName)">
            <p>作者:{{ item.bookAuthor }}</p>
            <p>出版社:{{ item.bookPublisher }}</p>
            <p>出版日期:{{ item.bookDate }}</p>
            <p>可借阅状态:{{ item.bookStatus }}</p>
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
    data(){
        return{
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
        borrowBook(bookName) {
            alert("您已成功借阅《" + bookName + "》");
        }
    }
}
</script>

<style scoped>
.header {
    background: url('../assets/img/cloud.jpg') center/cover no-repeat;
    color: rgb(36, 93, 116);
    padding: 15px;
    
}

.choose {
    background-color: aqua;
    padding: 5px;
}

.form-group {
    box-sizing: border-box;
}

.form-group label {
    font-weight: bold;
    margin-right: 5px;
    margin-top: 8px;
    margin-bottom: 3px;
    color: rgb(56, 56, 56);
}

.form-control {
    width: 12%;
    height: 32px;
    padding: 0 12px;
    margin-right: 5px;
    outline: none;
    border: none;
    border-radius: 8px;
    box-shadow: 0 10px 10px 5px rgba(47, 45, 45, 0.08);
    font-size: 16px;
    background-color: #e9e7ee;
    font-weight: 600;
}

.add {
    margin-left: 20px;
    /* margin-top:5px; */
    width: 100px;
    height: 32px;
    text-align: center;
    background-color: #007bff;
    color: #e2dbdb;
    font-weight: bold;
    opacity: 0.8;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
}

.add:hover {
    color: #ffffff;
    opacity: 1;
    background-color: #0d7bf0;
}

.container {
    background: url('../assets/img/librarylearning.png') center/cover no-repeat;
    background-attachment: fixed;
    box-sizing: border-box;
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
    color: #000000;
}

/* .book a:hover {
    color: #00bfff;
    text-decoration: underline;
} */
.book img {
    position: relative;
    cursor: pointer;
    left: 10%;
    width: 80%;
    height: 60%;
    border-radius: 8px;
}

/* .book button{
    position: relative;
    left: 33%;
} */

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
</style>