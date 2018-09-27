<template>
  <div class="iptApen">
    <div></div>  
    <div class="flex_between">
        <input type="text" ref="input"
          :value="value" 
          @input="$emit('input', $event.target.value)">
        <i></i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {//更改信息组件
    }
  },
  props:[
      'value'
  ]
}
</script>

<style scoped lang = "scss">
.iptApen{
    display: inline-block;
}
input{
    text-align: right;
    color:#CCCCCC;
    font-size: 0.42rem
}
i{
    width: 0.58rem;
    height: 0.58rem;
    background:url(../../images/common/pen.png) no-repeat;
    background-size: 100%;
    margin-left: 0.3rem;
}
</style>
