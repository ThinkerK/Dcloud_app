<template>
  <div class="footer">
    <footer class="flex_between padding padding_tb">
        <slot name = "btn" class="f-btn padding_tb"></slot>
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

</style>
