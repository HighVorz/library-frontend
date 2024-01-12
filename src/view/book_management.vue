<template>
    <div class="header">
        <h1>综合图书管理</h1>
    </div>
    <hr>
    <!-- 弹窗1 -->
    <div v-if="showModel" class="Model">
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
                    <label for="pub">出版社:</label>
                    <input type="text" id="pub" class="form-control">
                </div>
                <div class="form-group">
                    <label for="time">出版时间:</label>
                    <input type="date" id="time" class="form-control">
                </div>
                <div class="form-group">
                    <label for="restnum">剩余数量:</label>
                    <input type="number" id="restnum" class="form-control">
                </div>
                <div class="form-group">
                    <button class="searchbk">查找</button>
                    <button @click="showModel = false" class="quit">关闭</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 弹窗2 -->
    <div v-if="showModel2" class="Model">
        <div class="search-container">
            <form class="search-form2" @submit.prevent="">
                <p>添加图书</p>
                <div class="form-group">
                    <label for="name">书名:</label>
                    <input type="text" id="name" class="form-control">
                </div>
                <div class="form-group">
                    <label for="au">作者:</label>
                    <input type="text" id="au" class="form-control">
                </div>
                <div class="form-group">
                    <label for="pub">出版社:</label>
                    <input type="text" id="pub" class="form-control">
                </div>
                <div class="form-group">
                    <label for="time">出版时间:</label>
                    <input type="date" id="time" class="form-control">
                </div>
                <div class="form-group">
                    <label for="restbk">剩余数量:</label>
                    <input type="number" id="restbk" class="form-control">
                </div>
                <div class="form-group">
                    <label for="status">借阅状态:</label>
                    <input type="text" id="status" class="form-control">
                </div>
                <!-- 其实也能放入图片 -->
                <div class="form-group">
                    <button class="addbk" @click="showAlertadd">添加</button>
                    <button @click="showModel2 = false" class="quit">关闭</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 弹窗3 -->
    <div v-if="showModel3" class="Model">
        <div class="search-container">
            <form class="search-form3" @submit.prevent="">
                <p>修改信息</p>
                <div class="form-group">
                    <label for="name">书名:</label>
                    <input type="text" id="name" class="form-control">
                </div>
                <div class="form-group">
                    <label for="au">作者:</label>
                    <input type="text" id="au" class="form-control">
                </div>
                <div class="form-group">
                    <label for="pub">出版社:</label>
                    <input type="text" id="pub" class="form-control">
                </div>
                <div class="form-group">
                    <label for="time">出版时间:</label>
                    <input type="date" id="time" class="form-control">
                </div>
                <div class="form-group">
                    <label for="restbk">剩余数量:</label>
                    <input type="number" id="restbk" class="form-control">
                </div>
                <div class="form-group">
                    <label for="status">借阅状态:</label>
                    <input type="text" id="status" class="form-control">
                </div>
                <!-- 其实也能放入图片 -->
                <div class="form-group">
                    <button class="fixbk" @click="showAlertfix">修改</button>
                    <button @click="showModel3 = false" class="quit">关闭</button>
                </div>
            </form>
        </div>
    </div>

    <div class="container">
        <button class="exit-button" @click="handleLogout"><i class="fas fa-sign-out-alt"></i>退出账户</button>
        <button class="reader-button" @click="handleReader"><i class="fas fa-users"></i> 读者管理</button>
        <button class="add-button" @click="showModel2 = true"><i class="fas fa-book"></i> 添加图书</button>
        <button class="search-button" @click="showModel = true"><i class="fas fa-search"></i> 搜索一下</button>

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
            <tr v-for="item in paginatedData">
                <td>{{ item.bookName }}</td>
                <td>{{ item.bookAuthor }}</td>
                <td>{{ item.bookPublisher }}</td>
                <td>{{ item.bookDate }}</td>
                <td>{{ item.bookNumber }}</td>
                <td>{{ item.bookStatus }}</td>
                <td>
                    <form action="" @submit="handleSubmit">
                        <button class="act addin" @click="showModel3 = true">修改</button>&nbsp&nbsp&nbsp<button
                            class="act del" @click="deleteItem(item)">删除</button>
                    </form>
                </td>
            </tr>
        </table>
        <el-pagination class="pagination-container" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="bookTotal.length">
        </el-pagination>
    </div>
</template>

<script setup>
import { ElPagination } from 'element-plus';
import {ref} from 'vue'

// data
const showModel = ref(false)
const showModel2 = ref(false)
const showModel3 = ref(false)
const bookTotal = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const paginatedData = ref([])




