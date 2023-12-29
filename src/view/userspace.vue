<template>
    <!-- <h1>Userspace</h1>
    <p v-for="item in dataShow" :key="item.id">{{ item.id }}---{{ item.name }}---{{ item.age }}</p>

    <input type="button" value="上一页" @click="prePage">
    <span v-for="i in pageNum" @click="page(i)" :style="{ cursor: 'pointer', margin: '10px' }">{{ i }}</span>
    <input type="button" value="下一页" @click="nextPage"> -->
    <div class="animated-background">
        <p>你好</p>
    </div>
</template>

<script>

</script>

<style>
.animated-background p {
    margin: 0px;
}

.animated-background {
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg, #d53369, #daae51, #e91e63, #283c86);
    background-size: 800% 800%;
    animation: AnimationName 3s ease infinite;
}

@keyframes AnimationName {
    0% {
        background-position: 0% 50%
    }

    50% {
        background-position: 100% 50%
    }

    100% {
        background-position: 0% 50%
    }
}
</style>