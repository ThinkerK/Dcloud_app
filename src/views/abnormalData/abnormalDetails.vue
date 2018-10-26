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
                    <light-cell v-for = "(item,index) in ycArr" :key="index" lfCon = "异常信息:" :mdCon = "item.ycxx" :rtCon = "item.ycsj"></light-cell>
                </div>
            </div>
        </div>
    </div> 
  </div>
</template>

<script>
import headTop from '@/components/header/mainHeader'
import lightCell from '@/components/common/lightCell'

export default {
    components:{
        headTop,
        lightCell,
    },
    data () {
        return {
            pole:{  
                'dgmc':'石担路1002',
                'yccs':15,
                'ldbmc':'冰河世纪',
                'ycxx':'功率异常',
                'ycsj':'2018-10-10 19:23:22',
                'yczt':'未修复'
            },
            ycArr:[{
                'ycxx':'功率异常',
                'ycsj':'2018-10-10 19:23:22',
            },{
                'ycxx':'功率异常',
                'ycsj':'2018-10-10 19:23:22',
            }]
        }
    }
}
</script>

<style scoped lang = "scss">

</style>
