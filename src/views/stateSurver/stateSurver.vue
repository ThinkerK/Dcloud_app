<template>
  <div class="statesurver full">
    <head-top headTitle = "状态巡测结果" goBack = "true"></head-top>
    <div class = "section scroll-box">
        <div class="con-list-sm padding">
            <light-cell lfCon = "运行状态" :rtCon = "zczt">
                <div slot="zc-box" class="flex_between zc-box-md font-gray" >
                    <div>成功数:{{sCount}}</div>
                    <div>失败数:{{fCount}}</div>
                </div>
            </light-cell>
        </div>
        <div class="con-list-sm padding"  v-for = "(item,index) in zhaoceData" :key="index" >
            <light-cell  :lfCon = "item.dgmc"></light-cell>
            <light-cell msgIcon = "true" lfCon = "节点">
                <div slot="zc-box" class="flex_between zc-box-md">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </div>
            </light-cell> 
            <light-cell msgIcon = "true" lfCon = "回路状态" :zcCon = "item.txjg">
                <div slot="zc-box" class="flex_between zc-box-md">
                    <div>{{item.ddzt.split('|')[0]}}</div>
                    <div>{{item.ddzt.split('|')[1]}}</div>
                    <div>{{item.ddzt.split('|')[2]}}</div>
                </div>
            </light-cell> 
            <light-cell msgIcon = "true" lfCon = "运行状态" :zcCon = "item.txjg">
                <div slot="zc-box" class="flex_between zc-box-md">
                    <div>{{item.ddzt.split('|')[0]}}</div>
                    <div>{{item.ddzt.split('|')[1]}}</div>
                    <div>{{item.ddzt.split('|')[2]}}</div>
                </div>
            </light-cell>   
            <light-cell msgIcon = "true" lfCon = "功率" :zcCon = "item.txjg">
                <div slot="zc-box" class="flex_between zc-box-md">
                    <div>{{item.gl1}}</div>
                    <div>{{item.gl1}}</div>
                    <div>{{item.gl1}}</div>
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
        poleArr:'',//
        pole:'',// 灯杆信息
        ddkzqIdArr:[],//单灯控制器地址
        zhaoceData:[],  //
        zczt:'正在召测' , //召测状态
        sCount:0,   //成功数
        fCount:0 ,  //失败数
    }
  },
  components:{
    headTop,
    lightCell,
    iptApen,
  },
  methods:{
    callTestFun(rwid,ddkzqIdArr){  //巡测
        let _this = this
        let data = {}
        data.rwid = rwid
        data.ddkzqIds = ddkzqIdArr.join(',')
        api.callTest(data).then(function(result){
            xunce.setDataSend(result,'dd','xc',_this.zcCallBack)
        })
    },
    filter(val){
        let con = this.zhaoceData.filter((items)=>{return items.ddkzqId == item.ddkzqId})[0]
        return con
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
                        _this.zhaoceData = result
                        _this.sCount = _this.zhaoceData.length
                    }
                    if(result.length == _this.ddkzqIdArr.length){
                        _this.zczt = '召测完成'
                        clearInterval(forRequest)
                        _this.zhaoceData = result
                        _this.sCount = _this.zhaoceData.length
                    }
                })
            }else{
                clearInterval(forRequest)
                _this.zczt = '召测完成'
                _this.fCount = _this.ddkzqIdArr.length - _this.zhaoceData.length
            }
        },1000)
    },
  },
  created() {
    this.poleArr = this.$route.query.poleArr
    for(var i=0;i<this.poleArr.length;i++){
        this.ddkzqIdArr.push(this.poleArr[i].ddkzqId)
    }
  },
  beforeDestroy() {
      
  },
  mounted() {
    this.callTestFun(xunce.uuid(0,12),this.ddkzqIdArr)
  },
}
</script>

<style scoped lang = "scss">

</style>
