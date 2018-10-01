<template>
  <div class="jzqdetails">
    <head-top goBack = "true" headTitle = "集中器信息">
        <div slot = "save" class="reset-btn" @click = "goReset"><i></i></div>
    </head-top>
  </div>
</template>

<script>
import { Checklist,Switch } from 'mint-ui'
import headTop from '@/components/header/mainHeader'
import minuteFlag from '@/components/common/minute'
import footerBtn from '@/components/footer/footer'
import lightCell from '@/components/common/lightCell'

export default {
  data () {
    return {
    }
  },
  methods:{
    goReset(){
      this.$router.push('/devicemsgreset')
    },
  },
  components:{
    headTop,
    minuteFlag,
    footerBtn,
    lightCell
  },
}
</script>

<style scoped lang = "scss">
@import '@/style/mixin.scss';
.jzqdetails{
    height: 100%;
    .reset-btn{
      @include wh(100%,auto)
      text-align: right;
      i{
        display: inline-block;
        @include wh(0.58rem,0.58rem)
        @include bg('../../images/common/reset.png')
      }
    }
    .coverFlag{
      position: absolute;
      right: 0.1rem;
      width: 1.58rem;
      height: 0.8rem;
      z-index: 10;
    }
}
</style>
