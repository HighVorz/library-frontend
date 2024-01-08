<template>
    <div class="bg-image">
    </div>

    <div class="position-absolute top-50 start-50 translate-middle">
        <form class="form" @submit.prevent="">
            <div class="form_title">密码找回</div>
            <div class="form_user_field">
                <input type="text" class="username_input" v-model="username" placeholder="请输入用户名...">
                <p v-if="usernameError" class="error" style="font-size: small;color: red;position: absolute;">用户名不能为空</p>
            </div>
            <div class="form_user_field">
                <input type="text" class="mail_input" v-model="useremail" placeholder="请输入邮箱...">
                <p v-if="emailError" class="error" style="font-size: small;color: red;position: absolute;">邮箱不能为空</p>
            </div>
            <!-- <div class="identity">
                <el-select class="csidentity" v-model="selectedOption" placeholder="请选择身份">
                    <el-option label="用户" value="user"></el-option>
                    <el-option label="管理员" value="admin"></el-option>
                </el-select>
                <p v-if="selectedError" class="error" style="font-size: small;color: red;position: absolute;">身份还未选择</p>
            </div> -->
            <div class="form_certify_field">
                <input type="text" class="certify_input" v-model="usercertify" placeholder="请在此处输入验证码...">
                <img src="/assets/img/certify.png" title="换一张?">
                <p v-if="certifyError" class="error" style="font-size: small;color: red;position: absolute;">验证码不能为空</p>
            </div>
            <div class="btn_field">
                <button class="signin" @click="handlefnsup">返回登录</button>
                <button class="signup" @click="handleprereg">点击找回</button>
            </div>
        </form>
    </div>
</template>


<script>
export default {

    setup() {
        function handlefnsup() {
            this.$router.push("/login");
        };

        function handleprereg() {
            if (!this.username) {
                this.usernameError = true;
            } else {
                this.usernameError = false;
            }
            if (!this.useremail) {
                this.emailError = true;
            } else {
                this.emailError = false;
            }
            if (!this.usercertify) {
                this.certifyError = true;
            } else {
                this.certifyError = false;
            }
            if (!this.selectedOption) {
                this.selectedError = true;
            } else {
                this.selectedError = false;
            }
            if (this.username && this.useremail && this.usercertify && this.selectedOption) {
                if (this.usercertify != "5374") {
                    alert("验证码错误");
                    return;
                }
                alert("找回成功，请前往邮箱查看密码");
                this.$router.push("/login");
            }
        };


        return {
            // function
            handlefnsup,
            handleprereg,


            // variable
            // ft: "form_title",
            username: '',
            useremail: '',
            usercertify: '',
            usernameError: false,
            emailError: false,
            certifyError: false,
            selectedError: false,
            // fm: "form",
            // cnr: "container",
            // fuf: "form_user_field",
            // uinput: "username_input",
            // minput: "mail_input",
            // fct: "form_certify_field",
            // cinput: "certify_input",
            // btn: "btn_field",
            // sup: "signup",
            // sin: "signin",
            // selectedOption: ""
        }
    },

    data() {

    },
    methods: {

    }
}
</script>


<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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
    background: url('/assets/img/lib_register.png') center/cover no-repeat;
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
.form_certify_field {
    width: 100%;
}

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

.form_certify_field>.certify_input {
    width: 60%;
    height: 48px;
    outline: none;
    border: none;
    border-radius: 8px;
    padding: 0 12px;
    background-color: #eaeaea;
    opacity: 0.8;
    font-size: 14px;
    font-weight: 600;
    margin-right: 10%;
}

.form_certify_field>img {
    display: inline-block;
    vertical-align: middle;
    width: 30%;
    height: 48px;
    border-radius: 10px;
}

.username_input:focus {
    opacity: 1;
}

.certify_input:focus {
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

.form>.form_certify_field {
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

.signup {
    color: #fff;
    background-color: #d55a5a;
    margin-left: 10px;
}

.signin {
    color: #000;
    margin-right: 10px;
}
</style>