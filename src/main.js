import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import axios from "axios"
import {createPinia} from 'pinia'


// css
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';




const app = createApp(App);
const pinia = createPinia()

app.use(Router);
app.use(pinia)
app.use(ElementPlus);

// axios
// 设置json-server 的域名
const api = axios.create({
    baseURL: import.meta.env.VITE_APP_URL
});



// 中间设置组件的注册
Router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        //拦截后设置标题
        document.title = to.meta.title;
    }
    next();
});


app.provide('$http', api)
app.mount("#app");
