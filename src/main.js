import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
// 引入 axios
import axios from 'axios'
// 引入 echarts
import vCharts from 'v-charts'

Vue.use(vCharts)

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/sinaNews/'
// 配置axios 的请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// 挂载到Vue实例原型上
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
