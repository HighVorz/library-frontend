<template>
    <div :class="cnr">
        <div :class="fm">
            <div :class="ft">Sign in</div>
            <div :class="fuf">
                <input type="text" :class="uinput" placeholder="Username...">
            </div>
            <div :class="fpwd">
                <input type="password" :class="pinput" placeholder="Password...">
            </div>
            <div :class="tfd">
                <p :class="fgt">Forget password? <a href="#">Click here.</a></p>
            </div>
            <div :class="btn">
                <button :class="sup">Sign up</button>
                <button :class="sin">Sign in</button>
            </div>
        </div>
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
            sin: "signin"
        };
    },
    methods: {
        // Your methods go here
    },
    mounted() {
        // Code to run when the component is mounted
    },
};
</script>

<style scoped>
body,
html {
    height: 100%;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.container {
    width: 100%;
    height: 100%;
    background-color: #c6cce1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form {
    width: 400px;
    height: 520px;
    background-color: #fff;
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
    width: 30px;
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
    border-radius: 4px;
    padding: 0 12px;
    background-color: #eaeaea;
    font-size: 14px;
    font-weight: 600;
}

.form>.form_password_field {
    width: 100%;
    margin-top: 24px;
}

.form>.tips_field {
    /* width: 100%; */
    margin-top: 18px;
    /* font-size: 14px;
    font-weight: 600;
    color: #3178c6;
    text-align: center; */
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

.form>.btn_field {
    margin-top: 48px;
    display: flex;
}

.btn_field>.signin,
.signup {
    flex: 1;
    height: 48px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    border-radius: 38px;
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
