<template>
  <div class="footer">
    <footer class="flex_between padding padding_tb">
        <div class="f-btn padding_tb" @click = "toParamsmsg">参数下发</div>
        <div class="f-btn padding_tb">参数召测</div>
        <div class="f-btn padding_tb">数据召测</div>
        <div class="f-btn padding_tb">控制对时</div>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods:{
    toParamsmsg(){
      this.$router.push('/paramsmsg')
    }
  }
}
</script>

<style scoped>
footer{
   position: fixed;
   bottom:0;
   width: 100%;
   padding-right: 0;
   color:#fff;
   background: #fff
}
.f-btn{
    background:linear-gradient(150deg,rgba(22,154,255,1),rgba(0,112,198,1));
    border-radius:0.1rem;
    flex: 1;
    margin-right:0.25rem;
}

</style>
