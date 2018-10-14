<template>
  <header class="flex_between padding head_top" id="head_top">
    <div class="head_left flex_between" >
      <slot name="address"></slot>
      <div class="head_goback" v-if = "noneIcon"></div>
      <div class = "head_goback" v-if = "goBack" @click = "$router.go(-1)"><i></i> </div>
      <slot name="back"></slot>
    </div>
    <div class="head_middle">
      <slot name="head_search"></slot>
      <div class="title_head ellipsis" v-if="headTitle">
        <span class="title_text">{{headTitle}}</span>
      </div>
    </div>
    <div class="head_right flex_between">
      <slot name="select"></slot>
      <slot name="save"></slot>
      <div class = "scan flex_col" v-if = "scanBtn" @click = "goScan">
        <i class="scan-icon"></i>
        <span class="scan-txt">扫一扫</span>
      </div>
    </div>
  </header>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {

    }
  },
  props: ['goBack','headTitle','scanBtn','noneIcon'],
  methods:{
    goScan(){
      Toast("暂不支持")
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/style/mixin.scss';
.head_top{
  @include wh(100%,1.59rem);
    position: fixed;
    z-index: 102;
    top: 0;
    background:#169AFF;
}

.head_left{
  height: 100%
}
.head_right{
  min-width: 1rem;
  height: 100%;
  @include sc(0.42rem,#fff);
}
.head_middle{
  flex: 1;
}
.head_goback{
  @include wh(1rem,auto)
  text-align: left;
  i{
    @include wh(0.32rem,0.58rem)
    @include bg('../../images/common/goback.png')
    display: inline-block;
  }
}
.title_head{
  text-align: center;
  font-size: 0.6rem;
  color:#fff
}
.scan{
  text-align: right;
  height: 100%;
  padding-top: 0.3rem; 
  .scan-icon{
    @include bg('../../images/main/sys.png')
    @include wh(0.61rem,0.58rem)
    display: block
  }
  .scan-txt{
    @include sc(0.24rem,white)
  }
}



</style>