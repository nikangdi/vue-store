<template>
    <div class="goodsinfo-container">
        
        <transition
            @before-enter = "beforeEnter"
            @enter = "enter"
            @after-enter = "afterEnter">
            <div class="ball" v-show="ballFlag" ref='ball'>
            <!-- 加入购物车动画  -----  小球 -->
            </div>
        </transition>
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
                            <mt-button type="danger" size="small"  @click="addToShopCar">加入购物车</mt-button>

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
            ballFlag: false, //小球显示隐藏的标识符
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
        addToShopCar(){
        //加入购物车点击事件
            this.ballFlag = !this.ballFlag;

            var goodsinfo = {id:this.id ,
                             count: this.selectedCount, 
                             price:this.goodsinfo.sell_price,
                             select: true//默认为要购买，即 默认要付账
                             };
                             
            this.$store.commit("addToCar", goodsinfo );
        },
        //加入购物车半场动画
        beforeEnter(el){
            el.style.transform='translate(0,0)'
        },
        enter(el,done){
            el.offsetWidth;

                  // 小球动画优化思路：
                  // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
                  // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
                  // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
                  // 4. 经过分析，得出解题思路： 先拿到 徽标的 横纵 坐标，再拿到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
                  // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

                const ballPosition = this.$refs.ball.getBoundingClientRect();//获取小球在页面中的位置  
                const badgePosition = document.getElementById("badge").getBoundingClientRect();// 获取 徽标 在页面中的位置
                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.left;



            // el.style.transform="translate(93px,230px)"; //这种固定坐标写法分辨率调整及滚动的时候会出问题
            // el.style.transform="translate("+xDist+","+yDist+")";  //字符串拼接法
            el.style.transform= `translate(${xDist}px,${yDist}px)`; 

            el.style.transition="all 0.5s cubic-bezier(.81,.15,.71,.11)"
            //ease  动画效果换位cubic-bezier()  现百度即可
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
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
        .ball{
            width: 15px;
            height: 15px;
            border-radius:50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top:390px;
            left:146px;


        }
  }


}

</style>


