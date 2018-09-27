<template>
  <div class="minute">
    <span @click = "add">+</span>
    <span class="white">{{baseMinute}}</span>
    <span @click = "reduce">-</span>
    (分钟)    
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      baseMinute:15,    //分钟
    }
  },
  methods:{
      add(){
          this.baseMinute += 5
      },
      reduce(){
          if(this.baseMinute == 5){
               this.baseMinute = 5;
                Toast('不能再少了');
          } else{this.baseMinute -= 5}  
      }
  }
}
</script>

<style scoped lang="scss">
@import '@/style/mixin.scss';
.minute{
    display: inline-block;
    color:#999999;
    line-height: 0.75rem;
    span{
        @include sc(0.5rem,#fff)
        display: inline-block;
        @include wh(0.8rem,0.8rem);
        background:#169AFF;
        border:1px solid #169AFF;
        border-radius:2px;
        margin-right:0.23rem;
    }
    .white{
        background: #fff;
        color:#666666;
    }
}
</style>
