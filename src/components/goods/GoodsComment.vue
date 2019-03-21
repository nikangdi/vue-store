<template>
    <div>
       <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import comment from '../subcomponent/comment.vue';

export default {
          data(){
              return{
                id = this.$route.params.id,
              }
        },
        components:{
            "cmt-box":comment,
        },
     
}
</script>

<style lang="scss" scoped>

</style>
