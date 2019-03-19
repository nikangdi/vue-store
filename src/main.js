// 入口文件
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vue from 'vue'
import app from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)


// mint-ui
import { Header ,Swipe, SwipeItem} from 'mint-ui'


Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


// mui
import './lib/dist/css/mui.min.css'
import './lib/dist/css/icons-extra.css'
import './lib/dist/js/mui.min.js'

// 导入路由
import router from './router.js'




var vm = new Vue({
    el: "#app",
    render:c => c(app),
    router
})