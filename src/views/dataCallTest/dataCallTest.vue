<template>
  <div class="datacalltest full">
    <head-top headTitle = "数据召测结果" goBack = "true"></head-top>
    <div class = "section scroll-box">
        <div class="con-list-sm padding">
            <light-cell v-for = "(item,index) in msgList" :key="index" :lfCon = "item.title" :rtCon = "item.con"></light-cell>
        </div>
        <div class="con-list-sm padding">
            <light-cell lfCon = "当前时间"></light-cell>
            <light-cell msgIcon = "true" lfCon = "设备时间" :mdCon = "zhaoceData.zxsj" :zcCon = "zczt"></light-cell>   
        </div>
        <div class="con-list-sm padding">
            <light-cell lfCon = "运行状态"></light-cell>
            <light-cell msgIcon = "true" lfCon = "节点">
                <div slot="zc-box" class="flex_between zc-box-md">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </div>
            </light-cell> 
            <light-cell msgIcon = "true" lfCon = "回路状态" :zcCon = "zczt">
                <div slot="zc-box" class="flex_between zc-box-md" v-if = "zhaoceData.ddzt != null">
                    <div>{{zhaoceData.ddzt.split('|')[0]}}</div>
                    <div>{{zhaoceData.ddzt.split('|')[1]}}</div>
                    <div>{{zhaoceData.ddzt.split('|')[2]}}</div>
                </div>
            </light-cell> 
            <light-cell msgIcon = "true" lfCon = "运行状态" :zcCon = "zczt">
                <div slot="zc-box" class="flex_between zc-box-md" v-if = "zhaoceData.ddzt != null">
                    <div>{{zhaoceData.ddzt.split('|')[0]}}</div>
                    <div>{{zhaoceData.ddzt.split('|')[1]}}</div>
                    <div>{{zhaoceData.ddzt.split('|')[2]}}</div>
                </div>
            </light-cell>   
            <light-cell msgIcon = "true" lfCon = "功率" :zcCon = "zczt">
                <div slot="zc-box" class="flex_between zc-box-md">
                    <div>{{zhaoceData.gl1}}</div>
                    <div>{{zhaoceData.gl2}}</div>
                    <div>{{zhaoceData.gl3}}</div>
                </div>
            </light-cell> 
            <light-cell msgIcon = "true" lfCon = "电流" :zcCon = "zczt">
                    <div slot="zc-box" class="flex_between zc-box-md">
                        <div>{{zhaoceData.dl1}}</div>
                        <div>{{zhaoceData.dl1}}</div>
                        <div>{{zhaoceData.dl1}}</div>
                    </div>
                </light-cell> 
            <light-cell msgIcon = "true" lfCon = "控制来源" :zcCon = "zczt">
                <div slot="zc-box" class="flex_between zc-box-md">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </light-cell>  
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
        data.ddkzqIds = ddkzqIdArr.join(',')
        api.callTest(data).then(function(result){
            console.log(1)
            xunce.setDataSend(result,'dd','xc',_this.zcCallBack)
        })
    },
    zcCallBack(bwid){  //展示巡测结果数据
        let _this = this
        let data = {}
        data.czlx = 2
        data.bwid = bwid
        data.czbz = 'jd'
        let i=0
        let forRequest =  setInterval(function(){
            i++
            if(i<10){
                api.showCallTestMsg(data).then(function(result){
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
        },500)
    }
  },
  created() {
      this.pole = this.$route.query.pole
      this.setPoleMsg(this.pole)
      this.ddkzqIdArr.push(this.pole.ddkzqId)
  },
  mounted() {
      console.log(this.zhaoceData)
    this.callTestFun(xunce.uuid(0,12),this.ddkzqIdArr)
  },
  beforeDestroy() {
      Bus.$emit('dataCallTest',this.pole)
      Bus.$off('dataCallTest')
  },
}
</script>

<style scoped lang = "scss">

</style>
