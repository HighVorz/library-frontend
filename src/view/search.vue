<template>
    <!-- 弹窗二 -->
    <div v-if="showChoose" class="Model2">
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
    <div v-if="secondborrow" class="Model2-1">
        <div class="search-container2-1">
            <form class="search-form2-1">
                <input type="number" class="userbr" v-model="brnum" placeholder="请输入借阅个数..." required>
                <div class="funcbutton">
                    <button class="form-button borrow-btn" @click="borrowBookfin">借阅</button>
                    <button class="form-button" @click="secondborrow = false">关闭</button>
                </div>
            </form>
        </div>
    </div>
    <!-- 弹窗二-2 -->
    <div v-if="secondkeep" class="Model2-1">
        <div class="search-container2-1">
            <form class="search-form2-1">
                <input type="date" class="userbr" v-model="brnum" required>
                <div class="funcbutton">
                    <button class="form-button keep-btn" @click="keepBookfin">续借</button>
                    <button class="form-button" @click="secondkeep = false">关闭</button>
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
                        <img src="/assets/img/avatar.png" alt="Avatar">
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
            <!-- <span style="margin-right: 3%;">当前用户:{{ $route.query.username }}</span>
        <p class="bar" style="display: inline-block;">需要借阅书籍的点击书本图片进入书本详情进行借阅即可</p> -->

        </div>
        <hr class="divider">
        <form class="search_bar" :class="{ focused: isFocused }">
            <div class="input_part">
                <input @focus="isFocused = true" @blur="isFocused = false" type="text" maxlength="200"
                    placeholder="按名称、作者、ISBN、出版社、MD5...搜索。">
            </div>
            <button class="search_book" type="submit"><i class="fas fa-search"></i></button>
        </form>
        <div class="container">
            <div class="book" v-for="item in paginatedData">
                <img :src="item.bookRef" @click="handleimgClick(item)" title="点击查看图书详情">
                <td>
                    <p class="bigt" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">《{{ item.bookName
                    }}》</p>
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">作者:<a
                            :href="'/?/' + item.bookAuthor" title="搜索该作者的书">{{ item.bookAuthor }}</a></p>
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">出版社:<a
                            :href="'/?/' + item.bookPublisher" title="搜索该出版社的书">{{ item.bookPublisher }}</a></p>
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">出版日期:{{ item.bookDate }}</p>
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">可借阅状态:{{ item.bookStatus }}</p>
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
import { ref, onMounted } from 'vue';
const showModel = ref(false)
const showChoose = ref(false)
const secondborrow = ref(false)
const secondkeep = ref(false)
const isFocused = ref(false)
const brnum = ref('')
const selectedBook = ref([])
// 这个对象是需要从后端获取的,进行覆盖就能刷新前端的页面了
const bookTotal = ref([
    {
        "bookName": "计算机体系结构",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "1",
        "bookRef": "/assets/img/计算机体系结构.jpg",
        "bookLocate": "图书馆1楼"
    },
    {
        "bookName": "算法导论",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "MIT Press",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "2",
        "bookRef": "/assets/img/算法导论.jpg",
        "bookLocate": "图书馆2楼"
    },
    {
        "bookName": "计算机网络",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "清华大学出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "3",
        "bookRef": "/assets/img/计算机网络.jpg",
        "bookLocate": "图书馆3楼"
    },
    {
        "bookName": "计算机图形学",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "6",
        "bookRef": "/assets/img/计算机图形学.jpg",
        "bookLocate": "图书馆大厅"
    },
    {
        "bookName": "计算机组成与设计",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "Morgan Kaufmann",
        "bookDate": "2023-12-28",
        "bookStatus": "否",
        "bookNumber": "0",
        "bookRef": "/assets/img/计算机组成与设计.jpg",
        "bookLocate": "图书馆借阅室"
    },
    {
        "bookName": "操作系统概念",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "人民邮电出版社",
        "bookDate": "2023-2-27",
        "bookStatus": "是",
        "bookNumber": "5",
        "bookRef": "/assets/img/操作系统概念.jpg",
        "bookLocate": "图书馆计算机区"
    },
    {
        "bookName": "数据库系统原理",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-1-2",
        "bookStatus": "是",
        "bookNumber": "8",
        "bookRef": "/assets/img/数据库系统原理.jpg",
        "bookLocate": "图书馆24小时自助借阅区"
    },
    {
        "bookName": "算法设计与分析",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "清华大学出版社",
        "bookDate": "2023-12-7",
        "bookStatus": "否",
        "bookNumber": "0",
        "bookRef": "/assets/img/算法设计与分析.jpg",
        "bookLocate": "图书馆借阅室"
    },
    {
        "bookName": "计算机体系结构",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "1",
        "bookRef": "/assets/img/计算机体系结构.jpg",
        "bookLocate": "图书馆1楼"
    },
    {
        "bookName": "算法导论",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "MIT Press",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "2",
        "bookRef": "/assets/img/算法导论.jpg",
        "bookLocate": "图书馆2楼"
    },
    {
        "bookName": "计算机网络",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "清华大学出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "3",
        "bookRef": "/assets/img/计算机网络.jpg",
        "bookLocate": "图书馆3楼"
    },
    {
        "bookName": "计算机图形学",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "6",
        "bookRef": "/assets/img/计算机图形学.jpg",
        "bookLocate": "图书馆大厅"
    },
    {
        "bookName": "计算机组成与设计",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "Morgan Kaufmann",
        "bookDate": "2023-12-28",
        "bookStatus": "否",
        "bookNumber": "0",
        "bookRef": "/assets/img/计算机组成与设计.jpg",
        "bookLocate": "图书馆借阅室"
    },
    {
        "bookName": "操作系统概念",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "人民邮电出版社",
        "bookDate": "2023-2-27",
        "bookStatus": "是",
        "bookNumber": "5",
        "bookRef": "/assets/img/操作系统概念.jpg",
        "bookLocate": "图书馆计算机区"
    },
    {
        "bookName": "数据库系统原理",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-1-2",
        "bookStatus": "是",
        "bookNumber": "8",
        "bookRef": "/assets/img/数据库系统原理.jpg",
        "bookLocate": "图书馆24小时自助借阅区"
    },
    {
        "bookName": "算法设计与分析",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "清华大学出版社",
        "bookDate": "2023-12-7",
        "bookStatus": "否",
        "bookNumber": "0",
        "bookRef": "/assets/img/算法设计与分析.jpg",
        "bookLocate": "图书馆借阅室"
    },
    {
        "bookName": "计算机体系结构",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "1",
        "bookRef": "/assets/img/计算机体系结构.jpg",
        "bookLocate": "图书馆1楼"
    },
    {
        "bookName": "算法导论",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "MIT Press",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "2",
        "bookRef": "/assets/img/算法导论.jpg",
        "bookLocate": "图书馆2楼"
    },
    {
        "bookName": "计算机网络",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "清华大学出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "3",
        "bookRef": "/assets/img/计算机网络.jpg",
        "bookLocate": "图书馆3楼"
    },
    {
        "bookName": "计算机图形学",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "6",
        "bookRef": "/assets/img/计算机图形学.jpg",
        "bookLocate": "图书馆大厅"
    },
    {
        "bookName": "计算机组成与设计",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "Morgan Kaufmann",
        "bookDate": "2023-12-28",
        "bookStatus": "否",
        "bookNumber": "0",
        "bookRef": "/assets/img/计算机组成与设计.jpg",
        "bookLocate": "图书馆借阅室"
    },
    {
        "bookName": "操作系统概念",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "人民邮电出版社",
        "bookDate": "2023-2-27",
        "bookStatus": "是",
        "bookNumber": "5",
        "bookRef": "/assets/img/操作系统概念.jpg",
        "bookLocate": "图书馆计算机区"
    },
    {
        "bookName": "数据库系统原理",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-1-2",
        "bookStatus": "是",
        "bookNumber": "8",
        "bookRef": "/assets/img/数据库系统原理.jpg",
        "bookLocate": "图书馆24小时自助借阅区"
    },
    {
        "bookName": "算法设计与分析",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "清华大学出版社",
        "bookDate": "2023-12-7",
        "bookStatus": "否",
        "bookNumber": "0",
        "bookRef": "/assets/img/算法设计与分析.jpg",
        "bookLocate": "图书馆借阅室"
    },
    {
        "bookName": "计算机体系结构",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "1",
        "bookRef": "/assets/img/计算机体系结构.jpg",
        "bookLocate": "图书馆1楼"
    },
    {
        "bookName": "算法导论",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "MIT Press",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "2",
        "bookRef": "/assets/img/算法导论.jpg",
        "bookLocate": "图书馆2楼"
    },
    {
        "bookName": "计算机网络",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "清华大学出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "3",
        "bookRef": "/assets/img/计算机网络.jpg",
        "bookLocate": "图书馆3楼"
    },
    {
        "bookName": "计算机图形学",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "6",
        "bookRef": "/assets/img/计算机图形学.jpg",
        "bookLocate": "图书馆大厅"
    },
    {
        "bookName": "计算机组成与设计",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "Morgan Kaufmann",
        "bookDate": "2023-12-28",
        "bookStatus": "否",
        "bookNumber": "0",
        "bookRef": "/assets/img/计算机组成与设计.jpg",
        "bookLocate": "图书馆借阅室"
    },
    {
        "bookName": "操作系统概念",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "人民邮电出版社",
        "bookDate": "2023-2-27",
        "bookStatus": "是",
        "bookNumber": "5",
        "bookRef": "/assets/img/操作系统概念.jpg",
        "bookLocate": "图书馆计算机区"
    },
    {
        "bookName": "数据库系统原理",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-1-2",
        "bookStatus": "是",
        "bookNumber": "8",
        "bookRef": "/assets/img/数据库系统原理.jpg",
        "bookLocate": "图书馆24小时自助借阅区"
    },
    {
        "bookName": "算法设计与分析",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "清华大学出版社",
        "bookDate": "2023-12-7",
        "bookStatus": "否",
        "bookNumber": "0",
        "bookRef": "/assets/img/算法设计与分析.jpg",
        "bookLocate": "图书馆借阅室"
    },
    {
        "bookName": "计算机体系结构",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "1",
        "bookRef": "/assets/img/计算机体系结构.jpg",
        "bookLocate": "图书馆1楼"
    },
    {
        "bookName": "算法导论",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "MIT Press",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "2",
        "bookRef": "/assets/img/算法导论.jpg",
        "bookLocate": "图书馆2楼"
    },
    {
        "bookName": "计算机网络",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "清华大学出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "3",
        "bookRef": "/assets/img/计算机网络.jpg",
        "bookLocate": "图书馆3楼"
    },
    {
        "bookName": "计算机图形学",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "机械工业出版社",
        "bookDate": "2023-12-27",
        "bookStatus": "是",
        "bookNumber": "6",
        "bookRef": "/assets/img/计算机图形学.jpg",
        "bookLocate": "图书馆大厅"
    },
    {
        "bookName": "计算机组成与设计",
        "bookAuthor": "钱璟丰",
        "bookPublisher": "Morgan Kaufmann",
        "bookDate": "2023-12-28",
        "bookStatus": "否",
        "bookNumber": "0",
        "bookRef": "/assets/img/计算机组成与设计.jpg",
        "bookLocate": "图书馆借阅室"
    },
])
const currentPage = ref(1)
const pageSize = ref(7)
const paginatedData = ref([])
// function goToUserSpace() {
//     // 在这里添加跳转到用户空间的代码
// }
// function handleLogout() {
//     // 在这里添加注销账户的代码
// }

//lifetime
onMounted(() => {
    // console.log(bookTotal.value);
    updatePaginatedData();
});

// function 
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
    paginatedData.value = bookTotal.value.slice(start, end);
};

function handleimgClick(book) {
    if (book.bookStatus === '否') {
        alert("《" + book.bookName + "》已被借完o（＞︿＜）o");
        return;
    }
    alert("即将为你展示《" + book.bookName + "》的详情<(￣︶￣)↗[GO!]");
    showChoose.value = true;
    selectedBook.value = book;
}

function keepBook() {
    secondkeep.value = "true";
}

function borrowBook() {
    secondborrow.value = "true";
}


// 🚩
function queryBookCatalog(){

}

</script>

<style scoped>
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
    margin-top: 8%;
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