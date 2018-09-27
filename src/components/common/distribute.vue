<template>
  <div class="distribute">
    <div class="single" v-if = "!all">
        <span class="state"></span>
        <i class="icon"></i>
    </div>
    <div class="all padding_tb  padding" v-if = "all">
        <div class="all-btn  padding_tb">全部下发</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props:['all']
}
</script>

<style scoped lang = "scss">
@import '@/style/mixin.scss';
.single .icon{
    vertical-align: middle;
    display: inline-block;
    margin-left: 0.3rem;
    @include wh(0.48rem,0.48rem)
    @include bg('../../images/common/download.png')
}
.all{
    width: 100%;
    margin-top:0.4rem; 
    .all-btn{
    background: #169AFF;
    color: white;
    border-radius:0.15rem;
    }
    
}
</style>
