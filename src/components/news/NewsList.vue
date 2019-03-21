<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id" >
					<router-link :to="'/home/newsinfo/'+item.id">
                    <!-- 改造路由 -->
						<img class="mui-media-object mui-pull-left" :src="item.image_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间：{{item.add_time}}</span>
                                <!-- 时间格式化存在问题 用过滤器  因为其他组件也有使用时间，故做一个全局过滤器-->
                                <span>点击：{{item.click | dateFormat}} 次</span>
                            </p>
						</div>
					</router-link>
				</li>
                <!-- 底部最后一个li被tabbar挡住在其底下，加一个padding解决 -->
			</ul>
    </div>
</template>



<script>
export default {
    data(){
        return {
            newsList:[]
        };
    },
    created(){
        this.getNewsList();
    },
    methods:{
        getNewsList(){
            this.$http.get("api/getnewslist").then(result => {
                if(result.body.status === 0){
                    this.newsList = result.body.message;
                   

                }else{
                     Toast("获取新闻列表失败")
                }
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.mui-table-view {
    li{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color:#226aff;
            display: flex;
            justify-content: space-between;
        }

    }

}

</style>


