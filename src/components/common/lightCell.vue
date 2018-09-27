<template>
  <div class="light-cell flex_between padding_tb border">
    <div class = "left w55 flex_between">
        <div>
            <i class="msgIcon" v-if = "msgIcon"></i>
            <span>{{lfCon}}</span>     
        </div>
        <div>
            <span>{{mdCon}}</span>
        </div>
    </div>
    <div class = "right">
        <span>{{rtCon}}</span>
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
  props:['lfCon','rtCon','mdCon','msgIcon']
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
</style>
