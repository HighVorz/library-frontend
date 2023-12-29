<template>
    <h1>书名:</h1>
    <div>
        <button @click="showModal = true">搜索一下</button>

        <div v-if="showModal" class="modal">
            <div class="search-container">
                <form class="search-form">
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
        <tr>
            <td>书名</td>
            <td>作者</td>
            <td>价格</td>
            <td>出版社</td>
            <td>出版时间</td>
            <td>添加&nbsp&nbsp&nbsp删除</td>
        </tr>
        <tr>
            <td>书名</td>
            <td>作者</td>
            <td>价格</td>
            <td>出版社</td>
            <td>出版时间</td>
            <td>添加&nbsp&nbsp&nbsp删除</td>
        </tr>
        <tr>
            <td>书名</td>
            <td>作者</td>
            <td>价格</td>
            <td>出版社</td>
            <td>出版时间</td>
            <td>添加&nbsp&nbsp&nbsp删除</td>
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
    margin-top: 20%;
}

.search-form {
    width: 30%;
    margin: auto;
    background-color: #fefefe;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 20px;
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
</style>