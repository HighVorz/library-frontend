<template>
    <h1>书名:</h1>
    <div>
        <button class="search-button" @click="showModal = true"><i class="fas fa-search"></i>  搜索一下</button>

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
                        <button class="add">查找图书</button>
                        <button @click="showModal = false" class="quit">关闭</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <table>
        <tr style="font-weight: bold;">
            <td>书名</td>
            <td>作者</td>
            <td>价格</td>
            <td>出版社</td>
            <td>出版时间</td>
            <td>操作:添加 / 删除</td>
        </tr>
        <tr>
            <td>书名</td>
            <td>作者</td>
            <td>价格</td>
            <td>出版社</td>
            <td>出版时间</td>
            <td><button class="act addin" @click="showAlertadd">添加</button>&nbsp&nbsp&nbsp<button class="act del" @click="showAlertdel">删除</button></td>
        </tr>
        <tr>
            <td>书名</td>
            <td>作者</td>
            <td>价格</td>
            <td>出版社</td>
            <td>出版时间</td>
            <td><button class="act addin" @click="showAlertadd">添加</button>&nbsp&nbsp&nbsp<button class="act del" @click="showAlertdel">删除</button></td>
        </tr>
    </table>
</template>

<script>
export default {
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        showAlertadd() {
            alert('添加成功')
        },
        showAlertdel() {
            alert('删除成功')
        }
    },
    watch: {
        showModal(val) {
            if (val) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'auto'
            }
        }
    }
}
</script>

<style scpoed>

.search-button {
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 15px;
    margin-bottom:30px;
    margin-left:15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.search-button:hover {
    background-color: #0056b3;
    animation: bounce 0.6s ease;
}

/* .search-button i:hover {
    a
} */

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-7px);
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
    background-color: #f2f3ea;
}

tr:hover {
    background-color: #ddd;
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

.add {
    width: 30%;
    padding: 10px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    margin-top: 10px;
    margin-left:5%;
    margin-right:30%;
    background-color: #007bff;
    border: none;
    cursor: pointer;
}

.add:hover {
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

.act {
    padding: 5px 10px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.addin {
    cursor: pointer;
    color: white;
    background-color: #28a745;
}

.addin:hover {
    background-color: #218838;
}

.del {
    cursor: pointer;
    color: white;
    background-color: #dc3545;
}

.del:hover {
    background-color: #c82333;
}
</style>