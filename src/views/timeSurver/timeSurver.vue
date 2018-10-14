<template>
  <div class="statesurver full">
    <head-top headTitle = "状态巡测结果" goBack = "true"></head-top>
    <div class = "section scroll-box">
        <div class="con-list-sm padding">
            <light-cell lfCon = "运行状态">
                <div slot="zc-box" class="flex_between zc-box-md font-gray">
                    <div>成功数:12</div>
                    <div>失败数:12</div>
                </div>
            </light-cell>
        </div>
        <div class="con-list-sm padding" v-for = "(item,index) in poleArr" v-if = "index<20" :key="index">
            <light-cell   :lfCon = "item.dgmc"></light-cell>
            <light-cell  msgIcon = "true" lfCon = " 2018-10-09 19:08:37" rtCon = "正在召测"></light-cell>
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
        pole:''// 灯杆信息
    }
  },
  components:{
      headTop,
      lightCell,
      iptApen,
  },
  methods:{
  },
  created() {
      this.poleArr = this.$route.query.poleArr
  },
  beforeDestroy() {
      
  },
}
</script>

<style scoped lang = "scss">

</style>
