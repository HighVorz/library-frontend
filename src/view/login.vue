<template>
    <div :class="cnr">
        <form :class="fm">
            <div :class="ft">图书管理系统登录</div>
            <div :class="fuf">
                <input type="text" :class="uinput" placeholder="请输入用户名...">
            </div>
            <div :class="fpwd">
                <input type="password" :class="pinput" placeholder="请在此处输入密码...">
            </div>
            <div :class="tfd">
                <p :class="fgt">忘记密码? <a href="/books">点击这里</a></p>
            </div>
            <div :class="btn">
                <button :class="sup">注册</button>
                <button :class="sin">登录</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ft: "form_title",
            fm: "form",
            cnr: "container",
            fuf: "form_user_field",
            uinput: "username_input",
            fpwd: "form_password_field",
            pinput: "password_input",
            tfd: "tips_field",
            fgt: "forget",
            btn: "btn_field",
            sup: "signup",
            sin: "signin",
        };
    },
    methods: {
        handlesup() {
            // this.$router.push("/signup");
        },
        // Your methods go here
    },
    mounted() {
        // Code to run when the component is mounted
    },
};
</script>

<style scoped>
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
    margin-top: 18px;
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
