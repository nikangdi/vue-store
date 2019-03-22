<template>
    <div class="shopcar-container">
        
        <div class="goods-list">
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <!-- 按钮开关 -->
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
                        @change="selectedChanged(id,$store.getters.getGoodsSelected[item.id])"> </mt-switch>   
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>


                                <!-- ******************传值方式--- 初始化numbox中的值 -->
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]"  :goodsid="item.id" readonly></numbox>  
                                <!-- 问题  如何从购物车中获取 每个商品的数量 -->
                                <!-- 可以先创建 一个空对象，然后循环购物车中的商品数据  -->
                                 <!-- 把当前循环的这条商品的id作为属性名  count当做属性值   {88:1111, 90: 3423 }-->
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>

					</div>
				</div>
			</div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan" >
						<div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品
                                <span class="red">{{$store.getters.getGoodsCountAndAmount.count }}</span>件，总价 
                                <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span> 
                            </p>
                        </div> 
                        <mt-button type="danger"> 去结算 </mt-button>
					</div>
                   
				</div>
			</div>
    </div>
</template>
<script>
import numbox from './subcomponent/shopcar_numbox.vue'
export default {
    data(){
        return{
            goodsList:[],//购物车中所有商品的数据


        }
    },methods:{
        getGoodsList(){
        //获取购物车商品列表
            //需考虑情况，若  购物车数组car本身为空，再直接执行下列请求会报错！！！！！！！！

            //1获取 store 中所有商品的id  拼接出一个  ids 用逗号分隔的字符串
            var carGoodsIdList = [];
            this.$store.state.car.forEach(item => {
                carGoodsIdList.push(item.id)
            });
            if(carGoodsIdList.length <= 0){
                //如果购物车中没有商品，则不需要请求接口， 否则会报错
                return;
            }
            this.$http.get("api/goods/getshopcarlist/"+ carGoodsIdList.join()).then(result=> {
                if(result.body.status === 0){
                    this.goodsList = result.body.message;

                }

            })
        },
        remove(id,index){
            // 点击删除   把商品从store中根据id删除  ，同时  根据v-for的索引，把goodslist中的删除掉
            this.goodsList.splice(index, 1);
            this.$store.commit('removeCarById', id);
        },
        selectedChanged(id,val){
            //每当点击开关，把最新的开关状态同步到  store中
           
            this.$store.commit("updateGoodsSelected",{id,selected:val})
            
        },
    },created(){
        this.getGoodsList();

    },components:{
        numbox,
    }
    
}
</script>
<style lang="scss" scoped>
.shopcar-container{

    .goods-list{
        .mui-card-content-inner{
            display:flex;
            align-items: center;//纵向居中
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color:red;
                font-weight: bold;
            }
        }

    }
    .jiesuan{
        display:flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }



}

</style>
