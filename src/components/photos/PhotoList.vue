<template>
    <div>
        <!-- topbar滚动nav开始 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id==0 ? 'mui-active': '']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>
        </div>
        <!-- topbar滚动nav结束 -->
        <!-- 图片加载（懒加载） 开始--> 
        <ul class="photo-list">
              <li v-for="item in list" :key="item.id" >
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
             </li>
        </ul>
        <!-- 图片加载（懒加载） 结束-->

    </div>
</template>


<script>
import mui from '../../lib/dist/js/mui.min.js'

// mui('.mui-scroll-wrapper').scroll({
// 	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
// });
// 初始化的时机很重要，如果放在这里，刚进入页面时候就不能滑动，因为这段初始化代码时机不对，解决方法加到mounted（）中
//另外一个问题 底部tabbar不能跳转了是因为与刚导入的mui中产生了样式冲突  找到tabbar所处位置App.vue将其样式名mui-tab-item重新命名，并将其中的全部样式用心的样式名重新写一遍


export default {
    data(){
        return{
            cates:[],//所有分类的列表数组
            list:[],//图片列表的数组
        }

    }, 
    methods:{
        getAllCategory(){
            //获取全部图片分类；
            this.$http.get("api/getimgcategory").then(result =>{
                if (result.body.status === 0){
                    result.body.message.unshift({title:"全部",id:0});
                    this.cates = result.body.message;
                }else{
                    Toast("获取全部图片分类失败")
                }
            })
        },
        getPhotoListByCateId(cateId){
            //根据图片分类id获取图片列表
            this.$http.get('api/getimages/' + cateid).then(result =>{
                if (result.body.status === 0){
                    this.list = result.body.message 
                }
                else{
                    Toast('图片加载失败')
                }
            })

        },

    },
    created(){
        this.getAllCategory();
        //默认进入页面就主动请求全部图片列表的数据，及idweiling手动添加的那个topbar的数据
        this.getPhotoListByCateId(0);
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });

    }
    
}
</script>

<style lang="scss" scoped>
*{
    touch-action: pan-y;//谷歌浏览器中提升滑动流畅度
}

.photo-list{
    list-style:none;
    margin:0;
    padding:10px;
    padding-bottom: 0;
    li{
         background-color: #ccc;
         margin-bottom:10px;
         text-align: center;
         box-shadow: 0 0 9px #999;
         position:relative;
         img{
             width: 100%;
             vertical-align: middle;

         }
         //此处注意修改官方文档
         // image[lazy=loading] {
         //   width: 40px;
         //   height: 300px;
         //   margin: auto;
         // }
         //l懒加载图片即那个转的加载圈
         img[lazy="loading"] {
                 width: 40px;
                 height: 300px;
                 margin: auto;
         }
         .info{
             color:white;
             text-align:left;
             position:absolute;
             bottom:0;
             background-color: rgba(0,0,0,0.4);
             max-height:84px;

         }
         .info-title{
             font-size: 14px;

         }
         .info-body{
             font-size: 13px;

         }
 
    } 
}
</style>


