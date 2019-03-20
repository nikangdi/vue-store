import VueRouter from 'vue-router'
import Vue from 'vue'

// 引入并注册组件
import Home from './components/home.vue'
import Shopcar from './components/shopcar.vue'
import Member from './components/member.vue'
import Search from './components/search.vue'
import NewsList from './components/news/NewsList.vue' 
import NewsInfo from './components/news/NewsInfo.vue'

Vue.use(Home)
Vue.use(Shopcar)
Vue.use(Member)
Vue.use(Search)
Vue.use(NewsList)
Vue.use(NewsInfo)


// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},

    {
      path:'/home',component:Home,
      children:
        [{path:'/newslist',component:NewsList}]
        },
    {path:'./home/newslist/:id',component:NewsInfo},
    {path:'/shopcar',component:Shopcar},
    {path:'/member',component:Member},
    {path:'/search',component:Search},
    
  ],
  linkActiveClass:'mui-active',//覆盖默认的路由高亮的类
})

// 把路由对象暴露出去
export default router