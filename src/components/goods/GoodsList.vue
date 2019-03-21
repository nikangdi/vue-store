<template>
    <div class="goods-list">
        <!-- 商品列表单元start -->
        <!-- 方法一：编程式导航 注册点击时间。利用window.location.href 进行跳转 -->
        <div  class="good-item" v-for="item in getGoodsList" :key="item.id" @click="goDetail(item.id)">
        <!-- 方法2： router-link :to 进行跳转 -->
        <!-- <router-link class="good-item" v-for="item in getGoodsList" :key="item.id" :to="'/home/goodsinfo/'+ item.id">  -->
            <img :src="item.img_url" >
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>

                </p>
                <p class="sale">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>

                </p>
            </div>
        <!-- </router-link> -->
        </div>
        <!-- 商品列表单元结束 -->
        <mt-button type="danger" size="large" @click.native="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
                    pageIndex: 1, //商品分页页数
                    goodsList: [] ,//存放商品列表数组
        }


    },methods:{
        getGoodsList(){
            //获取商品列表
            this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(
                result => {
                    if (result.body.status ===0){
                        this.goodsList = this.goodsList.concat(result.body.message);
                    }else{
                        Toast("商品列表加载失败")
                    }
                }
            )
        },
        getMore(){
            // 获取更多页的数据，加载更多点击事件
            this.pageIndex++;
            this.getGoodsList();
        },
        goDetail(id){
            //使用js方式进行路由导航
            this.$router.push('/home/goodsinfo/'+id);
            //查官方文档push有四种方式
        },



    },created(){
        this.getGoodsList();

    },
}
</script>
<style lang="scss" scoped>
.goods-list{
    display:flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
        min-height: 293px;
        width:49%;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin:4px 0;
        padding:2px;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        // position: relative;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            // position: absolute;
            // bottom:2px;
            p{
                margin:0;
                padding: 5px;
            }
            .price{
                .now{
                    font-weight: bold;
                    font-size: 16px;
                    color:red;

                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left:10px;

                }
            }
            .sale{
                display:flex;
                justify-content: space-between;
                font-size: 13px;

            }
        }

    }

}

</style>


