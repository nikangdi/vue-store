// 入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import app from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
//全局配置  请求的根路径
Vue.http.options.root='http://www.escook.cn:3000';
// mint-ui
import { Header ,Swipe, SwipeItem,Toast,Button } from 'mint-ui'


Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Toast.name ,Toast);
Vue.component(Button.name ,Button);



// mui
import './lib/dist/css/mui.min.css'
import './lib/dist/css/icons-extra.css'
import './lib/dist/js/mui.min.js'

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