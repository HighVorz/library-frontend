<template>
    <div class="bg-image">
    </div>

    <div class="position-absolute top-50 start-50 translate-middle">
        <form class="form" @submit.prevent="">
            <div class="form_title">读者登录</div>
            <div class="form_user_field">
                <input type="text" class="username_input" v-model="username" @blur="verify_username"
                    placeholder="Username" />
                <p v-if="username_has_error" class="error" style="font-size: small; color: red; position: absolute">
                    {{ username_errors }}
                </p>
            </div>
            <div class="form_password_field">
                <input type="password" class="password_input" v-model="password" @blur="verify_password"
                    placeholder="Password" />
                <p v-if="password_has_error" class="error" style="font-size: small; color: red; position: absolute">
                    {{ password_errors }}
                </p>
            </div>
            <div class="z-remember">
                <el-checkbox>记住密码</el-checkbox>
            </div>
            <div class="tips_field">
                <p class="forget">
                    忘记密码? <a href="/forget">点击这里</a>
                </p>
            </div>
            <div class="btn_field">
                <button class="signup" @click="signup">注册</button>
                <button class="signin" @click="signin">登录</button>
            </div>
        </form>
    </div>
</template>



<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { inject, ref } from "vue";
import { useAuthStore } from "../script/auth.js"

const auth = useAuthStore();

// data
const username_has_error = ref(false)
const password_has_error = ref(false)
const username_errors = ref("")
const password_errors = ref("")
const username = ref("")
const password = ref("")


// inject
const http = inject('$http');
const router = inject('$router')

// 🚩
function signin() {
    // if (!verify_username() || !verify_password()) {
    //     return;
    // }
    http.post("/api/login", {
        username: username.value,
        password: password.value
    }).then(response => {
        console.log("signin: ", response.data)
        if (response.data.msg === "Success") {
            const data = response.data.data;
            auth.login(data.userinfo, data.token)

            http.defaults.headers.common['Authorization'] = auth.token
            console.log("http.header.token:", http.defaults.headers.common['Authorization'])

            const redirectPath = sessionStorage.getItem('redirectPath') || '/'
            router.replace(redirectPath)
        }
    }).catch(error => {
        console.log(error)
    })
};

// 🚩
function signup() {
    router.push("/register");
};

// 🚩
function verify_username() {
    // 判断是否为空
    if (username.value.length === 0) {
        username_has_error.value = true;
        username_errors.value = "用户名不能为空";
        return false;
    }

    // 其他规则
    username_has_error.value = false;
    return true;
};

// 🚩
function verify_password() {
    if (password.value.length === 0) {
        password_has_error.value = true;
        password_errors.value = "密码不能为空";
        return false;
    }

    if (password.value.length < 8) {
        password_has_error.value = true;
        password_errors.value = "密码不小于8位"
        return false;
    }

    password_has_error.value = false;

    return true;
};



function hasOnlyNumber(str) {
    return /^\d+$/.test(str);
}

</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}


.el-checkbox {
    margin-top: 10px;
}

.bg-image {
    background-image: url("/assets/img/lib_register.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

/* .container {
    width: 100%;
    height: 100%;
    background: url("/assets/img/lib_register.png") center/cover no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
} */

.form {
    width: 400px;
    height: 520px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    box-shadow: 0 10px 10px 5px rgba(0, 0, 0, 0.08);
    padding: 48px;
}

.form>.form_title {
    font-size: 36px;
    font-weight: bold;
    color: #3178c6;
    text-align: center;
    padding-bottom: 10px;
    margin: 30px 0px 40px 0px;
    position: relative;
}

.form_title::before {
    position: absolute;
    content: "";
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background-color: #3178c6;
}

.form>.form_user_field,
.form_password_field {
    width: 100%;
}

.form_password_field>.password_input,
.form_user_field>.username_input {
    width: 100%;
    height: 48px;
    outline: none;
    border: none;
    border-radius: 8px;
    padding: 0 12px;
    background-color: #eaeaea;
    opacity: 0.8;
    font-size: 14px;
    font-weight: 600;
}

.username_input:focus {
    opacity: 1;
}

.password_input:focus {
    opacity: 1;
}

.form>.form_password_field {
    width: 100%;
    margin-top: 24px;
}

.form>.tips_field {
    margin-top: 5px;
}

.tips_field>.forget {
    font-size: 12px;
    opacity: 0.8;
}

.tips_field>.forget>a {
    text-decoration: none;
    outline: none;
    font-weight: bold;
    color: #3178c6;
}

.tips_field>.forget>a:hover {
    text-decoration: underline;
    color: #05305e;
}

.form>.btn_field {
    margin-top: 48px;
    display: flex;
}

.signin,
.signup {
    flex: 1;
    height: 48px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 38px;
    opacity: 0.8;
}

.signin:hover {
    opacity: 1;
}

.signup:hover {
    opacity: 1;
}

.signin {
    color: #fff;
    background-color: #3178c6;
    margin-left: 10px;
}

.signup {
    color: #000;
    margin-right: 10px;
}
</style>