// methods: {
//     handleSizeChange(val) {
//         this.pageSize = val;
//         this.updatePaginatedData();  // 更新数据的方法，需要你自己实现
//     },
//     handleCurrentChange(val) {
//         this.currentPage = val;
//         this.updatePaginatedData();  // 更新数据的方法，需要你自己实现
//     },
//     updatePaginatedData() {
//         const start = (this.currentPage - 1) * this.pageSize;
//         const end = start + this.pageSize;
//         this.paginatedData = this.bookTotal.slice(start, end);
//     },
//     handleSubmit(event) {
//         event.preventDefault();
//         // 删除操作...
//     }, // 到时候记得删掉，只是为了测试删除
//     showAlertadd() {
//         alert('添加成功');
//     },
//     showAlertfix() {
//         alert('修改成功');
//     },
//     deleteItem(item) {
//         alert('删除成功');
//         const index = this.bookTotal.indexOf(item);
//         console.log(index);
//         if (index !== -1) {
//             this.bookTotal.splice(index, 1);
//         }
//     },
//     handleLogout() {
//         this.$router.push('/login')
//     },
//     handleReader() {
//         this.$router.push('/administer/usercontrol')
//     }
// },
// watch: {
//     showModel(val) {
//         if (val) {
//             document.body.style.overflow = 'hidden'
//         } else {
//             document.body.style.overflow = 'auto'
//         }
//     },
//     showModel2(val) {
//         if (val) {
//             document.body.style.overflow = 'hidden'
//         } else {
//             document.body.style.overflow = 'auto'
//         }
//     },
//     showModel3(val) {
//         if (val) {
//             document.body.style.overflow = 'hidden'
//         } else {
//             document.body.style.overflow = 'auto'
//         }
//     }
// }

</script>

<style scoped>
.header {
    background: url('/assets/img/admin_header.jpg') center/cover no-repeat;
    color: rgb(237, 237, 217);
    padding: 15px;
    text-align: center;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}

.container::before {
    content: "";
    background: url('/assets/img/master.jpg') center/cover no-repeat;
    opacity: 0.5;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
}

.reader-button {
    margin: 20px 0px 20px 0px;
    padding: 10px 20px;
    font-size: 16px;
    width: 10%;
    position: relative;
    left: 45%;
    color: rgb(0, 0, 0);
    background-color: rgba(255, 255, 0, 0.7);
    border: none;
    border-radius: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: background-color 0.3s ease;
    transition: font-weight 0.3s ease;
}

.reader-button:hover {
    background-color: rgb(255, 255, 0);
    animation: bounce 0.3s forwards;
    font-weight: bold;
}

.exit-button {
    margin: 20px 0px 20px 0px;
    padding: 10px 20px;
    font-size: 16px;
    width: 10%;
    position: relative;
    left: 1%;
    color: white;
    background-color: rgba(255, 0, 0, 0.7);
    border: none;
    border-radius: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: background-color 0.3s ease;
    transition: font-weight 0.3s ease;
}

.exit-button:hover {
    background-color: rgba(255, 0, 0, 1);
    animation: bounce 0.3s forwards;
    font-weight: bold;
}

.add-button {
    margin: 20px 0px 20px 0px;
    padding: 10px 20px;
    font-size: 16px;
    width: 10%;
    position: absolute;
    left: 70%;
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

.search-button {
    margin: 20px 0px 20px 0px;
    padding: 10px 20px;
    font-size: 16px;
    width: 10%;
    position: absolute;
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

.search-button:hover {
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
    overflow: hidden;
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
    margin-top: 7%;
}

.search-form,
.search-form2,
.search-form3 {
    width: 30%;
    margin: auto;
    background-color: #fefefe;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 20px;
}

.search-form p,
.search-form2 p,
.search-form3 p {
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
.search-form3 p::before {
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
    color: #4bdc35;
}

.search-form2 p::before {
    background-color: #4bdc35;
}

.search-form3 p {
    color: rgb(40, 167, 69);
}

.search-form3 p::before {
    background-color: rgb(40, 167, 69);
}

.form-group {
    align-items: center;
    margin-bottom: 10px;
}

.form-group label {
    display: inline-block;
    width: 20%;
    cursor: url('/assets/img/alternate.ico'), auto;
    font-size: 16px;
    font-weight: bold;
    margin-right: 2%;
    margin-top: 8px;
    margin-bottom: 3px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

.searchbk,
.addbk,
.fixbk {
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
.fixbk:hover {
    background-color: #0056b3;
}

.addbk {
    background-color: #00ff00;
}

.addbk:hover {
    background-color: #1aad14;
}

.fixbk {
    background-color: rgb(40, 167, 69);
}

.fixbk:hover {
    background-color: rgb(11, 87, 29);
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

.act {
    padding: 5px 10px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.addin {
    color: white;
    background-color: rgba(40, 167, 69, 0.7);
}

.addin:hover {
    animation: bounce 0.3s forwards;
    background-color: rgba(40, 167, 69, 1);
}

.del {
    color: white;
    background-color: rgba(220, 53, 69, 0.7);
}

.del:hover {
    animation: bounce 0.3s forwards;
    background-color: rgba(220, 53, 69, 1);
}

.pagination-container {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>