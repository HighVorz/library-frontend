<template>
    <!-- release 仅需下面的代码 -->
    <router-view></router-view>

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
