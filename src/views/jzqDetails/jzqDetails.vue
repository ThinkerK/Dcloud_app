<template>
<div class="deviceMsg">
  <loading v-if = "loadingShow"></loading>
  <head-top goBack = "true" headTitle = "集中器信息">
      <div slot = "save" class="reset-btn" @click = "ToLink('jzqmsgreset')"><i></i></div>
  </head-top>
  <div class="section scroll-box">
    <div class="con-list-sm  padding">
      <light-cell v-for = "(item,index) in msgList" :key="index" :lfCon = "item.title" :rtCon = "item.con"></light-cell>
    </div>
    <ul class="con-list-sm padding">
      <div class="flex_between padding_t">控制回路信息</div>
      <li class="flex_between border dgflag">
        <minute-flag></minute-flag>
        <!-- <div @click.stop = "openPole" class="coverFlag"></div><mt-switch v-model="dengFlag"></mt-switch> -->
        <div class="poleFlag">
          <span @click = "lightOn">开</span>
          <span @click = "lightOff">关</span>
        </div>
      </li>
      <li class="flex_between border check" v-for = "(item,index) in portOptions">
        <div class="flex_between w55">
          <mt-checklist v-model="portSelect" :options="[item.lj]"></mt-checklist>
          <div>{{item.wl}}</div>
        </div>
        <div :class="[item.state == 1?'font-blue':'font-gray']">{{item.state == 1?'有效':'无效'}}</div>
      </li>
    </ul>
    <ul class="con-list-sm padding">
      <div class="flex_between padding_t">遥信信息</div>
      <li class="flex_between border check" v-for = "(item,index) in yaoxinMsg">
        <div class="flex_between w55">
          <mt-checklist v-model="portSelect" :options="[item.lj]"></mt-checklist>
          <div>{{item.wl}}</div>
        </div>
        <div :class="[item.state == 1?'font-blue':'font-gray']">{{item.state == 1?'启用':'不启用'}}</div>
      </li>
    </ul>
    <div style = "height: 2.5rem"></div>
  </div>
  <footer-btn>
    <div slot = 'btn' class="f-btn padding_tb">参数下发</div>
    <div slot = 'btn' class="f-btn padding_tb">参数召测</div>
    <div slot = 'btn' class="f-btn padding_tb" @click = "ToLink('jzqdatacalltest')">数据召测</div>
    <div slot = 'btn' class="f-btn padding_tb" @click = "timeReset">控制对时</div>
  </footer-btn>
</div>
</template>

<script>
import { Checklist,Switch } from 'mint-ui'
import headTop from '@/components/header/mainHeader'
import minuteFlag from '@/components/common/minute'
import footerBtn from '@/components/footer/footer'
import lightCell from '@/components/common/lightCell'
import Bus from '@/config/bus.js'
import { Popup,MessageBox,Toast,Indicator } from 'mint-ui'
import api from '../../service/data.js'
import xunce from '../../service/xunce.js'
import loading from '@/components/loading/loading'

