<template>
    <div class="container">
        <form class="form" @submit.prevent="">
            <div class="form_title">图书管理系统登录</div>
            <div class="form_user_field">
                <input
                    type="text"
                    class="username_input"
                    v-model="username"
                    placeholder="Username"
                />
                <p
                    v-if="usernameError"
                    class="error"
                    style="font-size: small; color: red; position: absolute"
                >
                    用户名不能为空
                </p>
            </div>
            <div class="form_password_field">
                <input
                    type="password"
                    class="password_input"
                    v-model="password"
                    placeholder="Password"
                />
                <p
                    v-if="passwordError"
                    class="error"
                    style="font-size: small; color: red; position: absolute"
                >
                    密码不能为空
                </p>
            </div>
            <div>
                <el-checkbox>记住密码</el-checkbox>
            </div>
            <div class="tips_field">
                <p class="forget">
                    忘记密码? <a href="/administer">点击这里</a>
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

export default {
    data() {
        return {
            usernameError: false,
            passwordError: false,
            mmtrue: "false",
            //
            username: "",
            password: "",
        };
    },
    validations() {
        return {
            username: { required },
            password: { required },
        };
    },

    methods: {
        handlesup() {
            this.$router.push("/register");
        },
        handlesin() {
            if (!this.username) {
                this.usernameError = true;
            } else {
                this.usernameError = false;
            }
            if (!this.userpassword) {
                this.passwordError = true;
            } else {
                this.passwordError = false;
            }
            if (!this.usernameError && !this.passwordError) {
                if (this.mmtrue) {
                    alert("登录成功");
                    // 默认是进入读者的页面
                    this.$router.push("/books");
                } else {
                    alert("登录失败");
                }
                // 提交表单的代码...
            }
        },

        // 🚩
        check_table() {},

        // 🚩
        login() {},
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
    /* cursor: url("/assets/img/alternate.ico"), auto; */
}

.container {
    width: 100%;
    height: 100%;
    background: url("/assets/img/lib_register.png") center/cover no-repeat;
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

.form > .form_title {
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

.form > .form_user_field,
.form_password_field {
    width: 100%;
}

.form_password_field > .password_input,
.form_user_field > .username_input {
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

.form > .form_password_field {
    width: 100%;
    margin-top: 24px;
}

.form > .tips_field {
    margin-top: 5px;
}

.tips_field > .forget {
    font-size: 12px;
    opacity: 0.8;
}

.tips_field > .forget > a {
    text-decoration: none;
    outline: none;
    font-weight: bold;
    color: #3178c6;
}

.tips_field > .forget > a:hover {
    text-decoration: underline;
    color: #05305e;
}

.form > .btn_field {
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
