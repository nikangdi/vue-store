<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsData.title}}</h3>
        <p class="subtitle">
            <span>发表时间: {{newsData.add_time | dateFormat}}</span>
            <span>点击： {{newsData.click}}次</span>
        </p>

        <dic class="content" v-html="newsData.content"></dic>

        <!-- 评论子组件 -->
        <comment-box :id="this.id"></comment-box>

    </div>
</template>

<script>
import comment from '../subcomponent/comment.vue'

export default {
    data(){
        id: this.$route.params.id;
        newsData:{};
    },
    created(){
        this.getNewsInfo();

    },
    components:{
        'comment-box': comment
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.newsData = result.body.message[0];
                }else{
                    Toast("获取新闻失败");
                }
            })

        }


    },
}
</script>

<style lang="scss" >
.newsinfo-container{
    padding: 0 4px;
    .title{
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color:red;
    }
    .subtitle{
        color:#226aff;
        font-size: 13px;
        display:flex;
        justify-content: space-between;

    }
    .content{
        img{
            width: 100%;
            //加载的新闻页面图片样式有问题，宽度不能自适应，解决方法去掉scoped ，但是去掉以后一定注意全局中样式的污染问题，定义专属的样式名来选择
        }
    }

}

</style>


