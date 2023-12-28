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
            </div>
            <input type="button" id="addBook" class="add btn btn-primary" value="查找图书" />
        </form>
    </div>
    <div class="leader">
        <h2>可借阅图书列表</h2>
    </div>
    <div class="container">
        <div class="book">
            <h3>《计算机体系结构》</h3>
            <img src="../assets/img/计算机体系结构.jpg" onclick="borrowBook('计算机体系结构')">
            <p>作者：<a href="https://www.baidu.com/s/" title="搜索该作者的书">钱璟丰</a></p>
            <p>出版社：<a href="www.baidu.com" title="搜索该出版社的书">机械工业出版社</a></p>
            <p>出版日期：2023-12-27</p>
            <p>可借阅状态：是</p>
            
        </div>
    </div>
</template>

<script>
</script>