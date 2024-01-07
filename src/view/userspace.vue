<template>
    <div>
        <p>当前用户:{{ $route.query.username }}</p>
        <div>
            <span>
                <img class="avatar circle" src="/assets/img/avatar.png" alt="avatar" :title="$route.query.username + '的头像'">
            </span>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}

</script>

<style>
.avatar {
    vertical-align: middle;
}

.circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
}
</style>