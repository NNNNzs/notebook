
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">百助智能化系统</div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>倪宗山
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>退出登录
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>管理中心
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger style="height:100vh">
          <side-menu></side-menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0',textAlign:'left'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{minHeight: '280px', background: '#fff'}">
            <Tabs :value="activeMenu" type="card" closable :animated="false" :capture-focus="true">
              <TabPane
                v-for="(tag,index) in tagsName"
                :key="index"
                :label="tag.title"
                :name="tag.title"
              >
                <keep-alive>
                  <template></template>
                  <!-- <router-view/> -->
                </keep-alive>
              </TabPane>
              <!-- <TabPane label="标签二" name="2">
              </TabPane>-->
            </Tabs>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import sideMenu from "@/components/public/sideMenu";
export default {
  components: {
    sideMenu
  },
  data() {
    return {
      activeMenu: "1"
    };
  },
  computed: {
    tagsName() {
      return this.$store.state.tagsName;
    }
  }
};
</script>
<style scoped>
.layout {
  /* border: 1px solid #d7dde4; */
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  line-height: 30px;
  color: #efefef;
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  box-shadow: #5b6270 2px 2px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>