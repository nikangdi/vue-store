<template>
    <div class="goodsinfo-container">
        <!-- 商品轮播图界面 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<lbt-box :Lunbotulist="Lunbotu" :isfull="false"></lbt-box>
					</div>
				</div>
		</div>

        <!-- 商品购买界面 -->
        <div class="mui-card">
				<div class="mui-card-header">title</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价:<del>￥3999</del>&nbsp;销售价：<span class="now_price"> ￥2999</span>
                        </p>
                        <p>购买数量:
                            <numbox :max="goodsinfo.stock_quantity" @abc="getSelectCount"> </numbox>
                            <!-- max为该商品的最大数量  最大库存！！！！！ -->
                            
                        </p>
                             <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
                             <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
                             <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
                             <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
                             <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
      
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" >加入购物车</mt-button>
                        </p>

					</div>
				</div>
		</div>


        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{ goodsinfo.goods_no }}</p>
                        <p>库存情况：{{ goodsinfo.stock_quantity}}</p>
                        <p>上架时间：{{goodsinfo.add_time | dataFormat }}</p>
					</div>
				</div>
				<div class="mui-card-footer">

                    <!-- 点击跳转-----编程式导航 -->
                    <mt-button type="primary" size="large" plain @click="goDecs(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
		</div>

    </div>
</template>

<script>
import Lunbotu from '../subcomponent/Lunbotu.vue'
import numbox from '../subcomponent/goodsinfo_numbox.vue'

export default {
    data(){
        return{
            id: this.$route.params.id,
            lunbotu:[],//轮播图数据
            goodsinfo:{},//获取到的商品信息
            selectedCount: 1,//保存用户添加的商品数量，默认一个
        }
        

    },methods:{
        getLunbotu(){
        //获取轮播图图片
            this.$http.get("api/getthumimages/"+ this.id ).then(
                result => {
                    if(result.body.status===0){
                        this.lunbotu = result.body.message.forEach(item => {
                            item.img = item.src;
                        });
                    }else{
                        Toast("商品详情图片轮播获取失败")
                    }
                }
            )
        },
        getGoodsInfo(){
        // 获取商品详细信息
            this.$http.get("api/goods/getinfo/"+ this.id).then(result => {
                if(result.body.status === 0){this.goodsinfo = result.body.message[0];}
            })
        },
        getSelectCount(data){
        //当子组件把 选中的数量  传给父组件的时候，把选中的值存储到data中
            this.selectedCount = data;
            console.log("父组件拿到的数量值为： " + this.selectedCount);
        },
        //编程式导航
        goDesc(id){
        //点击跳转到图文减少页面
            this.$router.push({name:'/home/goodsdesc',params:id});
        },
        goComment(id){
        // 点击跳转到商品评论页面
            this.$router.push({name:'/home/goodscomment',params:id});

        },

    },created(){
        this.getLunbotu();
    },components:{
        "lbt-box":Lunbotu,
         numbox,
    },
    

}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
        background-color: #eee;
        overflow: hidden;//  解决 最外层外边距塌陷问题

        .now_price{
            color:red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-footer {
            display: block;
            button {
              margin: 15px 0;
        }
  }


}

</style>


