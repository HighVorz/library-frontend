<template>
    <div class="admin-container">
        <div class="sidebar">
            <h2><i class="fas fa-user-tie"></i> 图书管理员</h2>
            <ul>
                <li><button :class="{ selected: selectedMenu === 'books' }" @click="selectedMenu = 'books'"><i
                            class="fas fa-book"></i> 书目详情</button></li>
                <li><button :class="{ selected: selectedMenu === 'users' }" @click="selectedMenu = 'users'"><i
                            class="fas fa-users"></i> 借阅情况</button></li>
                <li><button :class="{ selected: selectedMenu === 'orders' }" @click="selectedMenu = 'orders'"><i
                            class="fas fa-calendar-check"></i> 预约情况</button></li>
                <li><button :class="{ selected: selectedMenu === 'exit' }" class="exit-btn" @click="exit"><i
                            class="fas fa-sign-out-alt"></i> 退出系统</button></li>
            </ul>
        </div>
        <div class="content">
            <h1 v-if="selectedMenu === 'books'">书目管理</h1>
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
                            <input type="text" id="au" class="form-control" v-model="addbook.bookauthor">
                        </div>
                        <div class="form-group">
                            <label for="pub">出版社:</label>
                            <input type="text" id="pub" class="form-control" v-model="addbook.bookpublisher">
                        </div>
                        <div class="form-group">
                            <label for="time">出版时间:</label>
                            <input type="date" id="time" class="form-control" v-model="addbook.bookdate">
                        </div>
                        <div class="form-group">
                            <label for="restbk">剩余数量:</label>
                            <input type="number" id="restbk" class="form-control" v-model="addbook.booknumber">
                        </div>
                        <div class="form-group">
                            <label for="status">借阅状态:</label>
                            <input type="text" id="status" class="form-control" v-model="addbook.bookstatus">
                        </div>
                        <!-- 其实也能放入图片 -->
                        <div class="form-group">
                            <button class="addbk2" @click="showbookadd()">添加</button>
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
                    <tr v-for="item in paginatedData2">
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
            <h1 v-if="selectedMenu === 'users'">用户管理</h1>
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
                            <input type="number" id="bknum" class="form-control"  v-model="modifyuserinfo.borrownum">
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
            <div v-if="selectedMenu === 'users'">
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
                        <tr v-for="item in paginatedData">
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
            <h1 v-if="selectedMenu === 'orders'">预约管理</h1>
            <!-- 弹窗3-1 -->
            <div v-if="showModel6" class="Model">
                <div class="search-container">
                    <form class="search-form"  @submit.prevent="">
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
                        <tr v-for="item in paginatedData3">
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
const auth = useAuthStore();
http.defaults.headers.common['Authorization'] = auth.token

