import VueRouter from 'vue-router'
import Vue from 'vue'

// 引入并注册组件
import Home from './components/home.vue'
import Shopcar from './components/shopcar.vue'
import Member from './components/member.vue'
import Search from './components/search.vue'
import NewsList from './components/news/NewsList.vue' 
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

// Vue.use(Home)
// Vue.use(Shopcar)
// Vue.use(Member)
// Vue.use(Search)
// Vue.use(NewsList)
// Vue.use(NewsInfo)
// Vue.use(PhotoList)
// Vue.use(PhotoInfo)

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},

    {
      path:'/home',component:Home,
      children:
        [
          {path:'newslist',component:NewsList},
          {path:'photolist',component:PhotoList},
          {path:'photoinfo/:id',component:PhotoInfo},
          {path:'goodslist',component:GoodsList},
          {path:'goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},//命名路由
          {path:'goodsdec/:id', component:GoodsDesc,name:"goodsdesc"},
          {path:'goodscomment/:id', component:GoodsComment,name:"goodscomment"},

      ]
        },
    {path:'./home/newsinfo/:id',component:NewsInfo},
    {path:'/shopcar',component:Shopcar},
    {path:'/member',component:Member},
    {path:'/search',component:Search},
    
  ],
  linkActiveClass:'mui-active',//覆盖默认的路由高亮的类
})

// 把路由对象暴露出去
export default router