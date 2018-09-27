<template>
  <div class="deviceMsg">
    <head-top goBack = "true" headTitle = "设备信息">
        <div slot = "save" class="reset-btn" @click = "goReset"><i></i></div>
    </head-top>
    <div class="section ftmargin scroll-box">
      <div class="con-list-sm  padding">
        <light-cell v-for = "(item,index) in msgList" :key="index" :lfCon = "item.title" :rtCon = "item.con"></light-cell>
      </div>
      <ul class="con-list-sm padding">
        <div class="flex_between padding_t">单灯回路</div>
        <li class="flex_between border dgflag">
          <minute-flag></minute-flag>
          <div @click.stop = "openPole" class="coverFlag"></div><mt-switch v-model="dengFlag"></mt-switch>
        </li>
        <li class="flex_between border check" v-for = "(item,index) in portOptions">
          <div class="flex_between w55">
            <mt-checklist v-model="portSelect" :options="[item.lj]"></mt-checklist>
            <div>{{item.wl}}</div>
          </div>
          <div :class="[item.state == 1?'font-blue':'font-gray']">{{item.state == 1?'有效':'无效'}}</div>
        </li>
      </ul>
    </div>
    <footer-btn></footer-btn>
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
      msgList:[
        {"title":"灯杆名称","con":"智芯OUN"},
        {"title":"灯杆号","con":"21212345123213"},
        {"title":"网络节点","con":"展厅OUN测试交接箱"},
        {"title":"供电台区","con":"智芯供电台区OUN"},
        {"title":"通信通道","con":"光纤"},
        {"title":"通信地址","con":"09999999-999999"},
        {"title":"用电地址","con":"201801212-012313"},
        {"title":"所属集中器","con":""},
        {"title":"安装位置","con":""}
      ],//展示数据
      portSelect:[], //多选框选中值
      portOptions:[{lj:'逻辑节点:0',wl:'物理节点: 0',state:'1' },{lj:'逻辑节点:1',wl:'物理节点: 1',state:'1' },{lj:'逻辑节点:3 ',wl:'物理节点: 2',state:'0'}], // 多选的内容
      dengFlag:false, //开关灯按钮
    } 
  },
  components:{
    headTop,
    minuteFlag,
    footerBtn,
    lightCell
  },
  methods:{
    click(){
      console.log(this)
    },
    goReset(){
      this.$router.push('/devicemsgreset')
    },
    openPole(){
      this.dengFlag = !this.dengFlag
    }
  },
  created() {
    for(let i=0 ;i<this.portOptions.length;i++){ //判断复选框是否要选中状态
      if(this.portOptions[i].state == 1){
        this.portSelect.push(this.portOptions[i].lj)
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/style/mixin.scss';
.deviceMsg{
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
