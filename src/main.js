import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'
import axios from "axios"
import {Message} from "element-ui";
import config from "@/common/config/config";
import VueDND from 'awe-dnd'
// 拖拽插件
Vue.use(VueDND)
Vue.prototype.$config = config
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('访问成功');
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log("-------");
  console.log(error.response.data.msg);
  Message.error(error.response.data.msg)
  console.log('++++++')
  return Promise.reject(error);
});

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.token === true) {
    config.headers['token'] = window.sessionStorage.getItem('token')
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