// data
const userTotal = ref([
    {
        "userName": "钱璟丰",
        "userMail": "2055318980@qq.com",
        "userBorrow": "计算机体系结构",
        "borrowNum": "1",
        "userBorrowtime": "2023-12-27",
        "userReturntime": "2023-12-28"
    },
    {
        "userName": "小明",
        "userMail": "666666666@qq.com",
        "userBorrow": "计算机网络",
        "borrowNum": "1",
        "userBorrowtime": "2023-12-27",
        "userReturntime": "2023-12-28"
    },
    {
        "userName": "小红",
        "userMail": "233465654756@qq.com",
        "userBorrow": "计算机图形学",
        "borrowNum": "1",
        "userBorrowtime": "2023-1-1",
        "userReturntime": "2023-1-2"
    },
    {
        "userName": "张三",
        "userMail": "zhangsan@example.com",
        "userBorrow": "数据库系统原理",
        "borrowNum": "3",
        "userBorrowtime": "2023-12-28",
        "userReturntime": "null"
    },
    {
        "userName": "李四",
        "userMail": "lisi@example.com",
        "userBorrow": "操作系统概念",
        "borrowNum": "2",
        "userBorrowtime": "2023-2-1",
        "userReturntime": "null"
    },
    {
        "userName": "王五",
        "userMail": "wangwu@example.com",
        "userBorrow": "算法设计与分析",
        "borrowNum": "1",
        "userBorrowtime": "2023-12-7",
        "userReturntime": "2024-1-1"
    },
    {
        "userName": "赵六",
        "userMail": "zhaoliu@example.com",
        "userBorrow": "计算机组成与设计",
        "borrowNum": "1",
        "userBorrowtime": "2023-1-15",
        "userReturntime": "2023-1-20"
    },
    {
        "userName": "陈七",
        "userMail": "chenqi@example.com",
        "userBorrow": "计算机体系结构",
        "borrowNum": "1",
        "userBorrowtime": "2023-12-27",
        "userReturntime": "2023-12-29"
    },
    {
        "userName": "张十",
        "userMail": "zhangshi@example.com",
        "userBorrow": "数据结构与算法",
        "borrowNum": "5",
        "userBorrowtime": "2023-1-20",
        "userReturntime": "2023-1-25"
    },
    {
        "userName": "钱璟丰",
        "userMail": "2055318980@qq.com",
        "userBorrow": "计算机体系结构",
        "borrowNum": "1",
        "userBorrowtime": "2023-12-27",
        "userReturntime": "2023-12-28"
    },
    {
        "userName": "小明",
        "userMail": "666666666@qq.com",
        "userBorrow": "计算机网络",
        "borrowNum": "1",
        "userBorrowtime": "2023-12-27",
        "userReturntime": "2023-12-28"
    },
    {
        "userName": "小红",
        "userMail": "233465654756@qq.com",
        "userBorrow": "计算机图形学",
        "borrowNum": "1",
        "userBorrowtime": "2023-1-1",
        "userReturntime": "2023-1-2"
    },
    {
        "userName": "张三",
        "userMail": "zhangsan@example.com",
        "userBorrow": "数据库系统原理",
        "borrowNum": "3",
        "userBorrowtime": "2023-12-28",
        "userReturntime": "null"
    },
    {
        "userName": "李四",
        "userMail": "lisi@example.com",
        "userBorrow": "操作系统概念",
        "borrowNum": "2",
        "userBorrowtime": "2023-2-1",
        "userReturntime": "null"
    },
    {
        "userName": "王五",
        "userMail": "wangwu@example.com",
        "userBorrow": "算法设计与分析",
        "borrowNum": "1",
        "userBorrowtime": "2023-12-7",
        "userReturntime": "2024-1-1"
    },
    {
        "userName": "赵六",
        "userMail": "zhaoliu@example.com",
        "userBorrow": "计算机组成与设计",
        "borrowNum": "1",
        "userBorrowtime": "2023-1-15",
        "userReturntime": "2023-1-20"
    },
    {
        "userName": "陈七",
        "userMail": "chenqi@example.com",
        "userBorrow": "计算机体系结构",
        "borrowNum": "1",
        "userBorrowtime": "2023-12-27",
        "userReturntime": "2023-12-29"
    },
    {
        "userName": "张十",
        "userMail": "zhangshi@example.com",
        "userBorrow": "数据结构与算法",
        "borrowNum": "5",
        "userBorrowtime": "2023-1-20",
        "userReturntime": "2023-1-25"
    },
    {
        "userName": "钱璟丰",
        "userMail": "2055318980@qq.com",
        "userBorrow": "计算机体系结构",
        "borrowNum": "1",
        "userBorrowtime": "2023-12-27",
        "userReturntime": "2023-12-28"
    },
    {
        "userName": "小明",
        "userMail": "666666666@qq.com",
        "userBorrow": "计算机网络",
        "borrowNum": "1",
        "userBorrowtime": "2023-12-27",
        "userReturntime": "2023-12-28"
    },
    {
        "userName": "小红",
        "userMail": "233465654756@qq.com",
        "userBorrow": "计算机图形学",
        "borrowNum": "1",
        "userBorrowtime": "2023-1-1",
        "userReturntime": "2023-1-2"
    },
    {
        "userName": "张三",
        "userMail": "zhangsan@example.com",
        "userBorrow": "数据库系统原理",
        "borrowNum": "3",
        "userBorrowtime": "2023-12-28",
        "userReturntime": "null"
    },
    {
        "userName": "李四",
        "userMail": "lisi@example.com",
        "userBorrow": "操作系统概念",
        "borrowNum": "2",
        "userBorrowtime": "2023-2-1",
        "userReturntime": "null"
    },
    {
        "userName": "王五",
        "userMail": "wangwu@example.com",
        "userBorrow": "算法设计与分析",
        "borrowNum": "1",
        "userBorrowtime": "2023-12-7",
        "userReturntime": "2024-1-1"
    },
    {
        "userName": "赵六",
        "userMail": "zhaoliu@example.com",
        "userBorrow": "计算机组成与设计",
        "borrowNum": "1",
        "userBorrowtime": "2023-1-15",
        "userReturntime": "2023-1-20"
    },
])
const bookTotal = ref([{
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
},])
const orderTotal = ref([
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
const addbook = ref({bookname:'',bookauthor:'',bookpublisher:'',bookdate:'',bookstatus:'',booknumber:''})
const searchbook = ref({bookname:'',bookauthor:'',bookpublisher:'',bookdate:'',booknumber:''})
const searchuser = ref({username:'',userborrow:'',borrownum:'',userborrowtime:'',userreturntime:'',usermail:''})
const modifybkinfo = ref({bookname:'',bookauthor:'',bookpublisher:'',bookdate:'',bookstatus:'',booknumber:''})
const modifyuserinfo = ref({username:'',userborrow:'',borrownum:'',userborrowtime:'',userreturntime:'',usermail:''})
const searchorder = ref({username:'',userorder:'',userordertime:'',usermail:'',ordernum:''})
//lifetime
onMounted(() => {

    if(router.query.selected){
        selectedMenu.value = router.query.selected
    }
   
    updatePaginatedData();
});

// 🚩
function getBorrowBookList() {

}

// 🚩
function updataBorrowBookList() {

}

// 🚩
function deleteBorrowBookList() {

}


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
function deleteItem(item) {
    alert('删除成功');
    const index = userTotal.value.indexOf(item);
    console.log(index);
    if (index !== -1) {
        userTotal.value.splice(index, 1);
    }
}
function showbookadd() {
    console.log('添加成功');
    console.log(addbook.value.bookname);
    console.log(addbook.value.bookauthor);
    console.log(addbook.value.bookpublisher);
    console.log(addbook.value.bookdate);
    console.log(addbook.value.bookstatus);
    console.log(addbook.value.booknumber);
    reset(addbook.value);
}
function showsearchbook() {
    console.log('搜索成功');
    console.log(searchbook.value.bookname);
    console.log(searchbook.value.bookauthor);
    console.log(searchbook.value.bookpublisher);
    console.log(searchbook.value.bookdate);
    console.log(searchbook.value.booknumber);
    reset(searchbook.value);
}
function showsearchuser() {
    console.log('搜索成功');
    console.log(searchuser.value.username);
    console.log(searchuser.value.userborrow);
    console.log(searchuser.value.borrownum);
    console.log(searchuser.value.userborrowtime);
    console.log(searchuser.value.userreturntime);
    console.log(searchuser.value.usermail);
    reset(searchuser.value);
}
function showmodifybkinfo() {
    alert('修改成功');
    console.log(modifybkinfo.value.bookname);
    console.log(modifybkinfo.value.bookauthor);
    console.log(modifybkinfo.value.bookpublisher);
    console.log(modifybkinfo.value.bookdate);
    console.log(modifybkinfo.value.booknumber);
    console.log(modifybkinfo.value.bookstatus);
    // showModel5.value = false;
    reset(modifybkinfo.value);
};
function showmodifyuserinfo() {
    alert('修改成功');
    console.log(modifyuserinfo.value.username);
    console.log(modifyuserinfo.value.userborrow);
    console.log(modifyuserinfo.value.borrownum);
    console.log(modifyuserinfo.value.userborrowtime);
    console.log(modifyuserinfo.value.userreturntime);
    console.log(modifyuserinfo.value.usermail);
    // showModel6.value = false;
    reset(modifyuserinfo.value);
};
function showsearchorder() {
    console.log('搜索成功');
    console.log(searchorder.value.username);
    console.log(searchorder.value.userorder);
    console.log(searchorder.value.userordertime);
    console.log(searchorder.value.usermail);
    console.log(searchorder.value.ordernum);
    reset(searchorder.value);
}
function reset(obj) {
    Object.keys(obj).forEach(key => {
        obj[key] = '';
    });
}
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