<template>
    <div :class="cnr">
        <form :class="fm">
            <div :class="ft">用户注册</div>
            <div :class="fuf">
                <input type="text" :class="uinput" placeholder="请输入用户名...">
            </div>
            <div :class="fpwd">
                <input type="password" :class="pinput" placeholder="请在此处输入密码...">
            </div>
            <div :class="btn">
                <button :class="sin" @click="handlefnsup">返回登录</button>
                <button :class="sup">点击注册</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ft: "form_title",
            fm: "form",
            cnr: "container",
            fuf: "form_user_field",
            uinput: "username_input",
            fpwd: "form_password_field",
            pinput: "password_input",
            btn: "btn_field",
            sup: "signup",
            sin: "signin",
        }
    },
    methods: {
        handlefnsup() {
            this.$router.push("/login");
        },
    },
}
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
    color: #d55a5a;
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
    width: 40px;
    height: 4px;
    background-color: #d55a5a;
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

.signup {
    color: #fff;
    background-color: #d55a5a;
    margin-left: 10px;
}

.signin {
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