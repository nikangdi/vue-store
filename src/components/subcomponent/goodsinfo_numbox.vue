<template>
<!-- 问题： 我们不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的 max 值 -->
<!-- 我们可以 使用 watch 属性监听，来 监听 父组件传递过来的 max 值，不管 watch 会被触发几次，但是，最后一次，肯定是一个 合法的 max 数值 -->

    <div>
        <div class="mui-numbox" data-numbox-min='1'>
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		 </div>
    </div>
</template>
<script>

import mui from "../../lib/dist/js/mui.min.js";

export default {
    mounted(){
        //查阅官方文档挂载该组件的时候需要做相应的初始化
        mui(".mui-numbox").numbox();
        console.log(this.max);
    },

    props:["max"], 
    // *******************************

    //max为该商品的最大数量  最大库存！！！！
    
    // **********************
    //父组件传过来的值，就是一个所允许的************最大值



    watch:{//监听父组件传过来的最大值， 并重新设置 该numbox允许加到的最大值
    //使用 watch 属性监听，来 监听 父组件传递过来的 max 值，
    //不管 watch 会被触发几次，但是，最后一次，肯定是一个 合法的 max 数值
        max: function(newVal,oldVal){
       // 使用 JS API 设置 numbox 的最大值
             mui(".mui-numbox")
            .numbox()
            .setOption("max", newVal);           
        }
    },methods:{
        countChanged(){
            this.$emit("abc",parseInt(this.$refs.numbox.value))
            //获取本组件input表单中的值，
            //并将向父组件传递

            // 一个关键问题：什么时候来向父组件传值
            // 向父组件传值的时机
            // 每当 文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
            // @change事件
        }
    }
}
</script>

