import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios"
import { createPinia } from 'pinia'
import { makeServer } from './mirage.js'

// css
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

if (process.env.NODE_ENV === "development") {
    makeServer()
}

const app = createApp(App);
const pinia = createPinia()

app.use(router);
app.use(pinia)
app.use(ElementPlus);

// axios
// 设置json-server 的域名
const http = axios.create({
    baseURL: import.meta.env.VITE_APP_URL
});

app.provide('$http', http)
app.provide('$router', router)
app.mount("#app");
