<template>
    <nav class="navbar navbar-expand-md navbar-light">
        <div class="container-xxl">
            <a href="/" class="navbar-brand">
                <span class="fw-bold text-secondary"> Library </span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav"
                aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/login" type="button">登录</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/admin_login" type="button">管理员登录</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/books" type="button">书目</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/search" type="button">搜索</a>
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
        <div class="container-lg">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-5 text-center text-md-start">
                    <h1>
                        <div class="display-2">BookName</div>
                        <div class="display-5 text-muted">Author</div>
                    </h1>
                    <p class="lead my-4 text-muted">
                        Good morning. Thank you and you.
                    </p>
                    <a href="books" class="btn btn-secondary btn-lg">Borrow</a>
                </div>
                <div class="col-md-5 text-center d-none d-md-block">
                    <img class="img-fluid" src="/assets/ebook-cover.png" alt="ebook cover" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import "bootstrap/dist/js/bootstrap.js";
</script>

<style scoped>

</style>
