<template>

  <div class="app-container">
    <!-- 顶部header部分 -->
    <mt-header fixed title="程序员">
      <span  slot="left" @click="goBack">
            <mt-button icon="back" v-show='flag'>返回</mt-button>
      <span>
    </mt-header>

    <!-- 中间router-view部分 -->
  <transition > 
      <router-view></router-view>
  </transition>
  
   


    <!-- 底部tabbar部分 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home-llb"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ this.$store.getters.getGoodsCountAndAmount.count }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

  </div>
</template>

<script>
export default {
    data(){
      return {
        flag: false  //会有问题  即当你在一个页面刷新时   因为flag默认值为 false  所以会  默认隐藏后退按钮  即使不是首页
      }
    },created(){
      //为了解决刷新时默认flag影响back按钮隐藏的问题
      if($route.path ==='/'){
        this.flag = false;
      }else{
        this.flag=true;
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
    },watch:{
      //监听路由地址，当路由为首页的时候，隐藏掉返回按钮
      '$route.path':function(newVal){
        if(newVal == '/home'){
          this.flag = false;
        }else{
          this.flag=true;
        }
      }

    },

}
</script>


<style lang="scss" scoped>
.mint-header{
  z-index:999;
}
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;//解决页面切换横向滚动条的问题！！！！！！


}

.v-enter, 
/*.v-leave-to */{
  opacity: 0;
  transform: translateX(100%);
  //会有消失时候从右侧出的问题，因为v-leave-to要去translate100%的位置，故重新写v-leave-to抽离出去
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
  //position：absolute  解决往上飘的问题。。。！！！！
}
.v-enter-active, .v-leave-active {
  transition: all 0.5s ease;
}
// 该类名，解决 tabbar 点击无法切换的问题
.mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
