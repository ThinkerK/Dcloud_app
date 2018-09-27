<template>
  <label class="switch">
    <input type="checkbox" class="switch-input" id="ipt" 
    :checked = value
    @input = "$emit('input', $event.target.checked)"
    >
    <span class="switch-core"></span>
  </label>
</template>

<script>
export default {
  data () {
    return {
      flag:true
    }
  },
  props:['value'],
  methods:{
    
  },
  watch:{

  }
}
</script>

<style scoped lang = "scss">
@import '@/style/mixin.scss';
.switch-input{
  display: none
}
.switch-core{
  @include wh(1.8rem,0.7rem)
  position: relative;
  display:inline-block;
  background:#F1F1F1;
  border-radius:0.08rem;
}
.switch-core::after{
  content: '无效';
  color:white;
  font-size: 0.38rem;
  line-height: 0.7rem;
  @include wh(0.98rem,0.7rem)
  background: #B1B1B1;
  position: absolute;
  top:0;
  left:0;
  border-radius:0.08rem;
  transition: transform .3s
}

.switch-input:checked + .switch-core::after{
  content: '有效';
  transform: translateX(0.79rem);
  background: #169AFF;
}
</style>
