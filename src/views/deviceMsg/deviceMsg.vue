<template>
  <div class="deviceMsg">
    <head-top goBack = "true" headTitle = "设备信息">
        <div slot = "save" class="reset-btn" @click = "ToLink('devicemsgreset')"><i></i></div>
    </head-top>
    <div class="section ftmargin scroll-box">
      <div class="con-list-sm  padding">
        <light-cell v-for = "(item,index) in msgList" :key="index" :lfCon = "item.title" :rtCon = "item.con"></light-cell>
      </div>
      <ul class="con-list-sm padding">
        <div class="flex_between padding_t">单灯回路</div>
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
    </div>
    <footer-btn>
      <div slot = 'btn' class="f-btn padding_tb" @click = "ToLink('paramsmsg')">参数下发</div>
      <div slot = 'btn' class="f-btn padding_tb" @click = "ToLink('paramcalltest')">参数召测</div>
      <div slot = 'btn' class="f-btn padding_tb" @click = "ToLink('datacalltest')">数据召测</div>
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

export default {
  data () {
    return {
      pole:'', //单灯数据
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
      ddkzqIdArr:[], //巡测数组
    } 
  },
  components:{
    headTop,
    minuteFlag,
    footerBtn,
    lightCell
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
      let _this = this
      let data = {}
      data.rwid = rwid
      data.ddkzqIds = ddkzqIdArr.join(',')
      data.kzlx = kzlx
      api.lightSwitch(data).then(function(result){
        xunce.setDataSend(result,'dd',kzlx == 1?'kd':'gd',_this.lightCB)
      })
    },
    checkTime(rwid,ddkzqIdArr){  //对时请求
      let _this = this
      let data = {}
      data.rwid = rwid
      data.ddkzqIds = ddkzqIdArr.join(',')
      api.checkTime(data).then(function(result){
        xunce.setDataSend(result,'dd','ds',_this.checkTimeCB)
      })
    },
    checkTimeCB(bwid){
      let _this = this 
      let data = {}
      data.czlx = 2
      data.bwid = bwid
      let i = 0
      let forRequest =  setInterval(function(){
          console.log(i)
          i++
          if(i<10){
              api.showCheckTime(data).then(function(result){
                  if(result.data.length == _this.ddkzqIdArr.length){
                      clearTimeout(forRequest)
                      Toast('当前设备时间'+result.data[0].bzsj)
                  }
              })
          }else{              
            clearInterval(forRequest)
            Toast('对视失败')
          }
      },500)
    },
    lightCB(bwid,kzlx){  //开关灯回调
      let _this = this 
      let data = {}
      data.czlx = 2
      data.bwid = bwid
      data.kzlx = kzlx
      console.log(kzlx)
      let i = 0
      let forLight =  setInterval(function(){
          i++
          if(i<10){
              api.showLightSwitch(data).then(function(result){
                  if(result.data.length == _this.ddkzqIdArr.length){
                      clearTimeout(forLight)
                      Toast(result.data.zxjg)
                  }
              })
          }else{
              clearInterval(forLight)
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
      // var now = new Date();
      // var year = now.getFullYear();       //年
      // var month = now.getMonth() + 1;     //月
      // var day = now.getDate();            //日
      // var hh = now.getHours();            //时
      // var mm = now.getMinutes();          //分
      // var ss = now.getSeconds();           //秒
      // var clock = year + "-";
      // if(month < 10)
      //     clock += "0";
      // clock += month + "-";
      // if(day < 10)
      //     clock += "0";
      // clock += day + " ";
      // if(hh < 10)
      //     clock += "0";
      // clock += hh + ":";
      // if (mm < 10) clock += '0'; 
      // clock += mm + ":"; 
      // if (ss < 10) clock += '0'; 
      // clock += ss;  
      // Toast('当前时间:'+clock)
    },
    setPoleMsg(pole){  //获取灯杆信息
      this.msgList[0].con = pole.dgmc
      this.msgList[1].con = pole.dgh
      this.msgList[2].con = pole.jjxmc
      this.msgList[3].con = pole.ldbmc
      this.msgList[4].con = pole.txfs
      this.msgList[5].con = pole.zcbhDgglq
      this.msgList[6].con = pole.zcbh
      this.msgList[7].con = pole.jzkzqmc
      this.msgList[8].con = pole.azwz
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
    Bus.$on('reset',function(val){  //监听从编辑页传回的信息
      _this.pole = val
      _this.setPoleMsg(_this.pole)
    });
    Bus.$on('paramMsg',function(val){  //监听从参数下发页传回的信息
      _this.pole = val
      _this.setPoleMsg(_this.pole)
    })
    Bus.$on('paramCallTest',function(val){  //监听从参数召测页传回的信息
      _this.pole = val
      _this.setPoleMsg(_this.pole)
    })
    Bus.$on('dataCallTest',function(val){  //监听从数据召测页传回的信息
      _this.pole = val
      _this.setPoleMsg(_this.pole)
    })
    
  },
  mounted() {
    this.ddkzqIdArr.push(this.pole.ddkzqId)
  },
  // beforeRouteLeave (to, from, next) {
  //   if(to.name != 'singlelightmsg'){
  //       from.meta.isBack = true
  //       next()
  //   }else{
  //       from.meta.isBack = false;
  //       next()
  //   }
  // },
  // activated() { //keepalive 钩子
  //     if(!this.$route.meta.isBack){
  //       this.setPoleMsg()
  //     }else{
  //       Bus.$on('reset',function(val){
  //         console.log(val);
  //       });
  //     }
  // },
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
