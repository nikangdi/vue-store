// 入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import app from './App.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import VuePreview from 'vue-preview'
// 图片预览插件
Vue.use(VuePreview)

//全局配置  请求的根路径
Vue.http.options.root='http://www.escook.cn:3000';

// 全局配置  post表单数据的请求格式，即请求头，this.$http.post的第三个属性
Vue.http.options.emulateJSON= true;


// mint-ui
import { Header ,Swipe, SwipeItem,Toast,Button, Lazyload } from 'mint-ui'


Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Toast.name ,Toast);
Vue.component(Button.name ,Button);
Vue.component(Lazyload.name,Lazyload);


// mui
import './lib/dist/css/mui.min.css'
import './lib/dist/css/icons-extra.css'
// import './lib/dist/js/mui.min.js'

// 导入路由
import router from './router.js'

// 定义全局过滤器
// 导入时间插件
import moment from 'moment'
Vue.filter('dateFormat',function(datastr,pattern="YYYY-MM-DD HH:mm:ss"){
    moment(datastr).format(pattern);
})




var vm = new Vue({
    el: "#app",
    render:c => c(app),
    router
})