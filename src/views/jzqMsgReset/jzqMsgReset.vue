<template>
  <div class="deviceMsgReset">
    <head-top headTitle = "设备信息" goBack = 'true'>
        <div slot="save" class="fullLeft" @click = "keep">保存</div>
    </head-top>
    <div class="section">
      <div class="con-list-sm padding">
        <light-cell lfCon = "集中器名称" :rtCon = "pole.jzkzqmc"></light-cell>
        <light-cell lfCon = "通讯地址">
          <ipt-apen v-model = "communica" slot="other"></ipt-apen>
        </light-cell>
        <light-cell lfCon = "安装位置" :rtCon = "pole.azwz"></light-cell>
        <light-cell lfCon = "供电台区" :rtCon = "pole.ldbmc"></light-cell>
        <light-cell lfCon = "管理单位" :rtCon = "pole.gldw"></light-cell>
        <light-cell lfCon = "规约类型" :rtCon = "pole.gylx"></light-cell>
      </div>
      <div class="con-list-sm padding">
        <light-cell lfCon = "控制回路信息"></light-cell> 
        <light-cell v-for = "(item,index) in portOptions" :key="index" :lfCon = "item.lj" :mdCon="item.wl" msgIcon='true'>
          <pole-switch slot="other" v-model = "portFlag_0" v-show = "index == 0"></pole-switch>
          <pole-switch slot="other" v-model = "portFlag_1"  v-show = "index == 1"></pole-switch>
          <pole-switch slot="other" v-model = "portFlag_2" v-show = "index == 2"></pole-switch>
        </light-cell>
      </div>
      <div class="con-list-sm padding">
            <light-cell lfCon = "遥信节点信息"></light-cell> 
            <light-cell v-for = "(item,index) in yaoxinMsg" :key="index" :lfCon = "item.lj" :mdCon="item.wl" msgIcon='true'>
              <pole-switch slot="other"  v-show = "index == 0"></pole-switch>
            </light-cell>
          </div>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/header/mainHeader'
import iptApen from '@/components/common/iptApen'
import lightCell from '@/components/common/lightCell'
import poleSwitch from '@/components/common/poleSwitch'
import Bus from '@/config/bus.js'

export default {
  data () {
    return {
      msgList:[
        {"title":"灯杆名称","con":"智芯OUN"},
        {"title":"灯杆号","con":"21212345123213"},
      ],//展示数据
      communica:'23154126546', //通讯地址
      electric:'1548486765121', //用电
      portOptions:[{lj:'节点:0',wl:'序号: 0',state:'1' },{lj:'节点:1',wl:'序号: 1',state:'1' },{lj:'节点:3 ',wl:'序号: 2',state:'0'}],//逻辑节点
      yaoxinMsg:[{lj:'节点:0',wl:'序号: 0',state:'1' }],
      portFlag_0:true, //逻辑节点开关1
      portFlag_1:true, //逻辑节点开关2
      portFlag_2:false, //逻辑节点开关3
      pole:'', //单灯信息
      resetFlag:false  //保存开关
    }
  },
  components:{
      headTop,
      iptApen,
      lightCell,
      poleSwitch
  },
  methods:{
    setPoleMsg(){ //灯杆信息
      this.pole = this.$route.query.pole
      this.msgList[0].con = this.pole.dgmc
      this.msgList[1].con = this.pole.dgh
      this.communica = this.pole.zcbhDgglq
      this.electric = this.pole.zcbh
    },
    keep(){  //保存更改
      this.pole.zcbhDgglq = this.communica
      this.pole.zcbh = this.electric
      this.$router.go(-1)
    }
  },
  watch:{
    portFlag0(){
      console.log(this.portFlag0)
    },
    portOptions(){
      console.log(this.portOptions)
    }
  },
  created() {
    this.setPoleMsg()
  },
  beforeDestroy() {
    Bus.$emit('jzqreset',this.pole);
    Bus.$off('jzqreset')
    // if(this.resetFlag){
    //   let keepMsg = {}
    //   keepMsg.communica = this.communica
    //   Bus.$emit('reset',this.pole);
    //   this.resetFlag = !this.resetFlag
    // }
  },

}
</script>

<style scoped lang = "scss">
@import '@/style/mixin.scss';
.deviceMsgReset{
    height: 100%;
}
</style>
