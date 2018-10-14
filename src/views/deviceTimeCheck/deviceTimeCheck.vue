<template>
  <div class="statesurver full">
    <head-top headTitle = "对时结果" goBack = "true">
        <div slot="save" @click = "againTime">对时</div>
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
            <light-cell   :lfCon = "item.dgmc" :rtCon = "item.zxjg" :mdCon = 'item.bzsj'></light-cell>
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
        pole:'',// 灯杆信息
        ddkzqIdArr:[],//单灯控制器地址
        sCount:0,   //成功数
        fCount:0 ,  //失败数
        zhaoceData:[] ,
        zczt:'正在对时'
    }
  },
  components:{
      headTop,
      lightCell,
      iptApen,
  },
  methods:{
    checkTime(rwid,ddkzqIdArr){  //对时请求
      let _this = this
      let data = {}
      data.rwid = rwid
      data.ddkzqIds = ddkzqIdArr.join(',')
      api.checkTime(data).then(function(result){
        xunce.setDataSend(result,'dd','ds',_this.checkTimeCB)
      })
    },
    checkTimeCB(bwid){  //对时回调
      let _this = this 
      let data = {}
      data.czlx = 2
      data.bwid = bwid
      let i = 0
      let forRequest =  setInterval(function(){
          i++
          if(i<10){
              api.showCheckTime(data).then(function(result){
                if(result.length != 0){
                    _this.zhaoceData = result.data
                    _this.sCount = _this.zhaoceData.length
                }
                if(result.data.length == _this.ddkzqIdArr.length){
                    _this.sCount = result.data.length
                    _this.zhaoceData = result.data
                    clearTimeout(forRequest)
                }
              })
          }else{              
            clearInterval(forRequest)
            _this.zczt = "对时失败"
            _this.fCount = _this.ddkzqIdArr.length-_this.zhaoceData.length
          }
      },500)
    },
    againTime(){
        this.sCount = 0
        this.fCount = 0
        this.zczt = '正在对时'
        this.checkTime(xunce.uuid(0,12),this.ddkzqIdArr)
    },
  },
  created() {
      this.poleArr = this.$route.query.poleArr
      for(var i=0;i<this.poleArr.length;i++){
        this.ddkzqIdArr.push(this.poleArr[i].ddkzqId)
        }
      this.checkTime(xunce.uuid(0,12),this.ddkzqIdArr)
  },
  beforeDestroy() {
      
  },
}
</script>

<style scoped lang = "scss">

</style>
