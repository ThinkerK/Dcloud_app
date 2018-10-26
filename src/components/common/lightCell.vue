<template>
  <div class="light-cell flex_between padding_tb border">
    <div class = "left flex_between">
        <div>
            <i class="nullIcon" v-if = "nullIcon"></i> 
            <i class="nnullIcon" v-if = "nnullIcon"></i>   
            <i class="msgIcon" v-if = "msgIcon"></i>
            <span class="tit">{{lfCon}}</span>     
        </div>
        <div style="margin-left: 0.2rem" v-if = "mdCon">
            <span>{{mdCon}}</span>
        </div>
        <slot name = "zc-box"></slot>
    </div>
    <!-- <slot name = "zc-box"></slot> -->
    <div class = "right">
        <span :class="[blue?'font-blue':'font-gray']">{{rtCon}}</span>
        <span v-if = "zcCon" class="zc-box">{{zcCon}}</span>
        <slot name = "other"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props:['lfCon','rtCon','mdCon','msgIcon','zcCon','blue','nullIcon','nnullIcon']
}
</script>

<style scoped lang = "scss"> 
@import '@/style/mixin.scss';
.light-cell{
    width: 100%;
}
.msgIcon{
    display: inline-block;
    @include wh(0.48rem,0.48rem)
    @include bg('../../images/common/shuju.png')
    vertical-align: middle;
    margin-right:0.2rem;
}
.nullIcon{
    display: inline-block;
    @include wh(0.48rem,0.48rem)
    vertical-align: middle;
    margin-right:0.2rem;
}
.nnullIcon{
    display: inline-block;
    @include wh(0.96rem,0.48rem)
    vertical-align: middle;
    margin-right:0.2rem;
}
.zc-box{
    display: inline-block;
    margin-left: 0.5rem
}
.tit{
    display: inline-block;
    min-width: 1.7rem;
    text-align: left
}
</style>
