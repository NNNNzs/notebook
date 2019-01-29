<template>
  <div class="user-avator-dropdown">
    <div @click="handleClick('logout')" class="loginOut">退出登录</div>
    <div class="loginName">{{username}}</div>
    <!-- <Dropdown @on-click="handleClick">
      <Avatar :src="userAvator"/>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown> -->
  </div>
</template>

<script>
import "./user.less";
import { mapActions } from "vuex";
export default {
  name: "User",
  data() {
    return {
      username:''
    };
  },
  mounted() {
    this.username = localStorage.username;
  },
  props: {
    userAvator: {
      type: String,
      default: ""
    }
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    handleClick(name) {
      switch (name) {
        case "logout":
          this.handleLogOut().then(() => {
            this.$router.push({
              name: "login"
            });
          });
          break;
      }
    }
  }
};
</script>
<style>
.loginOut {
  float: right;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 27px;
  margin: 12px;
  cursor: pointer;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.loginOut:active {
  outline: none;
  border-color: #409eff;
}

.loginName:active {
  outline: none;
  border-color: #409eff;
}

.loginName {
  display: inline-block;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 27px;
  margin: 12px;
  cursor: pointer;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
