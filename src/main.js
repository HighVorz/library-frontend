import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";

const app = createApp(App);
app.use(Router);

// 中间设置组件的注册

Router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        //拦截后设置标题
        document.title = to.meta.title;
    }
    next();
});

app.mount("#app");
