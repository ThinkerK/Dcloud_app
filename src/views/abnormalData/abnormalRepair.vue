<template>
  <div class="abnormalDetails full">
    <head-top headTitle = "异常数据详情" noneIcon = "true">
        <div slot="save" @click = "$router.go(-1)">取消</div>
    </head-top>
    <div class="section flex_col_left">
        <div class="con-list-sm padding">
            <light-cell lfCon = "灯杆号" :rtCon = "pole.dgmc"></light-cell>
            <light-cell lfCon = "所属台区/街道" :rtCon = "pole.ldbmc"></light-cell>
            <light-cell lfCon = "异常信息" :rtCon = "pole.ycxx"></light-cell>
            <light-cell lfCon = "时间" :rtCon = "pole.ycsj"></light-cell>
            <light-cell lfCon = "修复时间" rtCon = "2018-10-10 19:20:11"></light-cell>
            <light-cell lfCon = "修复人员" rtCon = '王某某'></light-cell>
            <div class="text-box">
                <div class="padding_tb flex_between">备注<div></div></div>
                <textarea name="remarks" id="remarks" placeholder="请填写备注内容"></textarea>
            </div>
        </div>
        <div class = 'padding padding_tb' style="position: fixed;bottom: 0;width: 100%">
            <div class = 'btn_submit padding_tb'>提交</div>
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
#remarks{
    width: 10.2rem !important;
    height: 3rem !important ;
    background:rgba(249,249,249,1);
    border-radius:0.01rem;
    text-align: left;
    font-size:0.42rem;
}
.text-box{
    padding-bottom: 0.3rem;
}
.btn_submit{
    width: 100%;
    background: #169AFF;
    color: white;
    border-radius: 0.05rem;
}
</style>
