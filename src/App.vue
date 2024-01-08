<template>
    <!-- release 仅需下面的代码 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <router-view></router-view>
</template>

<script>
import { RouterView, RouterLink } from "vue-router";

export default {
    data() {
        
    },
};
</script>



<style>
@import "bootstrap/dist/css/bootstrap.min.css";

html,
body,
#app {
    margin: 0;
    height: 100%;
}

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f2f2f2;
}

#app {
    cursor: url("/assets/img/pointer.ico"), auto;
}

a:hover {
    cursor: url("/assets/img/help.ico"), auto !important; 
}

img {
    cursor: url("/assets/img/alternate.ico"), auto;
}

input:hover {
    cursor: url("/assets/img/text.ico"), auto;
}

button {
    cursor: url("/assets/img/alternate.ico"), auto !important;
}

</style>