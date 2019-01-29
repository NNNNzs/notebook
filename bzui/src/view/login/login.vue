<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
import { login } from "@/api/user.js";
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    handleSubmit({ userName, password }) {
      let me = this;
      this.$axios
        .post(
          "http://sc.94rp.com/bzDCP/login",
          $qs.stringify({
            username: userName,
            password: password
          })
        )
        .then(data => {
          if (data.data.code == 200) {
            localStorage.username = data.data.nickname;
            localStorage.token = data.data.token;
            me.$store.state.loginStat = data.data;
            me.$Notice.success({
              title: data.data.message,
              duration: 1
            });
            me.$router.push({
              name: this.$config.homeName
            });
          } else {
            me.$Notice.warning({
              title: data.data.message,
              duration: 1,
            });
          }
        });
    }
  }
};
</script>

<style>
</style>
