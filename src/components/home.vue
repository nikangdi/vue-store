<template >
    <div>
        <!-- 轮播图 start-->
        <mt-swipe :auto="4000">
            <!-- 该item里面不含有id属性，故用key绑定url，要绑定的是该item中的值 -->
            <mt-swipe-item v-for="item in LunbotuList" :key="item.url">
                <img :src="item.img" >

            </mt-swipe-item>
            
        </mt-swipe>
        <!-- 轮播图结束 -->
        <!-- 九宫格改造为6宫格开始 -->
        
		    <ul class="mui-table-view mui-grid-view mui-grid-9">
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                <img src="../images/menu1.png" alt="">
		                <div class="mui-media-body">新闻资讯</div></a></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                <img src="../images/menu2.png" alt="">
		                <div class="mui-media-body">图片分享</div></a></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                <img src="../images/menu3.png" alt="">
		                <div class="mui-media-body">商品购买</div></a></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                <img src="../images/menu4.png" alt="">
		                <div class="mui-media-body">留言反馈</div></a></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                <img src="../images/menu5.png" alt="">
		                <div class="mui-media-body">视觉专区</div></a></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                <img src="../images/menu6.png" alt="">
		                <div class="mui-media-body">联系我们</div></a></li>

		    </ul> 
		
        <!-- 6宫格结束 -->

    </div>
</template>
<script>
import { Toast } from 'mint-ui'

export default {
    data(){
        return{
            LunbotuList:[],

        }
    },
    methods:{
        getLunbotu(){
            // 获取轮播图数据的方法
            this.$http.get('http://www.escook.cn:3000/api/getlunbo').then(response => {console.log(response.body)})
            // 回传的数据response其中的body中有个状态status及message数组，其中包含着一些对象，每个对象包含该图片地址及点击该图片要跳转到的地址
            if(response.body.status === 0){
                this.LunbotuList= response.body.message;
            }else{
                Toast("加载轮播图失败")

            }
        }

    },
    created(){
        this.getLunbotu();

    }
    
}
</script>
<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    .mint-swipe-item{
        &:nth-child(1){
            background-color:red;

        }
        &:nth-child(1){
            background-color:yellow;

        }
        &:nth-child(1){
            background-color:green;        

        }
        img {
            width:100%;
            height: 100%;
        }
    }
}

.mui-grid-view .mui-grid-9{
    background-color: #fff;
    border:none;
    img{
        width:60px;
        height: 60px;
    }
    .mui-media-body{
        font-size: 13px;
    }
}
.mui-grid-view .mui-grid-9 .mui-table-view-cell{
    background-color: #fff;
    border: none;

}
</style>


