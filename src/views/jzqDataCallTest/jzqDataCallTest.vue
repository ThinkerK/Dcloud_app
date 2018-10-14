<template>
  <div class="datacalltest full">
    <head-top headTitle = "数据召测结果" goBack = "true"></head-top>
    <div class = "section scroll-box">
        <div class="con-list-sm padding">
            <light-cell lfCon = "集中器名称" :rtCon = "pole.jzkzqmc"></light-cell>
            <light-cell lfCon = "集中器资产编号" :rtCon = "pole.zcbh"></light-cell>
        </div>
        <div class="con-list-sm padding">
            <light-cell lfCon = "运行状态"></light-cell>
            <light-cell msgIcon = "true" lfCon = "集中器时间" :mdCon = "zhaoceData.zxsj" :zcCon = "zczt"></light-cell>   
        </div>
        <div class="con-list-sm padding">
            <light-cell lfCon = "控制回路状态"></light-cell>
            <light-cell msgIcon = "true" lfCon = "节点1" mdCon = '序号1' :zcCon = "zczt"></light-cell>
            <light-cell msgIcon = "true" lfCon = "节点1" mdCon = '序号1' :zcCon = "zczt"></light-cell> 
        </div>
        <div class="con-list-sm padding">
                <light-cell lfCon = "遥信信息"></light-cell>
                <light-cell msgIcon = "true" lfCon = "节点1" mdCon = '序号1' :zcCon = "zczt"></light-cell>
            </div>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/header/mainHeader.vue'
import lightCell from '@/components/common/lightCell'
import iptApen from '@/components/common/iptApen'
import Bus from "@/config/bus.js";
import api from '../../service/data.js'
import xunce from '../../service/xunce.js'


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
        pole:'',// 灯杆信息
        ddkzqIdArr:[]  , // 单灯控制器数组
        zhaoceData:[]  ,
        dataFlag:false ,
        zczt:'正在召测'
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
    callTestFun(rwid,ddkzqIdArr){  //巡测
        let _this = this
        let data = {}
        data.rwid = rwid
        data.jzkzqIds = ddkzqIdArr.join(',')
        api.jzqCallTest(data).then(function(result){
            xunce.setDataSend(result,'jzq','xc',_this.zcCallBack)
        })
    },
    zcCallBack(bwid){  //展示巡测结果数据
        let _this = this
        let data = {}
        data.czlx = 2
        data.bwid = bwid
        let i=0
        let forRequest =  setInterval(function(){
            i++
            if(i<10){
                api.jzqShowCallTestMsg(data).then(function(result){
                    if(result.length != 0){
                        _this.zhaoceData = result[0]
                    }
                    if(result.length == _this.ddkzqIdArr.length){
                        _this.zhaoceData = result[0]
                        _this.zczt = '成功'
                        clearTimeout(forRequest)
                    }
                })
            }else{
                clearInterval(forRequest)
                _this.zczt = "失败"
            }
        },1000)
    }
  },
  created() {
      this.pole = this.$route.query.pole
      this.setPoleMsg(this.pole)
      this.ddkzqIdArr.push(this.pole.jzkzqId)
  },
  mounted() {
      console.log(this.zhaoceData)
    this.callTestFun(xunce.uuid(0,12),this.ddkzqIdArr)
  },
  beforeDestroy() {
      Bus.$emit('jzqdataCallTest',this.pole)
      Bus.$off('jzqdataCallTest')
  },
}
</script>

<style scoped lang = "scss">

</style>
