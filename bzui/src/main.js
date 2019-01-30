// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import installPlugin from '@/plugin'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import qs from 'qs'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true


Vue.prototype.$axios = axios
window.$qs = qs//写在全局变量里面了
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})


//axios拦截器,用于对session过期跳转到登录页面
vm.$axios.interceptors.response.use(function (response) {
  // 拦截未登录，跳转到登录页面
  if(response.data.message=='未登录'){
    vm.$Notice.warning({
      title:'登录过期请重新登录',
      duration: 1,
    });
    //清除本地token
    localStorage.token=''
    vm.$router.push({
      name:'login'
    })
    return response
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});