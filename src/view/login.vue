<template>
    <div class="bg-image">
    </div>

    <div class="position-absolute top-50 start-50 translate-middle">
        <form class="form" @submit.prevent="">
            <div class="form_title">图书管理系统登录</div>
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
                <button class="signup" @click="handlesup">注册</button>
                <button class="signin" @click="handlesin">登录</button>
            </div>
        </form>
    </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { inject,  } from "vue";

export default {
    data() {
        return {
            username_has_error: false,
            password_has_error: false,
            username_errors: "",
            password_errors: "",

            mmtrue: "false",
            //
            username: "",
            password: "",
        };
    },

    setup() {
        const $http = inject('$http');

        
    },

    methods: {

        handlesup() {
            this.$router.push("/register");
        },

        handlesin() {
            if (!this.verify_username() || !this.verify_password()) {
                return;
            }
            console.log("right");
            // if request server is ok
            this.$router.push({ path: '/books', query: { username: this.username } });
            // this.$router.push("/books");


            const http = inject($http)

        },

        hasOnlyNumber(s) {
            var pattern = /^\d+$/; // 使用正则表达式匹配数字字符
            return pattern.test(s);
        },

        verify_username() {
            // 判断是否为空
            if (this.username.length === 0) {
                this.username_has_error = true;
                this.username_errors = "用户名不能为空";
                return false;
            }

            if (!this.hasOnlyNumber(this.username)) {
                this.username_has_error = true;
                this.username_errors = "用户名非法";
                return false;
            }

            // 其他规则
            this.username_has_error = false;
            return true;
        },

        verify_password() {
            if (this.password.length === 0) {
                this.password_has_error = true;
                this.password_errors = "密码不能为空";
                return false;
            } else {
                this.password_has_error = false;
            }

            return true;
        },

        // 🚩
        check_table() { },

        // 🚩
        login() { },
    },
    mounted() {
        document.body.style.overflow = "hidden";
    },
    beforeDestroy() {
        document.body.style.overflow = "";
    },
};
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
