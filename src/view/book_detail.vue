<template>
    <div class="header">
        <h1>综合图书管理</h1>
    </div>
    <hr>
    <!-- 弹窗1 -->
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
                    <button class="searchbk">查找</button>
                    <button @click="showModal = false" class="quit">关闭</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 弹窗2 -->
    <div v-if="showModal2" class="modal">
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
                <!-- 其实也能放入图片 -->
                <div class="form-group">
                    <button class="addbk" @click="showAlertadd">添加</button>
                    <button @click="showModal2 = false" class="quit">关闭</button>
                </div>
            </form>
        </div>
    </div>

    <div class="container">
        <button class="exit-button" @click="handleLogout"><i class="fas fa-sign-out-alt"></i>退出账户</button>
        <button class="reader-button" @click="handleReader"><i class="fas fa-users"></i> 读者管理</button>
        <button class="add-button" @click="showModal2 = true"><i class="fas fa-book"></i> 添加图书</button>
        <button class="search-button" @click="showModal = true"><i class="fas fa-search"></i> 搜索一下</button>

        <table>
            <tr style="font-weight: bold;background-color: rgba(202, 57, 57, 0.5);">
                <td>书名</td>
                <td>作者</td>
                <td>出版社</td>
                <td>出版时间</td>
                <td>借阅状态</td>
                <td>操作:添加 / 删除</td>
            </tr>
            <tr v-for="item in bookTotal">
                <td>{{ item.bookName }}</td>
                <td>{{ item.bookAuthor }}</td>
                <td>{{ item.bookPublisher }}</td>
                <td>{{ item.bookDate }}</td>
                <td>{{ item.bookStatus }}</td>
                <td>
                    <form action="" @submit="handleSubmit">
                        <button class="act addin" @click="showAlertadd">添加</button>&nbsp&nbsp&nbsp<button class="act del"
                            @click="deleteItem(item)">删除</button>
                    </form>
                </td>
            </tr>
            <tr v-for="item in bookTotal">
                <td>{{ item.bookName }}</td>
                <td>{{ item.bookAuthor }}</td>
                <td>{{ item.bookPublisher }}</td>
                <td>{{ item.bookDate }}</td>
                <td>{{ item.bookStatus }}</td>
                <td>
                    <form action="" @submit="handleSubmit">
                        <button class="act addin" @click="showAlertadd">添加</button>&nbsp&nbsp&nbsp<button class="act del"
                            @click="deleteItem(item)">删除</button>
                    </form>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            showModal2: false,
            bookTotal: [] // 存储从数据库里面得到的数据
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
        handleSubmit(event) {
            event.preventDefault();
            // 删除操作...
         }, // 到时候记得删掉，只是为了测试删除
        showAlertadd() {
            alert('添加成功');
        },
        deleteItem(item) {
            alert('删除成功');
            const index = this.bookTotal.indexOf(item);
            console.log(index);
            if (index !== -1) {
                this.bookTotal.splice(index, 1);
            }
        },
        handleLogout() {
            this.$router.push('/login')
        },
        handleReader() {
            this.$router.push('/administer/usercontrol')
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
        showModal2(val) {
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
    border-collapse: collapse;
    width: 100%;
    font-family: Arial, sans-serif;
}

td {
    border: 1px solid black;
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

.search-form,
.search-form2 {
    width: 30%;
    margin: auto;
    background-color: #fefefe;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 20px;
}

.search-form p,
.search-form2 p {
    position: relative;
    text-align: center;
    font-size: 32px;
    color: #0056b3;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
}

.search-form p::before,
.search-form2 p::before {
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

.form-group {
    align-items: center;
    margin-bottom: 10px;
}

.form-group label {
    display: inline-block;
    width: 60px;
    cursor: url('/assets/img/alternate.ico'), auto;
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

.searchbk,
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

.searchbk:hover,
.addbk:hover {
    background-color: #0056b3;
}

.addbk {
    background-color: #00ff00;
}

.addbk:hover {
    background-color: #1aad14;
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
</style>