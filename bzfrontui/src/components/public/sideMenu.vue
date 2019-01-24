<template>
  <!-- <Sider hide-trigger :style="{background: '#fff'}"> -->
  <Sider hide-trigger style="height:100vh">
    <Menu
      @on-select="selectMenu"
      active-name="收款1"
      theme="dark"
      width="auto"
      :open-names="['业务智能化']"
    >
      <Submenu>
        <router-link to="/home/a">
          <MenuItem>aaaaaa</MenuItem>
        </router-link>
        <router-link to="/home/b">
          <MenuItem>aaaaaa</MenuItem>
        </router-link>
        <router-link to="/home/v">
          <MenuItem>aaaaaa</MenuItem>
        </router-link>
      </Submenu>
      <!-- <Submenu v-for="(item,menuIndex) in menulist" :key="menuIndex" :name="item.name">
        <template v-if="item.icon" slot="title">
          <Icon :type="item.icon"></Icon>
          {{item.name}}
        </template>
        <MenuItem
          v-for="(list,itemIndex) in item.children"
          :key="itemIndex"
          :name="list.name"
        ></MenuItem>
      </Submenu>-->
    </Menu>
  </Sider>
</template>

<script>
export default {
  data() {
    return {
      menulist: [
        {
          name: "业务智能化",
          icon: "ios-navigate",
          children: [
            {
              name: "基础信息"
            },
            {
              name: "收款"
            },
            {
              name: "付款"
            }
          ]
        },
        {
          name: "财务智能化",
          icon: "ios-keypad",
          children: [
            {
              name: "基础信息2"
            },
            {
              name: "收款2"
            },
            {
              name: "付款2"
            }
          ]
        },
        {
          name: "运营智能化",
          icon: "ios-analytics",
          children: [
            {
              name: "基础信息3"
            },
            {
              name: "收款3"
            },
            {
              name: "付款3"
            }
          ]
        }
      ]
    };
  },
  computed: {
    tagsName() {
      return this.$store.state.tagsName;
    }
  },
  methods: {
    selectMenu(activeName) {
      console.log(activeName);
      let isShow = false;
      let tagsName = this.tagsName;
      tagsName.forEach(element => {
        if (element.title == activeName) {
          isShow = true;
          return;
        }
      });
      //如果标签页里没有，新增
      if (!isShow) {
        this.$store.commit("addTags", { title: activeName });
      } else {
      }
      //如果有，切换到这个
    }
  }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>

