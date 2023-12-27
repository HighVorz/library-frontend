<template>
    <!--  -->
    <h1>仅供开发使用界面</h1>

    <div class="navigate">
        <RouterLink to="/login">登录</RouterLink>
        <RouterLink to="/books">书目</RouterLink>
        <RouterLink to="/administer">管理员界面</RouterLink>
        <RouterLink to="/user">用户空间</RouterLink>
        <RouterLink to="/detail">书本详情</RouterLink>
    </div>

    <RouterView></RouterView>
</template>

<script>
import { RouterView, RouterLink } from "vue-router";
export default {
    data() {
        return {
            arr: [1, 2, 3, 4, 5],
        };
    },
};
</script>
