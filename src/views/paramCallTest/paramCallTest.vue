<template>
  <div class="paramcalltest full">
    <head-top headTitle = "参数召测" goBack = "true"></head-top>
    <div class = "section scroll-box">
        <div class="con-list-sm padding">
            <light-cell v-for = "(item,index) in msgList" :key="index" :lfCon = "item.title" :rtCon = "item.con"></light-cell>
        </div>
        <div class="con-list-sm padding">
            <light-cell lfCon = "节点参数"></light-cell>
            <light-cell v-for = "(item,index) in portOptions" msgIcon = "true" :key="index" :lfCon = "item.lj" :mdCon="item.wl" :blue = "item.state == 1?true:false" :rtCon = "item.state == 1?'有效':'无效'" zcCon = "失败"></light-cell>   
        </div>
        <div class="con-list-sm padding">
            <light-cell lfCon = "分组参数" zcCon = "失败"></light-cell>
            <light-cell lfCon = "智慧灯杆" mdCon="组号:2" msgIcon="true"></light-cell>
        </div>
        <div class="con-list-sm padding">
            <light-cell lfCon = "经纬度参数" zcCon = "失败"></light-cell>
            <light-cell lfCon = "经度" msgIcon="true"></light-cell>
            <light-cell lfCon = "纬度" msgIcon="true"></light-cell>
        </div>
        <div class="con-list-sm padding">
            <light-cell lfCon = "开灯偏移量" msgIcon="true"></light-cell>
            <light-cell lfCon = "关灯偏移量" msgIcon="true"></light-cell>
        </div>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/header/mainHeader.vue'
import lightCell from '@/components/common/lightCell'
import iptApen from '@/components/common/iptApen'
import Bus from "@/config/bus.js";

export default {
  data () {
    return {
        msgList:[
            {"title":"灯杆名称","con":"智芯OUN"},
            {"title":"灯杆号","con":"21212345123213"},
        ],//展示数据
        portOptions:[{lj:'逻辑节点:0',wl:'物理节点: 0',state:'1' },{lj:'逻辑节点:1',wl:'物理节点: 1',state:'1' },{lj:'逻辑节点:3 ',wl:'物理节点: 2',state:'false'}],//逻辑节点
        lng:154984238,   //经度
        lat:586486481,  //纬度
        onValue:'滞后',   //开灯偏移量radio
        onOffset:22,    //开灯偏移量range
        offValue:'提前',   //关灯偏移量radio
        offOffset:20,    //关灯偏移量range
        pole:''// 灯杆信息
    }
  },
  components:{
      headTop,
      lightCell,
      iptApen,
  },
  methods:{
    setPoleMsg(pole){  //获取灯杆信息
        this.msgList[0].con = pole.dgmc
        this.msgList[1].con = pole.dgh
    },
  },
  created() {
      this.pole = this.$route.query.pole
      this.setPoleMsg(this.pole)
  },
  beforeDestroy() {
      Bus.$emit('paramCallTest',this.pole)
      Bus.$off('paramCallTest')
  },
}
</script>

<style scoped lang = "scss">

</style>
