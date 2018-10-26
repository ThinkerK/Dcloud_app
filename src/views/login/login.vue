<template>
  <div class="login full">
    <div class="icon-box">
      <div class="icon"></div>
    </div>
    <div class="formbox">
      <form id="form">
        <input type="text" placeholder=" 请输入账号" v-model = "formData.name" autocomplete='name'>
        <input type="password" placeholder=" 请输入密码" v-model = "formData.password" autocomplete='pwd'>
        <div class = 'check-box'>
            <!-- <mt-checklist v-model="portSelect" :options="['自动登陆']"></mt-checklist> -->
        </div>
        <button class="submit" @click = 'handleLogin'>登 陆</button>
      </form>
    </div>
  </div>
</template>
<script>
import { Checklist,MessageBox,Toast,Indicator } from 'mint-ui'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      portSelect:'自动登陆',
      formData:{
        name:'',
        password:''
      }
    }
  },
  methods:{
    ...mapActions(['login']),
    handleLogin(e){
      e.preventDefault()   //阻表单默认提交
      let _this = this
      if(this.formData.name != '' && this.formData.pwd != ''){
        this.login(this.formData).then(function(res){
          if(res) {
            _this.$router.push({
              path: '/main'
            })
          }else{
            Toast('账号或密码有误！')
          }
        })
      }else{
        Toast('账号或密码不能为空！')
      }
    }
  },
  mounted() {
    // if(window.localStorage){
    //   console.log(window.localStorage)
    // }
  },
}
</script>

<style scoped lang = "scss">
.login{
    overflow: hidden;
    background:white;
    .icon-box{
      width: 100%;
      height:8rem;
      position: relative;
      .icon{
        width: 3rem;
        height: 3rem;
        background: url('../../images/common/starticon.png') no-repeat;
        background-size:100%; 
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .formbox{
      font-size:0.48rem;
      width: 100%;
      padding: 0 1.4rem;
      input{
        border:1px solid #169AFF;
        width:100%;
        height:1.4rem;
        text-align:left;
        font-size:0.55rem;
        margin-bottom:-1px;
        padding-left:0.2rem
      }
      input::-webkit-input-placeholder {
        color: gray;
        font-size: 0.48rem;
        text-align: left
      }
    }
}
.submit{
  margin-top: 2.5rem;
  background: #169AFF;
  width: 100%;
  color: white;
  padding: 0.3rem;
  font-size:0.55rem 
}
</style>
