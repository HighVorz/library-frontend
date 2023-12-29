<template>
    <div class="header">
        <h1>欢迎来到图书管理系统</h1>
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
                <input type="button" id="addBook" class="add btn btn-primary" value="添加图书" />
            </div>
        </form>
    </div>
    <div class="leader">
        <h2>可管理图书列表</h2>
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
    </div>
    <!-- <div class="search-mask" style="display: block;overflow: hidden; position: fixed;top: 0%;right: 0%;bottom: 0%;left: 0%;"></div> -->
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>


<style scoped>
.header {
    background: url('../assets/img/cloud.jpg') center/cover no-repeat;
    color: rgb(36, 93, 116);
    padding: 15px;
    text-align: center;
}

.form-inline {
    background-color: rgba(42, 145, 236,0.8);
    padding-top: 5px;
    padding-bottom: 5px;
}

.form-inline:hover {
    background-color: rgba(42, 145, 236,1);
}

.form-group {
    box-sizing: border-box;
    font-weight: bold;
    margin-left: 9%;
    margin-right:9%;
}

.form-control {
    width: 12%;
    height: 20px;
    font-weight: bold;
    margin: 5px;
    border-radius: 4px;
    outline:none;
    border: none;
    background-color: #f2f2f2;
    opacity: 0.8;
}

.form-control:focus {
    opacity: 1;
}

#addBook {
    margin-left: 20px;
    height: 20px;
    width: 100px;
    background-color: rgba(255, 242, 0, 0.75);
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

#addBook:hover {
    background-color: rgba(255, 242, 0, 1);
}

.container {
    background: url('/assets/img/lib_admin.jpg') center/cover no-repeat;
    background-attachment: fixed;
}

</style>