<template>
    <div class="container">
        <h1>首页</h1>
        <div class="navigate">
            <RouterLink to="/login">登录</RouterLink><br>
            <RouterLink to="/books">书目</RouterLink><br>
            <RouterLink to="/administer">管理员界面</RouterLink><br>
            <RouterLink to="/user">用户空间</RouterLink><br>
            <RouterLink to="/detail">书本详情</RouterLink><br>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
h1 {
    margin: 0;
    font-size: 50px;
    margin-left: 30px;
}

h1::after {
    content: "";
    display: block;
    width: 100px;
    height: 4px;
    background-color: #171795;
}

.navigate {
    width: 30%;
    margin-top: 20px;
    font-size: 20px;
    margin-left: 30px;
}

.navigate a {
    color: #171795;
    text-decoration: none;
    display: inline-block;
    margin-bottom: 20px;
    padding: 5px;
    background-color: #c9ef0b;
    outline: solid;
    border-radius: 4px;
}

.navigate a:hover {
    color: #007bff;
    background-color: aqua;
    text-decoration: underline;
}

.container {
    width: 100%;
    height: 100%;
    background: url('/assets/img/background.jpg') center/cover no-repeat;
}
</style>
