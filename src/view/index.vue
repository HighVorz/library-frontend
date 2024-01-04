<template>
    <!-- <div class="container">
        <h1>开发者界面</h1>
        <div class="navigate">
            <RouterLink to="/login" type="button">登录</RouterLink><br>
            <RouterLink to="/books" type="button">书目</RouterLink><br>
            <RouterLink to="/administer" type="button">管理员界面</RouterLink><br>
            <RouterLink to="/user" type="button">用户空间</RouterLink><br>
            <RouterLink to="/detail" type="button">书本详情</RouterLink><br>
            <RouterLink to="/administer/usercontrol" type="button">用户管理</RouterLink><br>
        </div>
    </div> -->

    <nav class="navbar navbar-expand-md navbar-light">
        <div class="container-xxl">
            <a href="#intro" class="navbar-brand">
                <span class="fw-bold text-secondary"> Library </span>
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#main-nav"
                aria-controls="main-nav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login" type="button">登录</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/books" type="button">书目</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/administer" type="button">管理员</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/user" type="button">用户空间</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/detail" type="button">详情</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/administer/usercontrol" type="button">用户管理</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <section id="intro">
        <dic class="container-lg">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-5 text-center text-md-start">
                    <h1>
                        <div class="display-2">BookName</div>
                        <div class="display-5 text-muted">Author</div>
                    </h1>
                    <p class="lead my-4 text-muted">
                        Good morning. Thank you and you.
                    </p>
                    <a href="books" class="btn btn-secondary btn-lg"
                        >Borrow</a
                    >
                </div>
                <div class="col-md-5 text-center d-none d-md-block">
                    <img
                        class="img-fluid"
                        src="/assets/ebook-cover.png"
                        alt="ebook cover"
                    />
                </div>
            </div>
        </dic>
    </section>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
</script>

<!-- <style scoped>
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
} -->
<!-- </style> -->
