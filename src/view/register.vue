
<template>
    <div class="bg-image">
    </div>

    <div class="position-absolute top-50 start-50 translate-middle">
        <form class="form" @submit.prevent="">
            <div class="form_title">用户注册</div>
            <div class="form_user_field">
                <input type="text" class="username_input" v-model="username" placeholder="请输入用户名...">
                <p v-if="usernameError" class="error" style="font-size: small;color: red;position: absolute;">用户名不能为空</p>
            </div>
            <div class="form_user_field">
                <input type="text" class="mail_input" v-model="useremail" placeholder="请输入邮箱...">
                <p v-if="emailError" class="error" style="font-size: small;color: red;position: absolute;">邮箱不能为空</p>
            </div>
            <div class="form_password_field">
                <input type="password" class="password_input" v-model="userpassword" placeholder="请在此处输入密码...">
                <p v-if="passwordError" class="error" style="font-size: small;color: red;position: absolute;">密码不能为空</p>
            </div>
            <div class="identity">
                <el-select class="csidentity" v-model="selectedOption" placeholder="请选择身份">
                    <el-option label="用户" value="user"></el-option>
                    <el-option label="管理员" value="admin"></el-option>
                </el-select>
                <p v-if="selectedError" class="error" style="font-size: small;color: red;position: absolute;">身份还未选择</p>
            </div>
            <div class="btn_field">
                <button class="signin" @click="return_sign">返回登录</button>
                <button class="signup" @click="register">点击注册</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const http = inject('$http')
const router = inject('$router')

// data
const form_title = ref("form_title")
const username = ref('')
const useremail = ref('')
const userpassword = ref('')
const usernameError = ref(false)
const emailError = ref(false)
const passwordError = ref(false)
const selectedError = ref(false)
const selectedOption = ref("")


// 🚩
function check_table() { };

// 🚩


function return_sign() {
    router.push("/login");
};
function register() {
    // 

    
};


</script>


<style scoped>
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


* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.container {
    width: 100%;
    height: 100%;
    background: url('/assets/img/lib_register.png') center/cover no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

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
    color: #64f625;
    text-align: center;
    padding-bottom: 10px;
    margin: 30px 0px 40px 0px;
    position: relative;
}

.form_title::before {
    position: absolute;
    content: "";
    bottom: 0;
    leform_title: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background-color: #64f625;
}

.form>.form_user_field,
.form_password_field {
    width: 100%;
}

.form_password_field>.password_input,
.form_user_field>.username_input,
.form_user_field>.mail_input {
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

.mail_input:focus {
    opacity: 1;
}

.mail_input {
    margin-top: 24px;

}

.identity {
    margin-top: 24px;
}

.el-select {
    width: 100%;
    opacity: 0.8;
}

.form>.form_password_field {
    margin-top: 24px;
}


.form>.btn_field {
    margin-top: 20px;
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

/* .animated-background p {
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
} */
</style>

