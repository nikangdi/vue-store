<template>
  <div class="app-container">
    <!-- 顶部header部分 -->
    <mt-header fixed title="程序员"></mt-header>

    <!-- 中间router-view部分 -->
  <transition > 
      <router-view></router-view>
  </transition>
  
   


    <!-- 底部tabbar部分 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

  </div>
</template>

<script>
</script>


<style lang="scss" scoped>
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
</style>
