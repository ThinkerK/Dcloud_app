<template>
  <div class="statesurver full">
    <head-top headTitle = "开关等结果" goBack = "true">
    </head-top>
    <div class = "section scroll-box">
        <div class="con-list-sm padding">
            <light-cell lfCon = "运行状态">
                <div slot="zc-box" class="flex_between zc-box-md font-gray">
                  <div>成功数:{{sCount}}</div>
                  <div>失败数:{{fCount}}</div>
                </div>
            </light-cell>
        </div>
        <div class="con-list-sm padding" v-for = "(item,index) in zhaoceData" v-if = "index<20" :key="index">
            <light-cell   :lfCon = "item.jzkzqmc" :rtCon = "zczt"></light-cell>
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
        sCount:0,   //成功数
        fCount:0 ,  //失败数
        zczt:'正在召测', //
        zhaoceData:[], 
    }
  },
  components:{
      headTop,
      lightCell,
      iptApen,
  },
  methods:{
    lightSwitch(rwid,ddkzqIdArr,kzlx){    //开关灯
      let _this = this
      let data = {}
      data.rwid = rwid
      data.jzkzqIds = ddkzqIdArr.join(',')
      data.kzlx = kzlx
      api.jzqCallTest(data).then(function(result){
        xunce.setDataSend(result,'jzq',kzlx == 1?'kd':'gd',_this.lightCB)
      })
    },  
    lightCB(bwid,kzlx){  //开关灯回调
      let _this = this
      let data = {}
      data.czlx = 2
      data.bwid = bwid
      data.kzlx = 
      console.log(data)
      let i = 0
      let forRequest =  setInterval(function(){
            i++
            if(i<5){
                api.jzqShowLightSwitch(data).then(function(result){
                    if(result.length != 0){
                    _this.zhaoceData = result.data
                    _this.sCount = _this.zhaoceData.length
                    }
                    if(result.data.length == _this.ddkzqIdArr.length){
                        _this.sCount = result.data.length
                        _this.zhaoceData = result.data
                        clearTimeout(forRequest)
                        _this.zczt = '召测完成'
                    }
                })
            }else{
                clearInterval(forRequest)
                _this.zczt = '召测完成'
                _this.fCount = _this.fCount = _this.ddkzqIdArr.length-_this.zhaoceData.length
            }
        },500)
    },
  },
  created() {
    this.poleArr = this.$route.query.poleArr
    for(var i=0;i<this.poleArr.length;i++){
        this.ddkzqIdArr.push(this.poleArr[i].jzkzqId)
    }
    this.lightSwitch(xunce.uuid(0,12),this.ddkzqIdArr,this.$route.query.kzlx)
    this.zczt = this.$route.query.kzlx == 1?"正在开灯":'正在关灯'
  },

  beforeDestroy() {
      
  },
}
</script>

<style scoped lang = "scss">

</style>
