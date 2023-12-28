<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="login-form">
            <h2>登录</h2>
            <form>
              <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
              </div>
              <div class="form-group">
                <label for="password">密码</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary">登录</button>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="background-image"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    }
  };
  </script>
  
  <style>
  .container {
    height: 100vh;
  }
  
  .background-image {
    background-image: url('../assets/img/background.jpg');
    background-size: cover;
    height: 100%;
  }
  </style>
  