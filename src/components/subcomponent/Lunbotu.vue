<template>
    <div >
        <!-- <h3>这是一个轮播图组件</h3> -->
        <!-- 轮播图 start-->


        <mt-swipe :auto="4000">
            <!-- 该item里面不含有id属性，故用key绑定url，要绑定的是该item中的值 -->
            <mt-swipe-item v-for="item in LunbotuList" :key="item.url">

                <!-- 抽离出轮播图组件后，谁用组件，谁给本组件传lunbotulist这个数组 -->
                <!-- 此时Lunbotulist应该是父组件向子组件传值 -->


                <img :src="item.img" :class="{'img-isfull':isfull}"> 
            </mt-swipe-item>    
        </mt-swipe>
        <!-- 轮播图结束 -->


    </div>
</template>

<script>
export default {
    props:["Lunbotulist","isfull"]

}
</script>
style <style lang="scss" scoped>

.mint-swipe{
    height: 200px;
    .mint-swipe-item{
        text-align: center;
        img{
            height: 100%;
        }
        img-isfull{
            width:100%;
        }
    
    }
}
</style>

