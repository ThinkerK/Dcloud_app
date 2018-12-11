<template>
    <div class="abnormalDetails full">
        <head-top headTitle="异常数据详情" noneIcon="true">
            <div slot="save" @click="$router.go(-1)">取消</div>
        </head-top>
        <div class="section flex_col_left">
            <div class="con-list-sm padding">
                <light-cell lfCon="灯杆号" :rtCon="pole.dgmc"></light-cell>
                <light-cell lfCon="所属台区/街道" :rtCon="pole.ldbmc"></light-cell>
                <light-cell lfCon="异常信息" :rtCon="pole.yclxShow"></light-cell>
                <light-cell lfCon="时间" :rtCon="pole.fssj"></light-cell>
                <light-cell lfCon="修复时间" :rtCon="now"></light-cell>
                <light-cell lfCon="修复人员">
                    <ipt-apen v-model="repairMan" slot="other"></ipt-apen>
                </light-cell>
                <light-cell lfCon="修复类型">
                    <div @click="anlTypeFlag = true" slot="other">{{rarType.dmmc}}
                        <i class="xl-blue"></i>
                    </div>
                </light-cell>
                <div class="text-box" ref= "mobox">
                    <div class="padding_tb flex_between">备注
                        <div></div>
                    </div>
                    <textarea name="remarks" id="remarks" placeholder="请填写备注内容" v-model="txtCon"></textarea>
                </div>
            </div>
            <div class='padding padding_tb' style="position: fixed;bottom: 0;width: 100%">
                <div class='btn_submit padding_tb' @click='submit'>提交</div>
            </div>
        </div>
        <mt-popup v-model="anlTypeFlag" position="bottom" class="mint-popup">
            <mt-picker :slots="repTypeSlot" :showToolbar="true" valueKey="dmmc" :visible-item-count="5" ref="TypePicker">
                <div class="flex_between padding padding_tb">
                    <a class="btn-cancel" @click="anlTypeFlag = !anlTypeFlag">取消</a>
                    <a class="btn-sure" @click="typeConfirm">确定</a>
                </div>
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    import headTop from '@/components/header/mainHeader'
    import lightCell from '@/components/common/lightCell'
    import { hoursFormat } from '@/config/commonFun/date.js'
    import iptApen from '@/components/common/iptApen'
    import { Toast } from 'mint-ui'
    import api from '@/service/data.js'


    export default {
        components: {
            headTop,
            lightCell,
            iptApen
        },
        data() {
            return {
                pole: '',
                now: hoursFormat(new Date, '{Y}-{MM}-{DD} {hh}:{ii}:{ss}'),
                repairMan: '', //修复人员
                txtCon: '',//修复备注
                rarType: {"dmbh":"-1","dmmc":'请选择'},//修复类型
                anlTypeFlag: false, //选择类型开关
                repTypeSlot:[{
                    flex: 1,
                    values:[],
                    className: 'slot1'
                }],   
                userInfo:'',//用户信息
            }
        },
        methods: {
            submit() {  //提交
                let _this = this
                if (this.repairMan.length >= 2 && this.txtCon.length >= 1 && this.rarType.dmbh != -1) {
                    let data = {}
                    data.mark = 1
                    data.dxid = this.pole.ddkzqId
                    data.czrbh = this.userInfo.userId
                    data.czrmc = this.repairMan
                    data.xfsm = this.txtCon
                    data.xflx = this.rarType.dmbh
                    data.bz = ''
                    data.xfbz = ''
                    data.fssj = this.pole.fssj
                    data.yclx = this.pole.yclx
                    api.repairRecord(data).then(res => {
                        if(res.data == '修改成功！'){
                            Toast(res.data)
                            _this.$router.go(-1)
                        }else{
                            Toast('修改失败，请稍后重试')
                        }
                    }) 
                } else {
                    Toast('请认真填写 修复人姓名/修复备注/修复类型')
                }
            },
            getRepairType() { // 获取修复类型
                let _this = this
                api.abnormalType().then(res => {
                    _this.repTypeSlot[0].values = JSON.parse(res.data)
                })
            },
            typeConfirm() {  // 确定 修复类型
                this.rarType = this.$refs.TypePicker.getValues()[0]
                this.anlTypeFlag = false
            }
        },
        beforeMount() {

        }, 
        mounted() {
            this.pole = this.$route.query.item   //灯杆信息
            this.userInfo = this.$route.query.userInfo   //用户信息
            this.getRepairType()     //获取异常
        },
    }
</script>

<style scoped lang="scss">
    @import '@/style/mixin.scss';
    #remarks {
        width: 10.2rem !important;
        height: 3rem !important;
        background: rgba(249, 249, 249, 1);
        border-radius: 0.01rem;
        text-align: left;
        font-size: 0.42rem;
    }

    .text-box {
        padding-bottom: 0.3rem;
    }

    .btn_submit {
        width: 100%;
        background: #169AFF;
        color: white;
        border-radius: 0.05rem;
    }

    .xl-blue {
        display: inline-block;
        margin-left: 0.11rem;
        margin-bottom: 0.05rem;
        @include wh(0.36rem, 0.2rem) @include bg('../../images/common/downblue.png')
    }
</style>