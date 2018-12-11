<template>
  <div class="abnormalDetails full">
    <head-top headTitle = "异常数据详情" goBack = 'true'></head-top>
    <div class="section flex_col_left">
        <div class="con-list-sm padding">
            <light-cell lfCon = "灯杆号" :rtCon = "pole.dgmc"></light-cell>
            <light-cell lfCon = "所属台区/街道" :rtCon = "pole.ldbmc"></light-cell>
        </div>
        <div class="scroll-box flex1" id="scrollbox">
            <div id="scrollcon">
                <div class="con-list-sm padding">
                    <light-cell v-for = "(item,index) in ycArr" :key="index" lfCon = "异常信息:" :mdCon = "item.yclxShow" :rtCon = "item.fssj"></light-cell>
                </div>
            </div>
        </div>
    </div> 
  </div>
</template>

<script>
import headTop from '@/components/header/mainHeader'
import lightCell from '@/components/common/lightCell'
import api from '@/service/data.js'


export default {
    components:{
        headTop,
        lightCell,
    },
    data () {
        return {
            pole:'', //灯杆信息
            ycArr:[{
                'ycxx':'功率异常',
                'ycsj':'2018-10-10 19:23:22',
            },{
                'ycxx':'功率异常',
                'ycsj':'2018-10-10 19:23:22',
            }],
            dateRange:'' , // 时间范围 
        }
    },
    methods:{
        queryAbnormalMsgDetail(){
            let _this = this
            let data = {}
            data.kssj = this.dateRange.start
            data.jssj = this.dateRange.end
            data.ddkzqId = this.pole.ddkzqId
            data.xfbz = ''
            api.abnormalMsgDetail(data).then(function(res){
                _this.ycArr = JSON.parse(res.data)
                console.log(_this.ycArr)
            })
        }
    },
    mounted() {
        this.dateRange = this.$route.query.dateRange
        this.pole = this.$route.query.item
        this.queryAbnormalMsgDetail()
    },
}
</script>

<style scoped lang = "scss">

</style>
