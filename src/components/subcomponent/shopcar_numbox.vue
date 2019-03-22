<template>

            <!-- 本组件 是直接用goodsinfo_numbox改出来的 -->

    <div>
        <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox"/>
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

methods:{
        countChanged(){
            //每当数量值改变  则立即把这个值同步到购物车的 state.car数组中去,覆盖之前的数据值
            this.$store.commit("updateGoodsInfo",
            { id:this.goodsid, count:this.$refs.numbox.value})
           
        }
    },props:["initcount","goodsid"],
}
</script>

