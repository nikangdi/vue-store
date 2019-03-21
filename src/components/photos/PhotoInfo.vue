<template>
    <div class="photoinfo-container">
        <h3>{{photoinfoa.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time | dataFormat}}</span>
            <span>点击:{{photoinfo.click}} 次</span>
        </p>
        <hr>
        <!-- 缩略图区域start         -->
        <div class="thumbs">      
             <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">   
        </div>
        <!-- 缩略图区域end -->
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"> </div>
        <!-- 评论子组件 -->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponent/comment.vue'

export default {
    data(){
        return {
            id: this.$route.params.id,
            photoinfo: {},
            list:[],//缩略图的数组
        }
    },
    methods:{
        getPhotoInfo(){
            this.$http.get("api/getimageInfo/"+this.id).then(result => {
                if(result.body.status === 0){
                    this.photoinfo= result.body.message[0];
                }else{
                    Toast("获取图片详细信息出错，请重试")
                }
            })

        },getThumbs(){
            this.$http.get("'api/getthumimages/'+this.id").then(result => {
                if(result.body.status === 0){
                    this.list=result.body.message.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                        //循环每个图片数据，不全数据的宽和高。
                    })
                }
            })
            
        },

    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();

    },
    components:{
        "comment-box":comment,
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
    padding: 3px;
    h3{
        color:#26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs{
        img{
            margin:10px;
            box-shadow:0 0 8px #999;
        }
    }

}

</style>


