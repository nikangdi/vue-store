// 入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import app from './App.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

//注册Vuex
import Vuex from "vuex";
Vue.use(Vuex);

var car = JSON.parse( localStorage.getItem('car') || '[]');
//每次刚进入网站  肯定会调用main.js  调用的时候先将localstorage中的car商品信息读出来，并加到state.car上

var store = new Vuex.Store({
    state:{
        car:car,//存储一些商品对象{id:商品id , count： 要购买的数量，price： 商品的单价 ，  是否选中  “选中后才能进一步去付账”  默认选中  }
    },
    mutations:{
        addToCar(state, goodsinfo){
        // 点击goodsinfo页面中的   加入购物车按钮  将商品信息保存到  store中的 car上

            // 1.如果购物车中原来就有 相应的商品，则只更新数据
            // 2.如果 购物车中原来没有相应的商品   直接 push到  state中的 car数组中

            var flag = false ;
            state.car.some(item => {     //注意点 1.采用some（）方法   2.mutation中调用state中的数据   不是用this来调用的
                if (item.id == goodsinfo.id){
                    item.count+= parseInt( goodsinfo.count );
                    flag = true;
                    return true;
                } 
            });
            //如果最终循环完毕  flag还为false  则直接将goodsinfo  push  到数组 中去。
            if (!flag){
                    state.car.push( goodsinfo );
                };

                //当更新car之后，把car数组  存储到本地的 localstorage中  来持久化数据
                // 否则一点刷新，购物车数据又清空了
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        undateGoodsInfo(state,goodsinfo){
        //修改购物车中商品的数量值
            state.car.some(item =>{
                if (item.id ==goodsinfo.id){
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));

        },
        removeCarById(state , id ){
            // 根据id从store中的购物车中  删除对应的那条  商品数据
            state.car.some((item,i) => {
                if (item.id == id){
                    state.car.splice(i,1);
                    return true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected;
                    return true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));
        }

    },
    getters:{
        // getAllCount(state){
        //     var c= 0;
        //     state.car.forEach(item => {
        //         c += item.count; 
        //         return c;
        //     })
        // },
        getGoodsCount(state){
            //获取car中的id：value重新生成一个对象，方便查找。否则每遍查找得重新遍历car对象，查找的复杂度很高！！！！！
            // ********************************
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            });
            return o;

        },
        getGoodsSelected(status){
            var o = {};
            state.car.forEach(item=>{
                o[item.id]= item.selected;
                return o;
            })

        },getGoodsCountAndAmount(state){
            var o ={ 
                count: 0, //勾选的数量
                amount: 0, //勾选的总价
                
            };
            state.car.forEach(item => {
                if( item.selected){
                        o.count += item.count; 
                        o.amount += item.price * item.count;
                }
            })
                        
            return o;

        }

    },
});

import VuePreview from 'vue-preview'
// 图片预览插件
Vue.use(VuePreview)

//全局配置  请求的根路径
Vue.http.options.root='http://www.escook.cn:3000';

// 全局配置  post表单数据的请求格式，即请求头，this.$http.post的第三个属性
Vue.http.options.emulateJSON= true;


// mint-ui
import { Header ,Swipe, SwipeItem,Toast,Button, Lazyload, Switch } from 'mint-ui'


Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Toast.name ,Toast);
Vue.component(Button.name ,Button);
Vue.component(Lazyload.name,Lazyload);
Vue.component(Switch.name, Switch);


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
    router,
    store,
    
})