export default {
data () {
  return {
    pole:'', //集中器数据
    msgList:[
      {"title":"集中器名称","con":"智芯OUN"},
      {"title":"资产编号","con":"21212345123213"},
      {"title":"安装位置","con":"展厅OUN测试交接箱"},
      {"title":"供电台区","con":"智芯供电台区OUN"},
      {"title":"管理单位","con":"光纤"},
      {"title":"规约类型","con":"09999999-999999"},
    ],//展示数据
    portSelect:[], //多选框选中值
    portOptions:[{lj:'节点:0',wl:'序号: 0',state:'1' },{lj:'节点:1',wl:'序号: 1',state:'1' },{lj:'节点:3 ',wl:'序号: 2',state:'0'}], // 多选的内容
    yaoxinMsg:[{lj:'节点:0',wl:'序号: 0',state:'1' }],
    dengFlag:false, //开关灯按钮
    ddkzqIdArr:[], //巡测数组,
    loadingShow:false
  } 
},
components:{
  headTop,
  minuteFlag,
  footerBtn,
  lightCell,
  loading
},
methods:{
  ToLink(url){   //页面跳转
    this.$router.push({
      path:'/'+url,
      name:url,
      query:{
        pole:this.pole
      }
    })
  },
  lightSwitch(rwid,ddkzqIdArr,kzlx){    //开关灯
    this.loadingShow = true
    let _this = this
    let data = {}
    data.rwid = rwid
    data.jzkzqIds = ddkzqIdArr.join(',')
    data.kzlx = kzlx
    api.jzqCallTest(data).then(function(result){
      xunce.jzqDataSend(result,'jzq',kzlx == 1?'kd':'gd',_this.lightCB)
    })
  },
  checkTime(rwid,ddkzqIdArr){  //对时请求
    this.loadingShow = true
    let _this = this
    let data = {}
    data.jzkzqIds = ddkzqIdArr.join(',')
    api.jzqCallTest(data).then(function(result){
      xunce.jzqDataSend(result,'jzq','ds',_this.checkTimeCB)
    })
  },
  checkTimeCB(jzqArr){
    let _this = this 
    let data = {}
    data.czlx = 2
    data.bwid = jzqArr[0].bwid
    let i = 0
    this.forRequest =  setInterval(function(){
        console.log(i)
        i++
        if(i<10){
            api.jzqShowCheckTime(data).then(function(result){
                if(result.data.length == _this.ddkzqIdArr.length){
                    _this.loadingShow = false
                    clearTimeout(_this.forRequest)
                    Toast('当前设备时间'+result.data[0].bzsj)
                }
            })
        }else{     
          _this.loadingShow = false         
          clearInterval(_this.forRequest)
          Toast('对时失败')
        }
    },1000)
  },
  lightCB(jzqArr,kzlx){  //开关灯回调
    let _this = this 
    let data = {}
    data.czlx = 2
    data.bwid = jzqArr[0].bwid
    data.kzlx = kzlx
    let i = 0
    this.forLight =  setInterval(function(){
        i++
        if(i<10){
            api.jzqShowLightSwitch(data).then(function(result){
                if(result.data.length == _this.ddkzqIdArr.length){
                    _this.loadingShow =false
                    clearTimeout(_this.forLight)
                    Toast(result.data.zxjg)
                }
            })
        }else{
          _this.loadingShow = false
            clearInterval(_this.forLight)
            let msg = kzlx == '1'?'开灯失败':'关灯失败'
            Toast(msg)
        }
    },500)
  },
  lightOn(){    //开灯
    MessageBox.confirm('',{
        message: '是否执行开灯操作？',
        showCancelButton: true
    })
    .then(action => { 
        if (action == 'confirm') {
          this.lightSwitch(xunce.uuid(0,12),this.ddkzqIdArr,'1')
        }
    })
  },
  lightOff(){   //关灯
    MessageBox.confirm('',{
        message: '是否执行关灯操作？',
        showCancelButton: true
    })
    .then(action => { 
        if (action == 'confirm') {
          this.lightSwitch(xunce.uuid(0,12),this.ddkzqIdArr,'0')
        }
    })
    
  },
  openPole(){  //开关灯按钮
    this.dengFlag = !this.dengFlag
  },
  timeReset(){  //设备对时 
    this.checkTime(xunce.uuid(0,12),this.ddkzqIdArr)
  },
  setPoleMsg(pole){  //获取灯杆信息
    this.msgList[0].con = pole.jzkzqmc
    this.msgList[1].con = pole.zcbh
    this.msgList[2].con = pole.azwz
    this.msgList[3].con = pole.ldbmc
    this.msgList[4].con = pole.gldw
    this.msgList[5].con = pole.gylx
  },
  
},
created() {  
  for(let i=0 ;i<this.portOptions.length;i++){ //判断复选框是否要选中状态
    if(this.portOptions[i].state == 1){
      this.portSelect.push(this.portOptions[i].lj)
    }
  }
  this.pole = this.$route.query.pole
  this.setPoleMsg(this.pole)
  let _this = this
  Bus.$on('jzqreset',function(val){  //监听从编辑页传回的信息
    _this.pole = val
    _this.setPoleMsg(_this.pole)
  });
  Bus.$on('jzqparamMsg',function(val){  //监听从参数下发页传回的信息
    _this.pole = val
    _this.setPoleMsg(_this.pole)
  })
  Bus.$on('jzqparamCallTest',function(val){  //监听从参数召测页传回的信息
    _this.pole = val
    _this.setPoleMsg(_this.pole)
  })
  Bus.$on('jzqdataCallTest',function(val){  //监听从数据召测页传回的信息
    _this.pole = val
    _this.setPoleMsg(_this.pole)
  })
  
},
mounted() {
  this.ddkzqIdArr.push(this.pole.jzkzqId)
},
beforeDestroy() {
  clearInterval(this.forRequest)
  clearInterval(this.forLight)
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
  .poleFlag{
    span{
      @include sc(0.5rem,#169AFF)
      display: inline-block;
      @include wh(0.8rem,0.8rem);
      border:1px solid #169AFF;
      border-radius:2px;
      margin-left:0.23rem;
    }
  }
}
</style>
