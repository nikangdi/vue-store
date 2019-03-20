<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120" v-model="msg"></textarea>

        <!-- 发表评论按钮 -->
        <!-- 若之前的加载更多已经把pageindex加到大于一的数值，若此时枝节getcomments则得到的是第三页的数据，前两页的数据已经没了 -->
        <!-- 当评论成功后，客户端手动拼接一个最新的评论对象unshift追加到comments中的开头。这样就不会刷新列表了 -->

        <mt-button type="primary" size="large" @click.native='postComment'>发表评论</mt-button>
        
        <!-- 评论列表 -->
        <div class="cmt-list">
            <div class="cmt-item" v-for="( item ,i ) in comments" :key="item.add_time" >
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp; 用户：{{item.user_name}} &nbsp;&nbsp;发表时间： {{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content==='undefined' ? "此用户很懒,什么都没说":item.content}}
                </div>
            </div>
        </div>


        <!-- 加载更多按钮 -->
        <mt-button  @click.native='getMore' type="danger" size="large" plain>加载更多</mt-button>
        <!-- 加载更多实现1.点击事件中让pageindex+1  在进行一次getComment（）请求 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageIndex: 1,//默认展示第一页数据
            comments:[],//所有的评论数据
            msg:'',//评论输入的内容

        }
    },
    created(){
        this.getComments();

    },
    props:["id"],
    methods:{
        getComments(){
         
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result => {
                if (result.body.status ===0){
                    this.comments = this.comments.concat(result.body.message);
                    // 每当获取新数据的时候，不要把之前的数据清空，而应该是拼接
                }else{
                    Toast("发表评论失败");
                }
            })

        },
        getMore(){
            // 加载更多
            this.pageIndex++;
            this.getComments();
             
        },
        postComment(){
               // 首先校验内容是否为空
            if (this.msg.trim().length  ===0){
                return Toast("评论内容不能为空");
            }
            this.$http.post("api/postcomment/"+ this.$route.param.id, {content: this.msg.trim()}).then(result => {
                if (result.body.status ===0){
                    var cmt = {user_name: "匿名用户",add_time: Date.now(), content:this.msg.trim()};//手动将这个内容整理起来发送到页面显示出来comments数组
                    this.comments.unshift(cmt);
                    this.msg = ""
                }else{
                    Toast("请重新发表评论");
                }
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        margin:0;
        height:85px;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                background-color: #ccc;
                line-height: 30px;
            }
            .cmt-body{
                text-indent: 2em;

            }
        }
    }
}

</style>


